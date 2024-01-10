import { AppDataSource } from "../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { Order, StatusPaid, TypeOrder } from "../../database/entities/Order";

export class OrderService {
    private orderRes = AppDataSource.getRepository(Order);

    create(data: DeepPartial<Order>) {
        return this.orderRes.create(data);
    }

    async save(data: DeepPartial<Order>): Promise<Order> {
        return await this.orderRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Order>) {
        return await this.orderRes.find(filter);
    }

    async softRemove(Order: Order[]) {
        return await this.orderRes.softRemove(Order);
    }

    public getOne = async (filter?: FindOneOptions<Order>) => {
        return await this.orderRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<Order>,
        data: DeepPartial<Order>
    ): Promise<Boolean> {
        const result = await this.orderRes.update(where, data);
        return !!result.affected;
    }

    async orders(
        typeOrder: TypeOrder = null,
        searchText: string = null,
        statusPaid: StatusPaid = null,
    ) {
        const qb = this.orderRes
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.partner', 'partner')
            .leftJoinAndSelect('order.payments', 'payment')
            .leftJoinAndSelect('order.orderDetails', 'orderDetail');

        if (typeOrder) {
            qb.andWhere('order.typeOrder = :typeOrder', { typeOrder });
        }
        if (searchText) {
            qb.andWhere((new Brackets((qb) => {
                qb.orWhere('partner.fullName LIKE :searchText')
                    .orWhere('user.fullName LIKE :searchText')
            }))).setParameters({
                searchText: `%${searchText}%`
            });
        }
        if (statusPaid) {
            qb.andWhere('order.status = :statusPaid', { statusPaid });
        }
        return qb.orderBy('order.createdAt', 'DESC').getMany();
    }

    async getTotalAmount(typeOrder: TypeOrder) {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const data = await this.orderRes
            .createQueryBuilder('order')
            .select('SUM(order.totalAmount)', 'totalAmount')
            .where('order.typeOrder = :typeOrder', { typeOrder })
            .andWhere('order.createdAt >= :startOfMonth', { startOfMonth })
            .andWhere('order.createdAt <= :endOfMonth', { endOfMonth })
            .andWhere('order.status = :status', { status: StatusPaid.PAID })
            .getRawOne();
        return data.totalAmount;
    }
}
