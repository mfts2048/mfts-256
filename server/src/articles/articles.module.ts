import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { Articles } from "./articles.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  providers: [ArticlesService],
  controllers: [ArticlesController]
})
export class ArticlesModule {}
