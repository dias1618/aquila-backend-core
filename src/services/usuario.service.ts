import { LoginDto } from "src/dtos/login.dto";
import { Usuario } from "src/entities/usuario.entity";
import { getRepository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioService{

    async login(loginDto:LoginDto){
        const usuarioRepository = await getRepository(Usuario).createQueryBuilder('usuario')
            .where("usuario.login = :login", {login: loginDto.login})
            .andWhere("usuario.senha = :senha", {senha: loginDto.senha})
            .getOne();

        return usuarioRepository;
    }

    async create(usuario:Usuario):Promise<Usuario>{
        return await getRepository(Usuario).save(usuario);
    }

}