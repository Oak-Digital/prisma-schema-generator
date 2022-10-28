import { Test, TestingModule } from '@nestjs/testing';
import { SchemaBuilder } from './schema-builder';

describe('SchemaBuilder', () => {
    let provider: SchemaBuilder;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SchemaBuilder],
        }).compile();

        provider = module.get<SchemaBuilder>(SchemaBuilder);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
