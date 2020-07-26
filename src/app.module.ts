import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { YoutubeApiService } from './services/video-api/youtube-api/youtube-api.service';
import { VideoController } from './controllers/video.controller';
import { AxiosCommunicationService } from './services/external-communication/axios-communication.service';
import { ConfigManagerService } from './services/video-api/youtube-api/config-manager.service';
import { InvalidTokenHandling } from './services/video-api/youtube-api/invalid-token-handling';
import { Handling } from './services/video-api/handling.interface';
import { CategoriaService } from './services/categoria.service';
import { VideoService } from './services/video.service';
import { CanalService } from './services/canal.service';
import { RepositoryService } from './services/repository.service';
import { RepositoryController } from './controllers/repository.controller';
import { CategoriaController } from './controllers/categoria.controller';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [
    AppController,
    AuthController,
    UsuarioController,
    VideoController,
    RepositoryController,
    CategoriaController
  ],
  providers: [
    AppService,
    UsuarioService,
    YoutubeApiService,
    ConfigManagerService,
    AxiosCommunicationService,
    {
      provide: Handling,
      useClass: InvalidTokenHandling
    },
    CategoriaService,
    VideoService,
    CanalService,
    RepositoryService
  ],
})
export class AppModule {}
