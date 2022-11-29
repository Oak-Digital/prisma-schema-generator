import { Test, TestingModule } from '@nestjs/testing';
import { BlockFactory } from './block-factory';

describe('BlockFactory', () => {
    let provider: BlockFactory;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlockFactory],
        }).compile();

        provider = module.get<BlockFactory>(BlockFactory);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
