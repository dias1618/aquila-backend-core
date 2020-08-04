import { LoginDto } from "src/dtos/login.dto";
import { Usuario } from "src/entities/usuario.entity";
import { getRepository, getManager, Connection } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UsuarioCategoria } from "src/entities/usuario-categoria.entity";
import { SignupDto } from "src/dtos/singup.dto";
import { Categoria } from "src/entities/categoria.entity";

@Injectable()
export class UsuarioService{

    constructor(private connection:Connection){}

    async get(idUsuario:number):Promise<Usuario>{

        let usuario:Usuario = await getRepository(Usuario).createQueryBuilder('usuario')
            .where("usuario.id = :id", {id: idUsuario})
            .getOne();

        usuario.usuariosCategorias = await getRepository(UsuarioCategoria).createQueryBuilder('usuario_categoria')
            .where("usuario_categoria.usuarioId = :id", {id: idUsuario})
            .innerJoinAndSelect("usuario_categoria.categoria", "categoria")
            .getMany();

        return usuario;
    }

    async login(loginDto:LoginDto){
        const usuarioRepository = await getRepository(Usuario).createQueryBuilder('usuario')
            .where("usuario.login = :login", {login: loginDto.login})
            .andWhere("usuario.senha = :senha", {senha: loginDto.senha})
            .getOne();

        return usuarioRepository;
    }

    async create(signupDto:SignupDto):Promise<Usuario>{
        let usuario:Usuario;

        await getManager().transaction(async transactionEntityManager => {
            usuario = await transactionEntityManager.save(new Usuario(signupDto.usuario));
            let usuarioCategoriasList:UsuarioCategoria[] = [];
            for(let usuarioCategorias of signupDto.usuarioCategorias){
                usuarioCategorias.usuario = usuario;
                usuarioCategoriasList.push(new UsuarioCategoria(usuarioCategorias));
            }
            await transactionEntityManager.save(usuarioCategoriasList);
        }).catch((reason) => {
            console.log(reason);
        });

        return usuario;
        
    }

}