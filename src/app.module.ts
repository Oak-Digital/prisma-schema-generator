import { Module } from '@nestjs/common';
import { PrismaGeneratorModule } from './prisma-generator/prisma-generator.module';
import { SchemaTester } from './test/schema-tester';

@Module({
    imports: [PrismaGeneratorModule],
    providers: [SchemaTester],
})
export class AppModule {}
