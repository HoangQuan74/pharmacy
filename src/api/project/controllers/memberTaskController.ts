import { Request, Response } from "express";
import { ProjectService } from "../services/projectService";
import { TaskService } from "../services/taskService";
import { MemberTaskService } from "../services/memberTaskService";
import * as Joi from "joi";
import { MemberService } from "../services/memberService";

const membertasks = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const projectId = parseInt(req.params.id);
    const projectsv = new ProjectService();
    const isMember = await projectsv.isMember(projectId, userId);
    if (!isMember) {
        return res.status(400).json("You are not a member of project");
    }
    const taskId = parseInt(req.params.tid);
    const tsv = new TaskService();
    const task = await tsv.getOne({
        where: {
            projectId: projectId,
            id: taskId,
        }
    })
    if (!task) {
        return res.status(400).json("Task not found");
    }
    const mtsv = new MemberTaskService();
    const memberTasks = await mtsv.getAll({
        where: {
            taskId: taskId,
        },
        relations: [
            'member', 'member.user'
        ]
    })
    return res.status(200).json(memberTasks);
}

const saveMemberTask = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const projectId = parseInt(req.params.id);
    const taskId = parseInt(req.params.tid);
    const projectsv = new ProjectService();
    const isOwner = await projectsv.getOne({
        where: {
            ownerId: userId,
            id: projectId,
        }
    })
    if (!isOwner) {
        return res.status(400).json('You are not owner of this project');
    }
    const tsv = new TaskService();
    const task = await tsv.getOne({
        where: {
            id: taskId,
            projectId: projectId,
        }
    })
    if (!task) {
        return res.status(400).json('Task not found');
    }
    const schema = Joi.object({
        memberId: Joi.number().required(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detai: error.message });
    const msv = new MemberService();
    const member = await msv.getOne({
        where: {
            id: value.memberId,
            projectId: projectId,
        }
    })
    if (!member) {
        return res.status(400).json('member not found');
    }
    const mtsv = new MemberTaskService();
    const result = await mtsv.save({
        taskId: task.id,
        memberId: member.id
    })
    return res.status(200).json(result);
}

const deleteMemberTask = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const projectId = parseInt(req.params.id);
    const taskId = parseInt(req.params.tid);
    const memberTaskId = parseInt(req.params.mtid)
    const projectsv = new ProjectService();
    const isOwner = await projectsv.getOne({
        where: {
            ownerId: userId,
            id: projectId,
        }
    })
    if (!isOwner) {
        return res.status(400).json('You are not owner of this project');
    }
    const tsv = new TaskService();
    const task = await tsv.getOne({
        where: {
            id: taskId,
            projectId: projectId,
        }
    })
    if (!task) {
        return res.status(400).json('Task not found');
    }
    const mtsv = new MemberTaskService();
    const data = await mtsv.getOne({
        where: {
            id: memberTaskId,
            taskId: task.id,
        }
    })
    if (!data) {
        return res.status(400).json('Member task not found');
    }
    await mtsv.softRemove([data]);
    return res.status(200).json(true);
}
export const memberTaskController = {
    membertasks,
    saveMemberTask,
    deleteMemberTask,
};