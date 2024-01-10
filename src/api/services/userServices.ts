import { hashPass } from "../../common/helper/hashPass";
import { Users } from "../../database/entities/Users";
import { AppDataSource } from "../../../src/ormconfig";
import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

export class UserService {
  private userRepository = AppDataSource.getRepository(Users);

  create(data: DeepPartial<Users>) {
    return this.userRepository.create(data);
  }

  async save(data: DeepPartial<Users>): Promise<Users> {
    return await this.userRepository.save(data);
  }

  async getAll(filter?: FindOneOptions<Users>) {
    return await this.userRepository.find(filter);
  }

  async softRemove(users: Users[]) {
    return await this.userRepository.softRemove(users);
  }

  public getOne = async (filter?: FindOneOptions<Users>) => {
    return await this.userRepository.findOne(filter);
  }

  async update(
    where: FindOptionsWhere<Users>,
    data: DeepPartial<Users>
  ): Promise<Boolean> {
    const result = await this.userRepository.update(where, data);
    return !!result.affected;
  }

  public isExistsEmail = async (email: string) => {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        }
      });
      return user?.email;
    } catch (e) {
      throw e;
    }
  }

  public login = async (email: string, password: string) => {
    try {
      const result = await this.userRepository.findOne({
        where: {
          email: email,
          password: hashPass(password),
        },
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  async getToltalSalaryCurrentMonth() {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .select('SUM(user.salary)', 'totalSalary')
      .getRawOne();
    return data.totalSalary;
  }
}
