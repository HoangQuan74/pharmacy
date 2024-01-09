import { Request, Response } from "express";
import * as Joi from 'joi';
import { UserService } from "../services/userServices";
import { BusinessPartnerService } from "../services/partnerService";
import { TypePartner } from "../../database/entities/BusinessPartner";

const businessPartners = async (req: Request, res: Response) => {
    try {
        const bs = new BusinessPartnerService();
        const schema = Joi.object({
            searchText: Joi.string().optional(),
        })
        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const data = await bs.businessPartners(value.searchText);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const saveBusinessPartner = async (req: Request, res: Response) => {
    try {
        const bs = new BusinessPartnerService();
        const schema = Joi.object({
            fullName: Joi.string().max(100).min(6).required(),
            email: Joi.string().email().optional(),
            typePartner: Joi.string().valid(...Object.values(TypePartner)).optional(),
            phone: Joi.string()
                .pattern(/^[0-9]{10}$/)
                .required(),
            address: Joi.string().max(100).optional(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        const isExistsPhone = await bs.getOne({
            where: {
                phone: value.phone,
            }
        })
        if (isExistsPhone) {
            return res.status(400).json('Phone already exist');
        }
        const businessPartner = await bs.save(value);
        return res.status(200).json(businessPartner);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// const updateBusinessPartner = async (req: Request, res: Response) => {
//     const userId = req.userData.id;
//     try {

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(error);
//     }
// }

const deleteBusinessPartner = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const partnerId = parseInt(req.params.id);
    const us = new UserService();
    const bs = new BusinessPartnerService();

    try {
        const isAdmin = await us.getOne({
            where: {
                id: userId,
            }
        });
        if (!isAdmin) {
            return res.status(400).json('You are not admin');
        }
        const partner = await bs.getOne({
            where: {
                id: partnerId,
            }
        })
        if (!partner) {
            return res.status(400).json('Business partner not found');
        }
        await bs.softRemove([partner]);
        return res.status(200).json(true);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const businessPartnerController = {
    businessPartners,
    saveBusinessPartner,
    // updateBusinessPartner,
    deleteBusinessPartner,
}