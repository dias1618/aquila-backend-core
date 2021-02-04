import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RecordService } from './record.service';

@Injectable()
export class TasksService {
  
    constructor(private _recordService:RecordService){}

    @Cron(CronExpression.EVERY_WEEKEND)
    async handleCron() {
        await this._recordService.cadastrarNovasCategorias();
        await this._recordService.cadastrarNovosVideos();
    }
}