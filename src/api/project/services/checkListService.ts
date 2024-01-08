import { CheckList } from "../../../database/entities/CheckList";
import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

export class CheckListService {
    private checkListRes = AppDataSource.getRepository(CheckList);


    create(data: DeepPartial<CheckList>) {
        return this.checkListRes.create(data);
    }

    async save(data: DeepPartial<CheckList>): Promise<CheckList> {
        return await this.checkListRes.save(data);
    }

    async getAll(filter?: FindOneOptions<CheckList>) {
        return await this.checkListRes.find(filter);
    }

    async softRemove(CheckList: CheckList[]) {
        return await this.checkListRes.softRemove(CheckList);
    }

    public getOne = async (filter?: FindOneOptions<CheckList>) => {
        return await this.checkListRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<CheckList>,
        data: DeepPartial<CheckList>
    ): Promise<Boolean> {
        const result = await this.checkListRes.update(where, data);
        return !!result.affected;
    }

    async getCheckListById(projectId: number, checkListId: number) {
        const data = await this.checkListRes
            .createQueryBuilder('checkList')
            .leftJoin('checkList.task', 'task')
            .where('task.projectId = :projectId', { projectId })
            .andWhere('checkList.id = :checkListId', { checkListId })
            .getOne();
        return data;
    }
}