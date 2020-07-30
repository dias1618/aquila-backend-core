import { PrimaryGeneratedColumn, Entity, ManyToOne, BaseEntity } from "typeorm";
import { Video } from "./video.entity";
import { Usuario } from "./usuario.entity";

@Entity()
export class UsuarioVideo extends BaseEntity{

    constructor(data: {id?:number, usuario?:Usuario, video?:Video}){
        super();
        this.id = data && data.id || 0;
        this.usuario = data && data.usuario || undefined;
        this.video = data && data.video || undefined;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(type => Usuario, usuario => usuario.usuariosVideos)
    usuario: Usuario;

    @ManyToOne(type => Video, video => video.usuariosVideos)
    video: Video;

    toJson():string{
        return `{
            "id": ${this.id},
            "usuario": "${this.usuario.toJson()}",
            "video": "${this.video.toJson()}",
        }`
    }
}