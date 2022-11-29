import { Test, TestingModule } from '@nestjs/testing';
import { DawaParser } from './dawa-parser';

describe('DawaParser', () => {
    let provider: DawaParser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DawaParser],
        }).compile();

        provider = module.get<DawaParser>(DawaParser);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
