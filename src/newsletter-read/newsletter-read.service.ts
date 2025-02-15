import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { NewsletterRead } from './newsletter.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NewsletterReadService {
    constructor(
        private readonly userService: UsersService,
        @InjectRepository(NewsletterRead) private newsletterReadRepository: Repository<NewsletterRead>,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) { }

    async trackRead(email: string, newsletterId: string) {
        const user = await this.userService.findExistentUserOrInsertNew(email);
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

    async getUserReadHistory3(email: string) {
        const user = await this.userService.findUserByEmail(email)
        return this.newsletterReadRepository.find({
            where: { userId: user.id },
            select: ['newsletterId', 'readAt'],
            order: { 'readAt': 'DESC' }
        });
    }

    async getUserReadHistory(email: string) {
        const user = await this.userService.findUserByEmail(email)

        const query = `
            SELECT newsletter_id, read_at 
            FROM newsletter_read 
            WHERE user_id = ${user.id}
            ORDER BY read_at DESC;
        `;

        return this.entityManager.query(query);

       /*  return this.newsletterReadRepository.find({
            where: { userId: user.id },
            select: ['newsletterId', 'readAt'],
            order: { 'readAt': 'DESC' }
        }); */
    }
}
