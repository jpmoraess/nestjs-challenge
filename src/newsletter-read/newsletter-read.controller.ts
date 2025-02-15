import { Controller, Get, Post, Query } from '@nestjs/common';
import { NewsletterReadService } from './newsletter-read.service';

@Controller('newsletter-read')
export class NewsletterReadController {
    constructor(private readonly newsletterReadService: NewsletterReadService) { }

    @Post('/track')
    async trackRead(@Query('email') email: string, @Query('newsletter_id') newsletterId: string) {
        return this.newsletterReadService.trackRead(email, newsletterId);
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
    async userReadHistory(@Query('email') email: string) {
        return this.newsletterReadService.getUserReadHistory(email);
    }
}
