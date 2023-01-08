import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import {
  DeleteArticleDTO,
  FindArticleDTO,
  InsertArticleDTO,
  UpdateArticleDTO,
} from './articles.dto';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('findAll')
  async findAll(@Body() body: FindArticleDTO) {
    let articles = [];
    if (body.keyword) {
      articles = await this.articlesService.find(body);
      return {
        success: true,
        data: articles,
      };
    } else {
      articles = await this.articlesService.findAll();
      return {
        success: true,
        data: articles,
      };
    }
  }

  @Post('create')
  async create(@Body() body: InsertArticleDTO) {
    console.log(body);
    const result: InsertResult = await this.articlesService.create(body);
    if (result.identifiers.length > 0) {
      return {
        success: true,
        data: result,
      };
    }

    return {
      success: false,
      data: [],
    };
  }

  @Post('update')
  async update(@Body() body: UpdateArticleDTO) {
    const result: UpdateResult = await this.articlesService.update(body);
    return {
      success: true,
      data: result,
    };
  }

  @Post('delete')
  async delete(@Body() body: DeleteArticleDTO) {
    const result: DeleteResult = await this.articlesService.delete(body);
    return {
      success: true,
      data: result,
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    const fileContent = file.buffer.toString();
    const arr = fileContent.split(/\n\s*\n/g);
    const newArr = arr.map((s) => {
      return this.create({
        content: s,
      });
    });
    return Promise.all(newArr);
  }
}
