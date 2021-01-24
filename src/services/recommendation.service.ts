import { Video } from "src/entities/video.entity";
import { AxiosCommunicationService } from "src/services/external-communication/axios-communication.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RecommendationService{

    constructor(
        public axios:AxiosCommunicationService,
    ){}

    async recomendarVideos(idUsuario:number):Promise<Video[]>{
        let response = await this.axios.get(`http://localhost:3004/recommendations?idUsuario=${idUsuario}`);
        return response.data;
    }

}