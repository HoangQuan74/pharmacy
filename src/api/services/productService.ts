import { Product } from "../../database/entities/Product";
import { AppDataSource } from "../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

export class ProductService {
    private productRes = AppDataSource.getRepository(Product);

    create(data: DeepPartial<Product>) {
        return this.productRes.create(data);
    }

    async save(data: DeepPartial<Product[]>): Promise<Product[]> {
        return await this.productRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Product>) {
        return await this.productRes.find(filter);
    }

    async softRemove(Product: Product[]) {
        return await this.productRes.softRemove(Product);
    }

    public getOne = async (filter?: FindOneOptions<Product>) => {
        return await this.productRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<Product>,
        data: DeepPartial<Product>
    ): Promise<Boolean> {
        const result = await this.productRes.update(where, data);
        return !!result.affected;
    }

    async products(searchText: string = null, categoryId: number = null) {
        const qb = this.productRes
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
        if (searchText) {
            qb.andWhere(new Brackets((qb) => {
                qb.orWhere('product.name LIKE :searchText')
                    .orWhere('product.usage LIKE :searchText')
            })).setParameters({ searchText: `%${searchText}%` });
        }
        if (categoryId) {
            qb.andWhere('category.id = :categoryId', { categoryId })
        }
        const data = await qb.getMany();
        return data;
    }
}
