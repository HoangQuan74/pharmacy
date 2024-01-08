import { Request, Response } from "express";
import * as Joi from 'joi';
import { ProjectService } from "../services/projectService";
import { TaskService } from "../services/taskService";
import { Priority, TaskStatus } from "../../../database/entities/Task";

const tasks = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const projectId = parseInt(req.params.id);

        const psv = new ProjectService();
        const tsv = new TaskService();

        const isMember = await psv.isMember(projectId, id);
        if (!isMember) {
            return res.status(400).json('You are not member of project');
        }

        const schema = Joi.object({
            searchText: Joi.string().optional(),
            priority: Joi.string().valid(...Object.values(Priority)).optional(),
            status: Joi.string().valid(...Object.values(TaskStatus)).optional(),
        })

        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json(error);
        }
        const { searchText, priority, status } = value;

        const data = await tsv.tasks(
            projectId,
            searchText,
            priority,
            status,
        );
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const getTaskById = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const projectId = parseInt(req.params.id);
        const taskId = parseInt(req.params.tid);

        const psv = new ProjectService();
        const tsv = new TaskService();

        const isMember = await psv.isMember(projectId, id);
        if (!isMember) {
            return res.status(400).json('You are not member of project');
        }
        const task = await tsv.getOne({
            where: {
                projectId: projectId,
                id: taskId,
            },
            relations: [
                'checkList',
                'comments',
                'comments.author',
            ]
        })
        if (!task) {
            return res.status(400).json('Task not found');
        }
        return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const upsertTask = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const projectId = parseInt(req.params.id);

        const psv = new ProjectService();
        const tsv = new TaskService();

        const isMember = await psv.isMember(projectId, id);
        if (!isMember) {
            return res.status(400).json('You are not member of project');
        }

        const schema = Joi.object({
          id: Joi.number().optional(),
          name: Joi.string().required(),
          startDay: Joi.date().allow(null).optional(),
          dueDay: Joi.when("startDay", {
            is: Joi.exist(),
            then: Joi.date().allow(null).optional().greater(Joi.ref("startDay")),
            otherwise: Joi.date().optional(),
          }),
          priority: Joi.string()
            .valid(...Object.values(Priority))
            .optional(),
          status: Joi.string()
            .valid(...Object.values(TaskStatus))
            .optional(),
          description: Joi.string().allow(null).max(500).optional(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error);
        }
        if (value.id) {
            const oldTask = await tsv.getOne({ where: { id: value.id } });
            if (!oldTask) {
                return res.status(400).json('Task not found');
            }
        }
        const task = tsv.create({ ...value, projectId });
        const result = await tsv.save(task);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const deleteTaskById = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const projectId = parseInt(req.params.id);
        const taskId = parseInt(req.params.tid);

        const psv = new ProjectService();
        const tsv = new TaskService();

        const isMember = await psv.isMember(projectId, id);
        if (!isMember) {
            return res.status(400).json('You are not member of project');
        }

        const task = await tsv.getOne({
            where: {
                id: taskId,
                projectId: projectId,
            },
            relations: [
                'checkList',
                'comments',
            ]
        })
        if (!task) {
            return res.status(400).json('Task not found');
        }
        const result = await tsv.softRemove([task]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


export const taskController = {
    tasks,
    getTaskById,
    upsertTask,
    deleteTaskById,
};