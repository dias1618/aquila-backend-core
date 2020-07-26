import { LoginDto } from "src/dtos/login.dto";
import { Usuario } from "src/entities/usuario.entity";
import { getRepository, getManager, Connection } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UsuarioCategoria } from "src/entities/usuario-categoria.entity";
import { SignupDto } from "src/dtos/singup.dto";

@Injectable()
export class UsuarioService{

    constructor(private connection:Connection){}

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