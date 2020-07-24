import { Injectable } from "@nestjs/common";
import { Video } from "src/entities/video.entity";
import { getRepository } from "typeorm";
import { RepositoryService } from "./repository.service";
import { CanalService } from "./canal.service";
import { CategoriaService } from "./categoria.service";

@Injectable()
export class VideoService{

    constructor(
        public repositoryService:RepositoryService,
        public canalService:CanalService,
        public categoriaService:CategoriaService
    ){}

    async save(video:Video){
        await video.save();
    }

    async getVideos():Promise<Video[]>{
        return await getRepository(Video).createQueryBuilder('video')
            .innerJoinAndSelect("video.canal", "canal")
            .innerJoinAndSelect("video.categoria", "categoria")
            .getMany();
    }

    async loadVideosFromRepositories(){
        let videos:Video[] = await this.repositoryService.loadVideos();
        for(let video of videos){
            video.canal = await this.canalService.get(video.channelId);
            video.categoria = await this.categoriaService.getByIdPlatform(video.categoryId);
            await this.save(video);
        }

    }
}