import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/modules/tag/tag.module';
import ormConfig from '@app/config/orm/ormconfig';
import { UserModule } from '@app/modules/user/user.module';
import { AuthMiddleware } from './modules/user/middleware/auth.middleware';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TagModule,
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
