import { Request, Response } from "express";
import { hashPass } from "../../common/helper/hashPass";
import * as Joi from 'joi';
import { UserService } from "../services/userServices";
import { makeToken } from "../../common/helper/token";
import { Gender, typeUser } from "../../database/entities/Users";
import { Not } from "typeorm";

const login = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);

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
    const us = new UserService();
    try {
        const data = await us.getAll();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

}

const saveUser = async (req: Request, res: Response) => {
    const us = new UserService();
    const userId = req.userData.id;
    const admin = await us.getOne({
        where: {
            id: userId,
            typeUser: typeUser.ADMIN,
        }
    })
    if (!admin) {
        return res.status(400).json('You not admin');
    }
    const schema = Joi.object({
        fullName: Joi.string().max(100).min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).default('123456'),
        gender: Joi.string().valid(...Object.values(Gender)),
        phone: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required(),
        salary: Joi.number().max(100000000).min(0).optional(),
    })

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    try {
        const { password, ...user } = value;
        const isExistsEmail = await us.isExistsEmail(value.email);
        if (isExistsEmail) {
            return res.status(400).json('email already exist');
        }
        const employee = us.create({
            ...user,
            password: hashPass(password)
        });
        const result = await us.save(employee);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


const updateUser = async (req: Request, res: Response) => {
    const us = new UserService();
    const employeeId = parseInt(req.params.id);
    const userId = req.userData.id;

    try {
        const employee = await us.getOne({
            where: {
                id: employeeId,
            }
        })
        if (!employee) {
            return res.status(400).json('Employee not found');
        }
        const admin = await us.getOne({
            where: {
                id: userId,
                typeUser: typeUser.ADMIN,
            }
        })

        const schema = Joi.object({
            fullName: Joi.string().max(100).min(6).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(6).optional(),
            gender: Joi.string().valid(...Object.values(Gender)),
            phone: Joi.string()
                .pattern(/^[0-9]{10}$/)
                .optional(),
            salary: Joi.number().max(100000000).min(0).optional(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        if (employeeId !== userId) {
            if (!admin) {
                return res.status(400).json('You not allowed to update data');
            }
        }
        if (!admin) {
            delete value.salary;
        }

        const { password, ...user } = value;
        const isExistsEmail = await us.getOne({
            where: {
                id: Not(employeeId),
                email: value.email,
            }
        });
        if (isExistsEmail) {
            return res.status(400).json('email already exist');
        }
        employee.password = password ? hashPass(password) : employee.password;
        employee.fullName = user.fullName ?? employee.fullName;
        employee.email = user.email ?? employee.email;
        employee.phone = user.phone ?? employee.phone;
        employee.salary = user.salary ?? employee.salary;
        employee.gender = user.gender ?? employee.gender;

        const result = await us.save(employee);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const us = new UserService();
    const employeeId = parseInt(req.params.id);
    const userId = req.userData.id;
    try {
        const admin = await us.getOne({
            where: {
                id: userId,
                typeUser: typeUser.ADMIN,
            }
        })
        if (!admin) {
            return res.status(400).json('You not admin');
        }
        const employee = await us.getOne({
            where: {
                id: employeeId,
                typeUser: typeUser.EMPLOYEE,
            }
        })
        if (!employee) {
            return res.status(400).json('Employee not found');
        }
        const result = await us.softRemove([employee]);
        return res.status(200).json(!!result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const userControllers = {
    login,
    changePassword,
    users,
    getProfile,
    saveUser,
    deleteUser,
    updateUser,
};