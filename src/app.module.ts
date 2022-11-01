import { Module } from '@nestjs/common';
import { CommanderModule } from './commander/commander.module';
import { PrismaGeneratorModule } from './prisma-generator/prisma-generator.module';
import { MockDataModule } from './mock-data/mock-data.module';
import { FileWriterModule } from './file-writer/file-writer.module';

@Module({
    imports: [PrismaGeneratorModule, CommanderModule, MockDataModule, FileWriterModule],
})
export class AppModule {}
