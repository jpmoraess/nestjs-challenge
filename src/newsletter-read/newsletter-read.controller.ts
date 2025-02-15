import { Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { NewsletterReadService } from './newsletter-read.service';
import { TrackReadQueryDto } from './dto/track-read-query.dto';
import { UserHistoryQueryDto } from './dto/user-history-query.dto';

@Controller('newsletter-read')
export class NewsletterReadController {
    constructor(private readonly newsletterReadService: NewsletterReadService) { }

    @Post('/track')
    async trackRead(@Query(new ValidationPipe({ transform: true })) query: TrackReadQueryDto) {
        return this.newsletterReadService.trackRead(query.email, query.id);
    }

    @Get('/top-newsletters')
    async topNewsletters() {
        return this.newsletterReadService.getTopNewsletters();
    }

    @Get('/top-readers')
    async topReader() {
        return this.newsletterReadService.getTopReader();
    }

    @Get('/user-history')
    async userReadHistory(@Query(new ValidationPipe({ transform: true })) query: UserHistoryQueryDto) {
        return this.newsletterReadService.getUserReadHistory(query.email);
    }
}
