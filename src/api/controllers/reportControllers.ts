import e, { Request, Response } from "express"
import { OrderService } from "../services/orderService"
import { UserService } from "../services/userServices";
import { TypeOrder } from "../../database/entities/Order";
const report = async (req: Request, res: Response) => {
    const orderSv = new OrderService();
    const us = new UserService();
    try {
        const sale = await orderSv.getTotalAmount(TypeOrder.SELL);
        const cost = await orderSv.getTotalAmount(TypeOrder.BUY);
        const salary = await us.getToltalSalaryCurrentMonth();
        return res.status(200).json({ sale, cost, salary });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const reportControllers = {
    report,
}