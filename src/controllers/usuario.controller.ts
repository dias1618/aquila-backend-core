import { Controller, Post, HttpCode, Body, Param, Get } from "@nestjs/common";
import { UsuarioService } from "src/services/usuario.service";
import { Usuario } from "src/entities/usuario.entity";
import { UsuarioCategoria } from "src/entities/usuario-categoria.entity";
import { SignupDto } from "src/dtos/singup.dto";

@Controller('usuarios')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Post('/signup')
    @HttpCode(200)
    async createUsuario(@Body() signupDto:SignupDto) {
        return await this.usuarioService.create(signupDto);
    }
}