import { Usuario } from "src/entities/usuario.entity";
import { UsuarioCategoria } from "src/entities/usuario-categoria.entity";

export class SignupDto{
    usuario:Usuario;
    usuarioCategorias:UsuarioCategoria[];
}