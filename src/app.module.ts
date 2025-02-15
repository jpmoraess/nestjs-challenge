import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NewsletterReadModule } from './newsletter-read/newsletter-read.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'newsletter',
      autoLoadEntities: true,
      synchronize: true // não usar em produção, (migrations...)
    }),

    UsersModule, 
    NewsletterReadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
