import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DeleteArticleDTO,
  FindArticleDTO,
  InsertArticleDTO as CreateArticleDTO,
  UpdateArticleDTO,
} from './articles.dto';
import { Articles } from './articles.entity';

@Injectable()
export class ArticlesService {
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
}
