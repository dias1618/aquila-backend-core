import { Injectable } from "@nestjs/common";
import { UsuarioVideo } from "src/entities/usuario-video.entity";
import { getRepository } from "typeorm";

@Injectable()
export class UsuarioVideoService{

    async save(usuarioVideo:UsuarioVideo):Promise<UsuarioVideo>{
        usuarioVideo = new UsuarioVideo(usuarioVideo);
        return await usuarioVideo.save();
    }

}