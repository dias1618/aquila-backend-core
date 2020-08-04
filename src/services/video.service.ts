import { Injectable } from "@nestjs/common";
import { Video } from "src/entities/video.entity";
import { getRepository } from "typeorm";
import { RepositoryService } from "./repository.service";
import { CanalService } from "./canal.service";
import { CategoriaService } from "./categoria.service";
import { Categoria } from "src/entities/categoria.entity";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "src/entities/usuario.entity";
import { RecommendationService } from "./recommendation/recommendation.service";

@Injectable()
export class VideoService{

    constructor(
        public repositoryService:RepositoryService,
        public canalService:CanalService,
        public categoriaService:CategoriaService,
        public usuarioService:UsuarioService,
        public recommendationService:RecommendationService,
    ){}

    async save(video:Video){
        await video.save();
    }

    async getVideos(idUsuario:number):Promise<Video[]>{
        return await this.recommendationService.recomendarVideos(idUsuario);
    }

    async loadVideosFromRepositories(){

        let categorias:Categoria[] = await this.categoriaService.get();
        for(let categoria of categorias){
            let videos:Video[] = await this.repositoryService.loadVideos(categoria);
            for(let video of videos){
                let ret = await this.getByIdPlatform(video.idPlatform);
                if(!ret){
                    video.canal = await this.canalService.get(video.channelId);
                    video.categoria = await this.categoriaService.getByIdPlatform(video.categoryId);
                    await this.save(video);
                }
            }
        }

        

    }

    async getByIdPlatform(idPlatform:string):Promise<Video>{
        return await getRepository(Video).createQueryBuilder('video')
            .where("video.idPlatform = :idPlatform", {idPlatform: idPlatform})
            .getOne();
    }
}