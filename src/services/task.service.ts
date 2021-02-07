import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RecordService } from './record.service';

@Injectable()
export class TasksService {
  
    constructor(private _recordService:RecordService){}

    @Cron(CronExpression.EVERY_30_SECONDS)
    async handleCron() {
        try{
            console.log('[core] Iniciada busca e cadastro de categorias e videos');
            let quantidadeCategorias = await this._recordService.cadastrarNovasCategorias();
            let quantidadeVideos = await this._recordService.cadastrarNovosVideos();
            console.log(`[core] Finalizada com sucesso busca e cadastro de ${quantidadeCategorias} categorias e ${quantidadeVideos} videos`);
        } catch(error){
            console.log('[core] Erro em busca e cadastro de categorias e videos');
            console.error(error);
        }
        
    }
}