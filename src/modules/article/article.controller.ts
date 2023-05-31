import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { CreateArticleDTO } from './dto/createArticle.dto';
import { User } from '../user/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDTO,
  ): any {
    return this.articleService.getAll(currentUser, createArticleDto);
  }
}
