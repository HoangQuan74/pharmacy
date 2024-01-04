import { Request, Response } from "express";
import * as Joi from 'joi';
import { UserService } from "../../user/services/userService";
import { MemberService } from "../services/memberService";

const members = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const us = new UserService();
        const user = await us.getOne({ where: { id: id } });
        const scheam = Joi.object({
            projectId: Joi.number().required(),
        })

        const { error, value } = scheam.validate(req.query);
        if (error) {
            return res.status(400).json(error);
        }
        const project = null;
        if (!project || project.owner !== user) {
            return res.status(400).json('Project not found');
        }
        const msv = new MemberService()
        const members = await msv.getAll({
            where: {
                project: project
            },
            relations: [
                'user',
            ]
        })
        return res.status(200).json(members);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const updateMembers = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const memberId = parseInt(req.params.id)
        const us = new UserService();
        const user = await us.getOne({ where: { id: id } });
        const scheam = Joi.object({
            projectId: Joi.number().required(),
            role: Joi.string().required(),
        })

        const { error, value } = scheam.validate(req.body);
        if (error) {
            return res.status(400).json(error);
        }
        const project = null;
        if (!project || project.owner !== user) {
            return res.status(400).json('Project not found');
        }
        const msv = new MemberService()
        const member = await msv.getOne({ where: { id: memberId } });
        if (!member) {
            return res.status(400).json('Member not found');
        }
        member.role = value.role;
        const result = await msv.save(member);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


export const memberController = {
    members,
    updateMembers,
};
