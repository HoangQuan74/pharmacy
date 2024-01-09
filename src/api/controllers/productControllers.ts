import { Request, Response } from "express";
import * as Joi from 'joi';
import { ProductCategoryService } from "../services/productCategoryService";
import { ProductService } from "../services/productService";
import { UnitProduct } from "../../database/entities/Product";

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

const saveProduct = async (req: Request, res: Response) => {
    const psv = new ProductService();
    try {
        const schema = Joi.object({
            // required
            name: Joi.string().required(),
            categoryId: Joi.number().required(),
            price: Joi.number().min(0).required(),

            usage: Joi.string().optional().allow(''),                          // cách sử dụng
            ingredient: Joi.string().optional().allow(''),                     // thành phần
            storageRequirement: Joi.string().optional().allow(''),             // yêu cầu bảo quản
            quanlity: Joi.number().min(0).default(0),
            unit: Joi.string().valid(...Object.values(UnitProduct)).optional(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const notValid = await psv.getOne({
            where: {
                categoryId: value.categoryId,
                name: value.name,
            }
        })
        if (notValid) {
            return res.status(400).json('name of product is exist (just check in category)');
        }
        const data = await psv.save(value);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const psv = new ProductService();
    try {
        const product = await psv.getOne({
            where: {
                id: productId,
            }
        })
        if (!product) {
            return res.status(400).json('product not found');
        }
        await psv.softRemove([product]);
        return res.status(200).json(true);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const productController = {
    productCategories,

    products,
    saveProduct,
    deleteProduct,
}