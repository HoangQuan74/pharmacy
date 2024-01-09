import { Request, Response } from "express";
import { hashPass } from "../../common/helper/hashPass";
import * as Joi from 'joi';
import { UserService } from "../services/userServices";
import { makeToken } from "../../common/helper/token";

const login = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error.message);

        const { email, password } = value;
        const us = new UserService();
        const user = await us.login(email, password);
        if (!user) return res.status(400).json({ detail: 'user not found' });
        const returnData = {
            user: user,
            access_token: makeToken('access', user?.id),
            refresh_token: makeToken('refresh', user?.id),
        }
        return res.status(200).json(returnData);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}


const changePassword = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const schema = Joi.object({
            password: Joi.string().min(6).required(),
            newPassword: Joi.string().min(6).required(),
            confirmPassword: Joi.any().equal(Joi.ref("newPassword")).required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ detai: error.message });

        const usersv = new UserService()
        const user = await usersv.getOne({
            where: {
                id: userId,
                password: hashPass(value.password),
            },
        });

        if (!user) {
            return res.status(400).json("Wrong password, please check it again");
        }

        user.password = hashPass(value.newPassword)
        await usersv.save(user)

        res.status(200).json("Change password successful");
    } catch (err) {
        return res.status(500).json({ detail: err.message });
    }
};

const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const userService = new UserService();
        const user = await userService.getOne({ where: { id: userId } });
        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};

const users = async (req: Request, res: Response) => {
    const userId = req.userData.id;
}

export const userControllers = {
    login,
    changePassword,
    users,
    getProfile,
};