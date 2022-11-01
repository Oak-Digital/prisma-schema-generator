import { Module } from '@nestjs/common';
import { CommanderModule } from './commander/commander.module';
import { PrismaGeneratorModule } from './prisma-generator/prisma-generator.module';
import { MockDataModule } from './mock-data/mock-data.module';
import { FileWriterModule } from './file-writer/file-writer.module';
import { JsonDataModelParserModule } from './parsers/json-data-model-parser/json-data-model-parser.module';
import { DataParserModule } from './data-parser/data-parser.module';

@Module({
    imports: [PrismaGeneratorModule, CommanderModule, MockDataModule, FileWriterModule, JsonDataModelParserModule, DataParserModule],
})
export class AppModule {}
