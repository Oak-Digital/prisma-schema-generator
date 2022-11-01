import { Test, TestingModule } from '@nestjs/testing';
import { FileWriter } from './file-writer';

describe('FileWriter', () => {
    let provider: FileWriter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FileWriter],
        }).compile();

        provider = module.get<FileWriter>(FileWriter);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
