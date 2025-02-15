import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterReadService } from './newsletter-read.service';

describe('NewsletterReadService', () => {
  let service: NewsletterReadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsletterReadService],
    }).compile();

    service = module.get<NewsletterReadService>(NewsletterReadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
