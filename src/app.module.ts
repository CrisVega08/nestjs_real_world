import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/modules/tag/tag.module';
import ormConfig from '@app/config/orm/ormconfig';
import { UserModule } from '@app/modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig), 
    TagModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


