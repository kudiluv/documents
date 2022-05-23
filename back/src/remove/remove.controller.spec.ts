import { Test, TestingModule } from '@nestjs/testing';
import { RemoveController } from './remove.controller';

describe('RemoveController', () => {
  let controller: RemoveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveController],
    }).compile();

    controller = module.get<RemoveController>(RemoveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
