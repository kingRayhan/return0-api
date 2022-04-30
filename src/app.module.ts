import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@/api/user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { CourseModule } from '@/api/course/course.module';
import { ChapterModule } from '@/api/chapter/chapter.module';
import { LessonModule } from '@/api/lesson/lesson.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionModule } from '@/api/session/session.module';
import { AuthModule } from './api/auth/auth.module';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypegooseModule.forRoot(config.get('DATABASE_URL')),
    SessionModule,
    UserModule,
    CourseModule,
    ChapterModule,
    LessonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
