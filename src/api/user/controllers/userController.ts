import { Request, Response } from "express";
import { Users } from "../../../../src/database/entities/Users";
import { UserService } from "../services/userService";
import { gender } from "../../../../src/common/constants/userConstant";
import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { makeToken } from "../../../../src/common/helper/token";
import { hashPass } from "../../../../src/common/helper/hashPass";
const Joi = require("joi");

const register = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6),
      dob: Joi.date().optional(),
      gender: Joi.string()
        .valid(...Object.values(gender))
        .default(gender.MALE),
      phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detai: error.message });

    const us = new UserService();
    const isExistsEmail = await us.isExistsEmail(value?.email);
    if (isExistsEmail)
      return res.status(400).json({ detail: `email was existsed` });

    const user: Users = value;
    const data = await us.saveUser(user);
    if (!data) return res.status(403).json({ detail: `error register` });
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

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
    if (!user) return res.status(404).json({ detail: 'không tìm thấy tài khoản' });

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

module.exports = {
  register,
  login,
};
