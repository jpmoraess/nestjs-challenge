import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NewsletterReadModule } from './newsletter-read/newsletter-read.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: false,
        entities: [`${__dirname}/**/*.entity{.js,.ts}`],
        migrations: [`${__dirname}/migration/{.ts,*.js}`],
        migrationsRun: true,
        logging: true
      }),
    }),

    UsersModule, 
    NewsletterReadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
