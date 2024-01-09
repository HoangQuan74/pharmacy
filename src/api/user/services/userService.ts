// import { hashPass } from "../../../common/helper/hashPass";
// import { Users } from "../../../database/entities/Users";
// import { AppDataSource } from "../../../../src/ormconfig";
// import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";

// export class UserService {
//     private userRepository = AppDataSource.getRepository(Users);


//     create(data: DeepPartial<Users>) {
//         return this.userRepository.create(data);
//     }

//     async save(data: DeepPartial<Users>): Promise<Users> {
//         return await this.userRepository.save(data);
//     }

//     async getAll(filter?: FindOneOptions<Users>) {
//         return await this.userRepository.find(filter);
//     }

//     async softRemove(users: Users[]) {
//         return await this.userRepository.softRemove(users);
//     }

//     public getOne = async (filter?: FindOneOptions<Users>) => {
//         return await this.userRepository.findOne(filter);
//     }

//     async update(
//         where: FindOptionsWhere<Users>,
//         data: DeepPartial<Users>
//     ): Promise<Boolean> {
//         const result = await this.userRepository.update(where, data);
//         return !!result.affected;
//     }

//     public saveUser = async (user: Users) => {
//         try {
//             let oldUser;
//             if (user?.password)
//                 user.password = hashPass(user.password);
//             if (user?.id) {
//                 oldUser = await this.getUserById(user.id);
//                 user.fullName = user.fullName ?? oldUser.firstName;
//                 user.email = user.email ?? oldUser.email;
//                 user.password = user.password ?? oldUser.password;
//                 user.dob = user.dob ?? oldUser.dob;
//                 user.gender = user.gender ?? oldUser.gender;
//             }
//             const result = this.userRepository.save(user);
//             return result;
//         } catch (e) {
//             throw e;
//         }
//     };

//     public getUserById = async (id: number) => {
//         try {
//             const user = this.userRepository.findOne({
//                 where: {
//                     id: id,
//                 }
//             });
//             return user;
//         } catch (e) {
//             throw e;
//         }
//     }

//     public isExistsEmail = async (email: string) => {
//         try {
//             const user = await this.userRepository.findOne({
//                 where: {
//                     email: email,
//                 }
//             });
//             return user?.email;
//         } catch (e) {
//             throw e;
//         }
//     }

//     public login = async (email: string, password: string) => {
//         try {
//             const user = await this.getOne({ where: { id: 1 }, relations: ['projects', 'projects.members'] });
            
//             const result = await this.userRepository.findOne({
//                 where: {
//                     email: email,
//                     password: hashPass(password),
//                 },
//             });

//             return result;
//         } catch (e) {
//             throw e;
//         }
//     }
// }
