import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Programacao } from "./programacao.entity";
import { Categoria } from "./categoria.entity";


@Entity()
export class Usuario{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nome:string;

    @Column()
    login:string;

    @Column()
    senha:string;

    @OneToMany(type => Programacao, programacoes => programacoes.usuario)
    programacoes: Programacao[];

    @OneToMany(type => Categoria, categorias => categorias.usuario)
    categorias: Categoria[];

    constructor(data: {id:number, nome:string, login:string, senha:string}){
        this.id = data && data.id || 0;
        this.nome = data && data.nome || "";
        this.login = data && data.login || "";
        this.senha = data && data.senha || "";
    }

    toJson():string{
        return `{
            "id": ${this.id},
            "nome": "${this.nome}",
            "login": "${this.login}",
            "senha": "${this.senha}",
        }`
    }
}