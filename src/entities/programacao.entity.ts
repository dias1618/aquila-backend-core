import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity } from "typeorm";
import { ProgramacaoVideo } from "./programacao-video.entity";
import { Usuario } from "./usuario.entity";

@Entity()
export class Programacao extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("varchar")
    titulo:string;

    @OneToMany(type => ProgramacaoVideo, programacoesVideos => programacoesVideos.programacao)
    programacoesVideos: ProgramacaoVideo[];
    
    @ManyToOne(type => Usuario, usuario => usuario.programacoes)
    usuario: Usuario;

}