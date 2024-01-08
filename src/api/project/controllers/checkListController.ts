import { Request, Response } from "express";
import { ProjectService } from "../services/projectService";
import { TaskService } from "../services/taskService";
import { CheckListService } from "../services/checkListService";
import * as Joi from 'joi';
const checkLists = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const taskId = parseInt(req.params.tid);
        const psv = new ProjectService();
        const projectId = parseInt(req.params.id);
        const isMember = await psv.isMember(projectId, id);
        if (!isMember) {
            return res.status(400).json('You are not member of project');
        }
        const tsv = new TaskService();
        const task = await tsv.getOne({ where: { id: taskId, projectId: projectId } });
        if (!task) {
            return res.status(400).json('Task not found');
        }
        const clsv = new CheckListService();
        const checkLists = await clsv.getAll({
            where: {
                taskId: taskId
            }
        })
        return res.status(200).json(checkLists);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const checkListdetail = async (req: Request, res: Response) => {
    const id = req.userData.id;
    const checkListId = parseInt(req.params.clid);
    const psv = new ProjectService();
    const projectId = parseInt(req.params.id);
    const isMember = await psv.isMember(projectId, id);
    if (!isMember) {
        return res.status(400).json('You are not member of project');
    }
    const clsv = new CheckListService();
    const checkList = await clsv.getCheckListById(projectId, checkListId);
    if (!checkList) {
        return res.status(400).json('CheckList not found');
    }
    return res.status(200).json(checkList);
}

const upsertCheckList = async (req: Request, res: Response) => {
    const id = req.userData.id;
    const psv = new ProjectService();
    const projectId = parseInt(req.params.id);
    const taskId = parseInt(req.params.tid);
    const isMember = await psv.isMember(projectId, id);
    if (!isMember) {
        return res.status(400).json('You are not member of project');
    }
    const tsv = new TaskService();

    const task = await tsv.getOne({ where: { id: taskId, projectId: projectId } });
    if (!task) {
        return res.status(400).json('Task not found');
    }

    const schema = Joi.object({
        id: Joi.number().optional(),
        name: Joi.string().required(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }
    const clsv = new CheckListService();

    if (value.id) {
        const oldCheckList = await clsv.getOne({ where: { id: value.id, taskId: taskId } });
        if (!oldCheckList) {
            return res.status(400).json('CheckList not found');
        }
    }
    const checkList = clsv.create({ ...value, taskId });
    const result = await clsv.save(checkList);
    return res.status(200).json(result);
}

const deleteCheckListById = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const psv = new ProjectService();
        const projectId = parseInt(req.params.id);
        const taskId = parseInt(req.params.tid);
        const isMember = await psv.isMember(projectId, id);
        if (!isMember) {
            return res.status(400).json('You are not member of project');
        }
        const tsv = new TaskService();

        const task = await tsv.getOne({ where: { id: taskId, projectId: projectId } });
        if (!task) {
            return res.status(400).json('Task not found');
        }
        const clsv = new CheckListService();

        const clId = parseInt(req.params.clid);
        const checkList = await clsv.getOne({ where: { id: clId, taskId: taskId } });
        if (!checkList) {
            return res.status(400).json('Check list not found');
        }
        await clsv.softRemove([checkList]);
        return res.status(200).json(true);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const checkListController = {
    checkLists,
    checkListdetail,
    upsertCheckList,
    deleteCheckListById,
}