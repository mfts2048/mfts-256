import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  DeleteArticleDTO,
  FindArticleDTO,
  InsertArticleDTO,
  UpdateArticleDTO,
} from './articles.dto';
import { ArticlesService } from './articles.service';
import { success } from '../utils/type';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('findAll')
  async findAll(@Body() body: FindArticleDTO) {
    return success(
      body.keyword
        ? await this.articlesService.find(body)
        : await this.articlesService.findAll(),
    );
  }

  @Post('create')
  async create(@Body() body: InsertArticleDTO) {
    return success(await this.articlesService.create(body));
  }

  @Post('update')
  async update(@Body() body: UpdateArticleDTO) {
    return success(await this.articlesService.update(body));
  }

  @Post('delete')
  async delete(@Body() body: DeleteArticleDTO) {
    return success(await this.articlesService.delete(body));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    const fileContent = file.buffer.toString();
    const arr = fileContent.split(/\n\s*\n/g);
    return Promise.all(arr.map((s) => this.create({ content: s })));
  }
}
