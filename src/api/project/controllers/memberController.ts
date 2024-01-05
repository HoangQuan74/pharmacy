import { Request, Response } from "express";
import * as Joi from 'joi';
import { UserService } from "../../user/services/userService";
import { MemberService } from "../services/memberService";
import { ProjectService } from "../services/projectService";

const members = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const psv = new ProjectService();
        const projectId = parseInt(req.params.id);
        const isMember = await psv.isMember(projectId, id);
        if (!isMember) {
            return res.status(400).json('You are not member of project');
        }
        const msv = new MemberService();
        const members = await msv.getMembersByProjectId(projectId);
        return res.status(200).json(members);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const updateMember = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const memberId = parseInt(req.params.mid)
        const projectId = parseInt(req.params.id);
        const scheam = Joi.object({
            role: Joi.string().required(),
        })

        const { error, value } = scheam.validate(req.body);
        if (error) {
            return res.status(400).json(error);
        }
        const psv = new ProjectService();
        const project = await psv.getOne({
            where: {
                id: projectId,
            },
            relations: [
                'owner'
            ]
        })
        if (!project) {
            return res.status(400).json('Project not found');
        } else if (project.owner.id !== id) {
            return res.status(400).json('You are not owner of this project');
        }
        const msv = new MemberService()
        const member = await msv.getOne({ where: { id: memberId, projectId: projectId } });
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

const deleteMember = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const memberId = parseInt(req.params.mid);
        const projectId = parseInt(req.params.id);

        const psv = new ProjectService();
        const project = await psv.getOne({
            where: {
                id: projectId,
            },
            relations: [
                'owner'
            ]
        })
        if (!project) {
            return res.status(400).json('Project not found');
        } else if (project.owner.id !== id) {
            return res.status(400).json('You are not owner of this project');
        }
        const msv = new MemberService()
        const member = await msv.getOne({ where: { id: memberId } });
        if (!member) {
            return res.status(400).json('Member not found');
        }
        const result = await msv.softRemove([member]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const saveMember = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const projectId = parseInt(req.params.id);

        const scheam = Joi.object({
            role: Joi.string().required(),
            userId: Joi.number().required(),
        })

        const { error, value } = scheam.validate(req.body);
        if (error) {
            return res.status(400).json(error);
        }
        const psv = new ProjectService();
        const project = await psv.getOne({
            where: {
                id: projectId,
            },
            relations: [
                'owner'
            ]
        })
        if (!project) {
            return res.status(400).json('Project not found');
        } else if (project.owner.id !== id) {
            return res.status(400).json('You are not owner of this project');
        }

        const msv = new MemberService();
        const us = new UserService();
        const userMember = await us.getOne({ where: { id: value.userId } });
        if (!userMember) {
            return res.status(400).json('user not found');
        }
        const member = msv.create({ role: value.role, userId: userMember.id, projectId: projectId });
        const result = await msv.save(member);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const memberController = {
    members,
    updateMember,
    deleteMember,
    saveMember,
};
