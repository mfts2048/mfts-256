import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DeleteArticleDTO,
  FindArticleDTO,
  InsertArticleDTO as CreateArticleDTO,
  UpdateArticleDTO,
} from './articles.dto';
import { Articles } from './articles.entity';
import { Cron } from '@nestjs/schedule';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'process';

const root = process.cwd();

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectRepository(Articles)
    private articlesRepository: Repository<Articles>,
  ) {}

  findAll(): Promise<Articles[]> {
    return this.articlesRepository.find();
  }

  find(body: FindArticleDTO): Promise<Articles[]> {
    return this.articlesRepository
      .createQueryBuilder('articles')
      .where('articles.content like :content', {
        content: `%${body.keyword}%`,
      })
      .getMany();
  }

  create(body: CreateArticleDTO) {
    return this.articlesRepository.insert(body);
  }

  update(body: UpdateArticleDTO) {
    return this.articlesRepository.update(body.id, {
      content: body.content,
    });
  }

  delete(body: DeleteArticleDTO) {
    return this.articlesRepository.delete(body.id);
  }

  @Cron('* 10 * * * *') // 每小时一次，十分钟开始
  handleCron() {
    this.logger.debug('开始备份本地...');
    this.createTxt();
  }

  createTxt() {
    this.findAll().then((result) => {
      const contents = result.map((e) => e.content).join('\n\n');
      console.log(path.join(root, 'logger', String(Date.now()) + '.txt'));
      fs.writeFile(
        path.join(root, 'logger', String(Date.now()) + '.txt'),
        contents,
        'utf-8',
        (err) => {
          if (err) {
            console.log(err);
          }
        },
      );
    });
  }
}
