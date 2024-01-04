import { Projects } from "../../../database/entities/Projects";
import { AppDataSource } from "../../../../src/ormconfig";
import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

export class ProjectService {
  private projectRes = AppDataSource.getRepository(Projects);

  create(data: DeepPartial<Projects>) {
    return this.projectRes.create(data);
  }

  async save(data: DeepPartial<Projects>): Promise<Projects> {
    return await this.projectRes.save(data);
  }

  async getAll(filter?: FindOneOptions<Projects>) {
    return await this.projectRes.find(filter);
  }

  async softRemove(Projects: Projects[]) {
    return await this.projectRes.softRemove(Projects);
  }

  public getOne = async (filter?: FindOneOptions<Projects>) => {
    return await this.projectRes.findOne(filter);
  };

  async update(
    where: FindOptionsWhere<Projects>,
    data: DeepPartial<Projects>
  ): Promise<Boolean> {
    const result = await this.projectRes.update(where, data);
    return !!result.affected;
  }

  async isMember(projectId: number, userId: number) {
    const data = await this.projectRes
      .createQueryBuilder("project")
      .leftJoin("project.members", "member")
      .where("project.id = :projectId", { projectId })
      .andWhere("member.userId = :userId", { userId })
      .getOne();
    return !!data;
  }

  async isUniqueName(userId: number, name) {
    const existingProject = await this.getOne({
      where: { ownerId: userId, name: name },
    });
    return existingProject ? false : true;
  }
}
