import { Injectable } from '@nestjs/common';
import { CreateArticleDTO } from './dto/createArticle.dto';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleReposity: Repository<ArticleEntity>,
  ) {}

  async getAll(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDTO,
  ): Promise<ArticleEntity> {
    const newArticle = new ArticleEntity();
    Object.assign(newArticle, createArticleDto);
    if (!newArticle.tagList) {
      newArticle.tagList = [];
    }
    newArticle.slug = 'foooo';
    newArticle.author = currentUser;

    return this.articleReposity.save(newArticle);
    // return newArticle as any;
  }
}
