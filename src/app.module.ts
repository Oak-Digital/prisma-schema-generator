import { Module } from '@nestjs/common';
import { CommanderModule } from './commander/commander.module';
import { PrismaGeneratorModule } from './prisma-generator/prisma-generator.module';
import { MockDataModule } from './mock-data/mock-data.module';
import { FileWriterModule } from './file-writer/file-writer.module';
import { DataParserModule } from './data-parser/data-parser.module';

@Module({
    imports: [PrismaGeneratorModule, CommanderModule, MockDataModule, FileWriterModule, DataParserModule],
})
export class AppModule {}
