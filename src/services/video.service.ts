import { Injectable } from "@nestjs/common";
import { Video } from "src/entities/video.entity";
import { RecommendationService } from "./recommendation.service";

@Injectable()
export class VideoService{

    constructor(
        public recommendationService:RecommendationService,
    ){}

    async getVideos(idUsuario:number):Promise<Video[]>{
        return await this.recommendationService.recomendarVideos(idUsuario);
    }

}