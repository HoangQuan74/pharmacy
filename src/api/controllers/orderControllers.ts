import { Request, Response } from "express";
import * as Joi from 'joi';
import { UserService } from "../services/userServices";
import { OrderService } from "../services/orderService";
import { StatusPaid, TypeOrder } from "../../database/entities/Order";
import { BusinessPartnerService } from "../services/partnerService";
import { OrderDetailService } from "../services/detailOrderService";
import { TypePartner } from "../../database/entities/BusinessPartner";
import { typeUser } from "../../database/entities/Users";
import { ProductService } from "../services/productService";

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

const saveOrderBuy = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const orderSv = new OrderService();
    const detailOrderSv = new OrderDetailService();
    const bsv = new BusinessPartnerService();
    const psv = new ProductService();
    try {
        const schema = Joi.object({
            partnerId: Joi.number().required(),
            orderDetails: Joi.array().min(1).items({
                productId: Joi.number().required(),
                unitPrice: Joi.number().required(),
                quantity: Joi.number().required(),
            }).required(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const isValidParner = await bsv.getOne({
            where: {
                typePartner: TypePartner.BUSINESS,
                id: value.partnerId,
            }
        })
        if (!isValidParner) {
            return res.status(400).json('Business not found');
        }
        const order = await orderSv.save({
            partnerId: value.partnerId,
            userId: userId,
            typeOrder: TypeOrder.BUY,
        })
        const orderdetail = value.orderDetails.map((product) => {
            return detailOrderSv.create({
                ...product,
                price: product.quantity * product.unitPrice,
                orderId: order.id,
            })
        })
        order.orderDetails = await detailOrderSv.save(orderdetail);
        // const productId = order.orderDetails.map((product) => product.)
        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}


const saveOrderSell = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const orderSv = new OrderService();
    const detailOrderSv = new OrderDetailService();
    const bsv = new BusinessPartnerService();
    try {
        const schema = Joi.object({
            partnerId: Joi.number().required(),
            orderDetails: Joi.array().min(1).items({
                productId: Joi.number().required(),
                unitPrice: Joi.number().required(),
                quantity: Joi.number().required(),
            }).required(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const isValidParner = await bsv.getOne({
            where: {
                typePartner: TypePartner.CLIENT,
                id: value.partnerId,
            }
        })
        if (!isValidParner) {
            return res.status(400).json('Client not found');
        }
        const order = await orderSv.save({
            partnerId: value.partnerId,
            userId: userId,
            typeOrder: TypeOrder.SELL,
        })
        const orderdetail = value.orderDetails.map((product) => {
            return detailOrderSv.create({
                ...product,
                price: product.quanlity * product.unitPrice,
                orderId: order.id,
            })
        })
        order.orderDetails = await detailOrderSv.save(orderdetail)
        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id);
    const userId = req.userData.id;
    const us = new UserService();
    const osv = new OrderService();
    try {
        const admin = await us.getOne({
            where: {
                id: userId,
                typeUser: typeUser.ADMIN,
            }
        });
        if (!admin) {
            return res.status(400).json('Not allowed to delete');
        }
        const order = await osv.getOne({
            where: {
                id: orderId
            },
            relations: [
                'orderDetails',
                'payments'
            ]
        });
        if (!order) {
            return res.status(400).json('Order not found');
        }
        await osv.softRemove([order]);
        return res.status(200).json(true);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
export const orderController = {
    orderSelles,
    orderBuys,

    saveOrderBuy,
    saveOrderSell,

    deleteOrder,
}