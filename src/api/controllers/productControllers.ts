import { Request, Response } from "express";
import * as Joi from 'joi';
import { UserService } from "../services/userServices";
import { ProductCategoryService } from "../services/productCategoryService";
import { ProductService } from "../services/productService";

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

const products = async (req: Request, res: Response) => {
    const psv = new ProductService();
    try {
        const schema = Joi.object({
            searchText: Joi.string().optional().allow(''),
            categoryId: Joi.number().optional(),
        })
        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const { searchText, categoryId } = value;
        const data = await psv.products(searchText, categoryId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const productController = {
    productCategories,

    products,

}