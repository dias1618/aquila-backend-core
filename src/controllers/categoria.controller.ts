import { Controller, Get } from "@nestjs/common";
import { CategoriaService } from "src/services/categoria.service";

@Controller('categorias')
export class CategoriaController{

    constructor(private categoriaService:CategoriaService){}

    @Get()
    async get(){
        return this.categoriaService.get();
    }

}