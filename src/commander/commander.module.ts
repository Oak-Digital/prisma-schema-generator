import { Module } from '@nestjs/common';
import { FileWriterModule } from 'src/file-writer/file-writer.module';
import { MockDataModule } from 'src/mock-data/mock-data.module';
import { GenerateCommand } from './generate-command';

@Module({
    providers: [GenerateCommand],
    imports: [MockDataModule, FileWriterModule],
})
export class CommanderModule {}
