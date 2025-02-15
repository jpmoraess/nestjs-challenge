import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsletterRead } from './newsletter.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NewsletterReadService {
    constructor(
        private readonly userService: UsersService,
        @InjectRepository(NewsletterRead) private newsletterReadRepository: Repository<NewsletterRead>
    ) { }

    async trackRead(email: string, newsletterId: string) {
        const user = await this.userService.findExistentOrInsert(email);
        const read = this.newsletterReadRepository.create({ userId: user.id, newsletterId });
        await this.newsletterReadRepository.save(read);
    }

    async getTopNewsletters() {
        return this.newsletterReadRepository
            .createQueryBuilder('read')
            .select('read.newsletterId, count(read.id) as total')
            .groupBy('read.newsletterId')
            .orderBy('total', 'DESC')
            .limit(5)
            .getRawMany()
    }

    async getTopReader() {
        return this.newsletterReadRepository
            .createQueryBuilder('nr')
            .select('nr.userId', 'userId')
            .addSelect('COUNT(*) as total_reads')
            .groupBy('nr.userId')
            .orderBy('total_reads', 'DESC')
            .limit(5)
            .getRawMany();
    }

    async getUserReadHistory(email: string) {
        const user = await this.userService.findUserByEmail(email)
        return this.newsletterReadRepository.find({
            where: { userId: user.id },
            select: ['newsletterId', 'readAt'],
            order: { 'readAt': 'DESC' }
        });
    }
}
