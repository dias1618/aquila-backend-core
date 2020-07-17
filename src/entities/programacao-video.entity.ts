import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DiaSemana } from "src/enums/dia-semana.enum";
import { Programacao } from "./programacao.entity";
import { Video } from "./video.entity";

@Entity()
export class ProgramacaoVideo{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    diaSemana:DiaSemana

    @Column()
    horaInicial:number;

    @Column()
    horaFinal:number;

    @ManyToOne(type => Programacao, programacao => programacao.programacoesVideos)
    programacao: Programacao;

    @ManyToOne(type => Video, video => video.programacoesVideos)
    video: Video;
}