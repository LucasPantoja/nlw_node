import {UsersRepositories} from "../repositories/UsersRepositories";
import {getCustomRepository} from "typeorm";
import {hash} from "bcryptjs";


interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

export class CreateUserService {
    async execute({ name, email, admin = false, password } : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userExists = await usersRepository.findOne({email});

        if (userExists) {
            throw new Error("User already exists");
        }

        const hashPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: hashPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}
