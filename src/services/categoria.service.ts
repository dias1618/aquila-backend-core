import { Injectable } from "@nestjs/common";
import { Categoria } from "src/entities/categoria.entity";
import { getRepository } from "typeorm";

@Injectable()
export class CategoriaService{

    async get():Promise<Categoria[]>{
        return await getRepository(Categoria).createQueryBuilder('categoria')
            .getMany();
    }

}