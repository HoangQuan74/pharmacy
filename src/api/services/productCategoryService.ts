import { AppDataSource } from "../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { ProductCategory } from "../../database/entities/ProductCategory";

export class ProductCategoryService {
    private productCategoryRes = AppDataSource.getRepository(ProductCategory);

    create(data: DeepPartial<ProductCategory>) {
        return this.productCategoryRes.create(data);
    }

    async save(data: DeepPartial<ProductCategory>): Promise<ProductCategory> {
        return await this.productCategoryRes.save(data);
    }

    async getAll(filter?: FindOneOptions<ProductCategory>) {
        return await this.productCategoryRes.find(filter);
    }

    async softRemove(ProductCategory: ProductCategory[]) {
        return await this.productCategoryRes.softRemove(ProductCategory);
    }

    public getOne = async (filter?: FindOneOptions<ProductCategory>) => {
        return await this.productCategoryRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<ProductCategory>,
        data: DeepPartial<ProductCategory>
    ): Promise<Boolean> {
        const result = await this.productCategoryRes.update(where, data);
        return !!result.affected;
    }
}
