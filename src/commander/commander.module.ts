import { Module } from '@nestjs/common';
import { DataParserModule } from 'src/data-parser/data-parser.module';
import { FileWriterModule } from 'src/file-writer/file-writer.module';
import { MockDataModule } from 'src/mock-data/mock-data.module';
import { GenerateCommand } from './generate-command';

@Module({
    providers: [GenerateCommand],
    imports: [MockDataModule, FileWriterModule, DataParserModule],
})
export class CommanderModule {}
