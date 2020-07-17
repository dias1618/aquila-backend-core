import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [
    AppController,
    AuthController,
    UsuarioController
  ],
  providers: [
    AppService,
    UsuarioService
  ],
})
export class AppModule {}
