import { Request, Response } from "express"
import Joi from "joi";
import { Users } from "src/database/entities/Users";
import { UserService } from "../services/userService";

const register = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            // validate infomation
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ detai: error.message })

        //

        const user: Users = value;
        const us = new UserService();
        const data = await us.register(user);
        if (!data) return res.status(403)
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(500).json({ detail: e.message });
    }
}

module.exports = {
    register,
}