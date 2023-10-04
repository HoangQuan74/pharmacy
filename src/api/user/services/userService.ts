import { hashPass } from "../../../common/helper/hashPass";
import { Users } from "../../../database/entities/Users";
import { AppDataSource } from "../../../../src/ormconfig";

export class UserService {
    private userRepository = AppDataSource.getRepository(Users);

    public saveUser = async (user: Users) => {
        try {
            let oldUser;
            if (user?.password)
                user.password = hashPass(user.password);
            if (user?.id) {
                oldUser = await this.getUserById(user.id);
                user.firstName = user.firstName ?? oldUser.firstName;
                user.lastName = user.lastName ?? oldUser.lastName;
                user.email = user.email ?? oldUser.email;
                user.password = user.password ?? oldUser.password;
                user.dob = user.dob ?? oldUser.dob;
                user.gender = user.gender ?? oldUser.gender;
            }
            const result = this.userRepository.save(user);
            return result;
        } catch (e) {
            throw e;
        }
    };

    public getUserById = async (id: number) => {
        try {
            const user = this.userRepository.findOne({
                where: {
                    id: id,
                }
            });
            return user;
        } catch (e) {
            throw e;
        }
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
}
