import { Video } from "src/entities/video.entity";
import { AxiosCommunicationService } from "src/services/external-communication/axios-communication.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RecommendationService{

    constructor(
        public axios:AxiosCommunicationService,
    ){}

    async recomendarVideos(idUsuario:number):Promise<Video[]>{
        let response = await this.axios.get(`http://aquila-backend-recommendation:3000/recommendations?idUsuario=${idUsuario}`);
        return response.data;
    }

}