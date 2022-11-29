import { Module } from '@nestjs/common';
import { DawaParser } from './parsers/dawa-parser';
import { PrismaGeneratorModule } from 'src/prisma-generator/prisma-generator.module';

@Module({
    providers: [DawaParser],
    imports: [PrismaGeneratorModule],
    exports: [DawaParser],
})
export class DataParserModule {}
