import { AppDataSource } from "../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { BusinessPartner } from "../../database/entities/BusinessPartner";

export class BusinessPartnerService {
    private businessPartnerRes = AppDataSource.getRepository(BusinessPartner);

    create(data: DeepPartial<BusinessPartner>) {
        return this.businessPartnerRes.create(data);
    }

    async save(data: DeepPartial<BusinessPartner>): Promise<BusinessPartner> {
        return await this.businessPartnerRes.save(data);
    }

    async getAll(filter?: FindOneOptions<BusinessPartner>) {
        return await this.businessPartnerRes.find(filter);
    }

    async softRemove(BusinessPartner: BusinessPartner[]) {
        return await this.businessPartnerRes.softRemove(BusinessPartner);
    }

    public getOne = async (filter?: FindOneOptions<BusinessPartner>) => {
        return await this.businessPartnerRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<BusinessPartner>,
        data: DeepPartial<BusinessPartner>
    ): Promise<Boolean> {
        const result = await this.businessPartnerRes.update(where, data);
        return !!result.affected;
    }

    async businessPartners(searchText: string = null) {
        const qb = this.businessPartnerRes
            .createQueryBuilder('partner')
        if (searchText) {
            qb.andWhere(new Brackets((qb => {
                qb.orWhere('partner.email LIKE :searchText')
                    .orWhere('partner.fullName LIKE :searchText')
                    .orWhere('partner.typePartner LIKE :searchText')
            }))).setParameters({ searchText: `%${searchText}%` })
        }
        const data = await qb.orderBy('partner.createdAt', 'DESC').getMany();
        return data;
    }
}
