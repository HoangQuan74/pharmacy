import { AppDataSource } from "../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { OrderDetail } from "../../database/entities/OrderDetail";

export class OrderDetailService {
    private orderDetailRes = AppDataSource.getRepository(OrderDetail);

    create(data: DeepPartial<OrderDetail>) {
        return this.orderDetailRes.create(data);
    }

    async save(data: DeepPartial<OrderDetail[]>): Promise<OrderDetail[]> {
        return await this.orderDetailRes.save(data);
    }

    async getAll(filter?: FindOneOptions<OrderDetail>) {
        return await this.orderDetailRes.find(filter);
    }

    async softRemove(OrderDetail: OrderDetail[]) {
        return await this.orderDetailRes.softRemove(OrderDetail);
    }

    public getOne = async (filter?: FindOneOptions<OrderDetail>) => {
        return await this.orderDetailRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<OrderDetail>,
        data: DeepPartial<OrderDetail>
    ): Promise<Boolean> {
        const result = await this.orderDetailRes.update(where, data);
        return !!result.affected;
    }
}
