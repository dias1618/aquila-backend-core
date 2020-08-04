import { Usuario } from "src/entities/usuario.entity";
import { Programacao } from "src/entities/programacao.entity";
import { Video } from "src/entities/video.entity";
import { Categoria } from "src/entities/categoria.entity";
import { getRepository } from "typeorm";
import { UsuarioCategoria } from "src/entities/usuario-categoria.entity";
import { UsuarioVideo } from "src/entities/usuario-video.entity";

export class RecommendationService{


    async recomendarVideos(idUsuario:number):Promise<Video[]>{
        let categorias:Categoria[] = await this.buscarCategorias(idUsuario);
        let videosAssistidos:Video[] = await this.buscarVideosAssistidos(idUsuario);
        let videosRecomendados:Video[] = await this.buscarVideosRecomendados(categorias, videosAssistidos);
        return videosRecomendados;
    }

    async buscarCategorias(idUsuario:number):Promise<Categoria[]>{
        let usuarioCategorias:UsuarioCategoria[] = await getRepository(UsuarioCategoria)
            .createQueryBuilder('usuarioCategoria')
            .innerJoinAndSelect("usuarioCategoria.usuario", "usuario")
            .innerJoinAndSelect("usuarioCategoria.categoria", "categoria")
            .where("usuario.id = :idUsuario", {idUsuario: idUsuario})
            .getMany();

        let categorias:Categoria[] = [];
        usuarioCategorias.forEach((usuarioCategoria) => categorias.push(usuarioCategoria.categoria));
        return categorias;
    }

    async buscarVideosAssistidos(idUsuario:number):Promise<Video[]>{
        let usuarioVideos:UsuarioVideo[] = await getRepository(UsuarioVideo)
            .createQueryBuilder('usuarioVideo')
            .innerJoinAndSelect("usuarioVideo.usuario", "usuario")
            .innerJoinAndSelect("usuarioVideo.video", "video")
            .where("usuario.id = :idUsuario", {idUsuario: idUsuario})
            .getMany();

        let videos:Video[] = [];
        usuarioVideos.forEach((usuarioVideo) => videos.push(usuarioVideo.video));
        return videos;
    }

    async buscarVideosRecomendados(categorias:Categoria[], videosAssistidos:Video[]):Promise<Video[]>{
    
        let idsCategoria:number[] = [];
        categorias.map((categoria)=>idsCategoria.push(categoria.id));

        let idsVideosAssistidos:number[] = [];
        videosAssistidos.map((video)=>idsVideosAssistidos.push(video.id));

        let query = await getRepository(Video)
            .createQueryBuilder('video')
            .innerJoinAndSelect("video.categoria", "categoria")
            .innerJoinAndSelect("video.canal", "canal")
            .where("");
        if(idsCategoria.length > 0)
            query = await query.andWhere("categoria.id IN(:...idsCategoria)", {idsCategoria: idsCategoria});
        if(idsVideosAssistidos.length > 0)
            query = await query.andWhere("video.id NOT IN(:...idsVideosAssistidos)", {idsVideosAssistidos: idsVideosAssistidos})
            
        return await query.getMany();

    }


}