import { Test, TestingModule } from '@nestjs/testing';
import { GenericParser } from './generic-parser';

describe('GenericParser', () => {
    let provider: GenericParser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GenericParser],
        }).compile();

        provider = module.get<GenericParser>(GenericParser);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
