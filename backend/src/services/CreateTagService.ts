import {getCustomRepository} from "typeorm";
import {TagsRepositories} from "../repositories/TagsRepositories";


interface ITagRequest {
    name: string;
}

export class CreateTagService {
    async execute({ name } : ITagRequest) {
        const tagsRepository = getCustomRepository(TagsRepositories);

        if(!name){
            throw new Error("Invalid name")
        }

        const tagExists = await tagsRepository.findOne({name})

        if(tagExists){
            throw new Error("Tag already exists")
        }

        const tag = tagsRepository.create({
            name
        })

        await tagsRepository.save(tag);

        return tag;

    }
}