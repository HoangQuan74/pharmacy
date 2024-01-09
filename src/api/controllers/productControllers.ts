import { Request, Response } from "express";
import * as Joi from 'joi';
import { UserService } from "../services/userServices";
import { ProductCategoryService } from "../services/productCategoryService";

const productCategories = async (req: Request, res: Response) => {
    const sv = new ProductCategoryService();
    try {
        const data = await sv.getAll();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const productController = {
    productCategories,
}