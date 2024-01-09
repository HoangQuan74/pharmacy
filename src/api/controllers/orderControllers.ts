import { Request, Response } from "express";
import * as Joi from 'joi';
import { UserService } from "../services/userServices";
import { OrderService } from "../services/orderService";
import { StatusPaid, TypeOrder } from "../../database/entities/Order";

const orderSelles = async (req: Request, res: Response) => {
    const orderSv = new OrderService();
    try {
        const schema = Joi.object({
            searchText: Joi.string().optional().allow(''),
            statusPaid: Joi.string().valid(...Object.values(StatusPaid)).optional(),
        })
        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const data = await orderSv.orders(
            TypeOrder.SELL,
            value.searchText,
            value.statusPaid,
        )
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const orderBuys = async (req: Request, res: Response) => {
    const orderSv = new OrderService();
    try {
        const schema = Joi.object({
            searchText: Joi.string().optional().allow(''),
            statusPaid: Joi.string().valid(...Object.values(StatusPaid)).optional(),
        })
        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const data = await orderSv.orders(
            TypeOrder.BUY,
            value.searchText,
            value.statusPaid,
        )
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const orderController = {
    orderSelles,
    orderBuys,
}