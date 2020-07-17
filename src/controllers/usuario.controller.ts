import { Controller, Post, HttpCode, Body, Param, Get } from "@nestjs/common";
import { UsuarioService } from "src/services/usuario.service";
import { Usuario } from "src/entities/usuario.entity";

@Controller()
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Post('usuarios')
    @HttpCode(200)
    async createUsuario(@Body() usuario:Usuario) {
        usuario = new Usuario(usuario); 
        return await this.usuarioService.create(usuario);
    }
}