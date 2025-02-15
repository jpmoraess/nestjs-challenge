import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { NewsletterRead } from './newsletter.entity';
import { UsersService } from 'src/users/users.service';
import { UserReadHistoryDto } from './dto/user-read-history.dto';
import { TopReaderDto } from './dto/top_reader.dto';
import { TopNewsletterDto } from './dto/top_newsletter.dto';

@Injectable()
export class NewsletterReadService {
    constructor(
        private readonly userService: UsersService,
        @InjectRepository(NewsletterRead) private readonly newsletterReadRepository: Repository<NewsletterRead>,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) { }

    async trackRead(email: string, newsletterId: string) {
        const user = await this.userService.findExistentUserOrInsertNew(email);
        const read = this.newsletterReadRepository.create({ userId: user.id, newsletterId });
        await this.newsletterReadRepository.save(read);
    }

    async getTopNewsletters(): Promise<TopNewsletterDto[]> {
        const query = `
            SELECT r.newsletter_id, count(r.id) as total FROM newsletter_read AS r
            GROUP BY r.newsletter_id
            ORDER BY total DESC
            LIMIT 5;
        `;

        const result = await this.entityManager.query(query);

        return result.map((item) => {
            return new TopNewsletterDto(item.newsletter_id, Number(item.total));
        });
        

       /*  return this.newsletterReadRepository
            .createQueryBuilder('read')
            .select('read.newsletterId, count(read.id) as total')
            .groupBy('read.newsletterId')
            .orderBy('total', 'DESC')
            .limit(5)
            .getRawMany() */
    }

    async getTopReader(): Promise<TopReaderDto[]> {
        const result = await this.newsletterReadRepository
            .createQueryBuilder('nr')
            .select('nr.userId', 'user_id')
            .addSelect('COUNT(*) as total')
            .groupBy('nr.userId')
            .orderBy('total', 'DESC')
            .limit(5)
            .getRawMany();

            return result.map((item) => {
                return new TopReaderDto(item.user_id, Number(item.total));
            });
    }

    async getUserReadHistory(email: string): Promise<UserReadHistoryDto[]> {
        const user = await this.userService.findUserByEmail(email)
      
        const query = `
            SELECT newsletter_id, read_at 
            FROM newsletter_read 
            WHERE user_id = $1
            ORDER BY read_at DESC;
        `;

        const result = await this.entityManager.query(query, [user.id]);

        return result.map((item) => {
            return new UserReadHistoryDto(item.newsletter_id, item.read_at);
        });
    }
}
