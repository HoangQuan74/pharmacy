import { Request, Response } from "express";
import { ProjectService } from "../services/projectService";
import { MemberService } from "../services/memberService";
import { MemberRoles } from "../../../common/constants/userConstant";
import { TaskService } from "../services/taskService";
const Joi = require("joi");

const createProject = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detai: error.message });

    const { name } = value;
    const userId = req.userData.id;
    const projectsv = new ProjectService();
    const isUniqueName = await projectsv.isUniqueName(userId, name);
    if (!isUniqueName)
      return res.status(400).json({ detail: `Project name existed` });

    const membersv = new MemberService();
    const project = projectsv.create({name, ownerId: userId});
    await projectsv.save(project);
    const owner = membersv.create({role: MemberRoles.ADMIN, userId: userId, projectId: project.id});
    await membersv.save(owner);
    const result = await projectsv.save(project);

    if (!project)
      return res.status(403).json({ detail: `Project creating failed` });
    return res.status(201).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.userData.id;
    const projectsv = new ProjectService();
    const result = await projectsv.getAll({where: {ownerId: userId}, relations: {members: true}})
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const userId = req.userData.id;
    const projectId = parseInt(req.params.id);

    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const psv = new ProjectService();
    const project = await psv.getOne({
      where: {
        id: projectId,
      },
      relations: ["owner"],
    });
    if (!project) {
      return res.status(400).json("Project not found");
    } else if (project.owner.id !== userId) {
      return res.status(400).json("You are not owner of this project");
    }
    const {name} = value;

    const projectsv = new ProjectService();
    const isUniqueName = await projectsv.isUniqueName(userId, name);
    if (!isUniqueName && project.name !== name)
      return res.status(400).json({ detail: `Project name existed` });
    project.name = name;
    const result = await projectsv.save(project);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const userId = req.userData.id;
    const projectId = parseInt(req.params.id);

    const projectService = new ProjectService();

    const isMember = await projectService.isMember(projectId, userId);
    if (!isMember) {
      return res.status(400).json("You are not member of project");
    }
    const project = await projectService.getOne({
      where: {
        id: projectId,
      },
      relations: [
        "members",
        "tasks"
      ],
    });
    if (!project) {
      return res.status(400).json("Project not found");
    }
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    const userId = req.userData.id;
    const projectId = parseInt(req.params.id);

    const projectService = new ProjectService();
    const taskService = new TaskService();
    const memberService = new MemberService;

    const project = await projectService.getOne({
      where: {
        id: projectId,
      },
      relations: ["owner", "members"],
    });
    if (!project) {
      return res.status(400).json("Project not found");
    } else if (project.owner.id !== userId) {
      return res.status(400).json("You are not owner of this project");
    }
    const tasks = await taskService.getAll({where: {projectId: projectId}});
    await taskService.softRemove([...tasks]);
    const members = await memberService.getAll({ where: { projectId: projectId } });
    await memberService.softRemove([...members]);
    await projectService.softRemove([project]);
    
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const projectController = {
  createProject,
  getProjects,
  updateProject,
  getProjectById,
  deleteProject
};
