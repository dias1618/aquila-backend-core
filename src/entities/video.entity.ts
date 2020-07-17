import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import { Midia } from "src/enums/midia.enum";
import { ProgramacaoVideo } from "./programacao-video.entity";

@Entity()
export class Video{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    url:string;

    @Column()
    midia:Midia;

    @Column()
    duracao:number;

    @OneToMany(type => ProgramacaoVideo, programacoesVideos => programacoesVideos.video)
    programacoesVideos: ProgramacaoVideo[];
}