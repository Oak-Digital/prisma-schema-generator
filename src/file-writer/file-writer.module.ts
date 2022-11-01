import { Module } from '@nestjs/common';
import { FileWriter } from './file-writer';

@Module({
    providers: [FileWriter],
    exports: [FileWriter],
})
export class FileWriterModule {}
