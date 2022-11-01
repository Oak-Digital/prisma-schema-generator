import { Module } from '@nestjs/common';
import { PrismaGeneratorModule } from 'src/prisma-generator/prisma-generator.module';
import { SchemaTester } from './schema-tester';

@Module({
    imports: [PrismaGeneratorModule],
    providers: [SchemaTester],
    exports: [SchemaTester],
})
export class MockDataModule {}
