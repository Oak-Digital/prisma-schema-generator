import { Test, TestingModule } from '@nestjs/testing';
import { GenerateCommand } from './generate-command';

describe('GenerateCommand', () => {
    let provider: GenerateCommand;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GenerateCommand],
        }).compile();

        provider = module.get<GenerateCommand>(GenerateCommand);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
