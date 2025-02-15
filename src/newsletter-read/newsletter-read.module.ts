import { Module } from '@nestjs/common';
import { NewsletterReadService } from './newsletter-read.service';
import { NewsletterReadController } from './newsletter-read.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterRead } from './newsletter.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsletterRead]),
    UsersModule
  ],
  providers: [NewsletterReadService],
  controllers: [NewsletterReadController]
})
export class NewsletterReadModule {}
