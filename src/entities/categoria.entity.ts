import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity()
export class Categoria{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nome:string;

    @ManyToOne(type => Usuario, usuario => usuario.categorias)
    usuario: Usuario;
}