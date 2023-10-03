import { Request, Response } from "express";
import { Users } from "src/database/entities/Users";
import { UserService } from "../services/userService";
import { gender } from "src/common/constants/userConstant";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
const Joi = require("joi");

const register = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.email().required(),
      password: Joi.string().min(6),
      dob: Joi.date().optional(),
      gender: Joi.string()
        .valid(...Object.values(gender))
        .default(gender.MALE),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detai: error.message });

    const us = new UserService();
    const isExistsEmail = await us.isExistsEmail(value.email);
    if (isExistsEmail)
      return new BadRequestException({ detail: `email was existsed` });

    const user: Users = value;
    const data = await us.saveUser(user);
    if (!data) return new ForbiddenException({ detail: `error register` });
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ detail: e.message });
  }
};

module.exports = {
  register,
};
