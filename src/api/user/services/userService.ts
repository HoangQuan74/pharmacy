import { Users } from "src/database/entities/Users";
import { AppDataSource } from "src/ormconfig";


export class UserService {
    private userRepository = AppDataSource.getRepository(Users);

    public register = async (user: Users) => {
        try {
            const result = this.userRepository.save(user);
            return result;
        } catch (e) {
            throw e;
        }
    }
}