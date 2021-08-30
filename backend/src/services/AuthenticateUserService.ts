import {getCustomRepository} from "typeorm";
import {UsersRepositories} from "../repositories/UsersRepositories";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

export class AuthenticateUserService {
    async execute({ email, password } : IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({email});

        if(!user) {
            throw new Error("Email/Password Incorrect")
        }

        const matchPassword = await compare(password, user.password);

        if(!matchPassword) {
            throw new Error("Email/Password Incorrect")
        }

        const token = sign({
            email: user.email
        }, "080ac2fef039772b0eea280b8e6b40f5", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}