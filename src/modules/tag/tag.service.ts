import { Injectable } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>
    ) {}
    getTags(): Promise<TagEntity[]>{
        return this.tagRepository.find();
    }
}