import {getCustomRepository} from "typeorm";
import {ComplimentsRepositories} from "../repositories/ComplimentsRepositories";
import {UsersRepositories} from "../repositories/UsersRepositories";


interface IComplimentRequest {
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string;
}

export class CreateComplimentService {
    async execute({user_sender, user_receiver, tag_id, message} : IComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentsRepositories);
        const usersRepository = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver) {
            throw new Error("You can't compliment yourself");
        }

        const userReceiver = await usersRepository.findOne({id: user_receiver});

        if(!userReceiver) {
            throw new Error("User receiver does not exists");
        }

        const compliment = complimentsRepository.create({
            user_sender,
            user_receiver,
            tag_id,
            message,
        });

        await complimentsRepository.save(compliment);

        return compliment;
    }
}