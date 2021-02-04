import { Injectable } from "@nestjs/common";
import { Video } from "src/entities/video.entity";
import { AxiosCommunicationService } from "./external-communication/axios-communication.service";

@Injectable()
export class RecordService{

    constructor(
        public axios:AxiosCommunicationService,
    ){}

    async cadastrarNovasCategorias():Promise<any>{
        let response = await this.axios.get(`http://localhost:3004/repositories/categorias`);
        return response.data;
    }

    async cadastrarNovosVideos():Promise<any>{
        let response = await this.axios.get(`http://localhost:3004/repositories/videos`);
        return response.data;
    }

}