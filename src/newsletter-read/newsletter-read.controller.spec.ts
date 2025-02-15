import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterReadController } from './newsletter-read.controller';

describe('NewsletterReadController', () => {
  let controller: NewsletterReadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsletterReadController],
    }).compile();

    controller = module.get<NewsletterReadController>(NewsletterReadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
