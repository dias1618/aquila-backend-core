import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './services/usuario.service';
import { VideoController } from './controllers/video.controller';
import { AxiosCommunicationService } from './services/external-communication/axios-communication.service';
import { CategoriaService } from './services/categoria.service';
import { VideoService } from './services/video.service';
import { CategoriaController } from './controllers/categoria.controller';
import { HistoryController } from './controllers/history.controller';
import { UsuarioVideoService } from './services/usuario-video.service';
import { RecommendationService } from './services/recommendation.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './services/task.service';
import { RecordService } from './services/record.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot()
  ],
  controllers: [
    AppController,
    HistoryController,
    VideoController,
    CategoriaController
  ],
  providers: [
    AppService,
    UsuarioService,
    RecommendationService,
    AxiosCommunicationService,
    CategoriaService,
    VideoService,
    UsuarioVideoService,
    TasksService,
    RecordService
  ],
})
export class AppModule {}
