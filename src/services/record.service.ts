import { Injectable } from "@nestjs/common";
import { Video } from "src/entities/video.entity";
import { AxiosCommunicationService } from "./external-communication/axios-communication.service";

@Injectable()
export class RecordService{

    constructor(
        public axios:AxiosCommunicationService,
    ){}

    async cadastrarNovasCategorias():Promise<any>{
        let response = await this.axios.get(`http://aquila-backend-records:3000/repositories/categorias`);
        return response.data;
    }

    async cadastrarNovosVideos():Promise<any>{
        let response = await this.axios.get(`http://aquila-backend-records:3000/repositories/videos`);
        return response.data;
    }

}