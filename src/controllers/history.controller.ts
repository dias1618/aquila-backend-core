import { Controller, Get, Post, Body } from "@nestjs/common";
import { UsuarioVideoService } from "src/services/usuario-video.service";
import { UsuarioVideo } from "src/entities/usuario-video.entity";

@Controller('history')
export class HistoryController{

    constructor(private usuarioVideoService:UsuarioVideoService){}

    @Post()
    async createUsuarioVideo(@Body() usuarioVideo:UsuarioVideo){
        return await this.usuarioVideoService.save(usuarioVideo);
    }

}