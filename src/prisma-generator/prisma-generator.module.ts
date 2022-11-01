import { Module } from '@nestjs/common';
import { SchemaBuilder } from './schema/schema-builder';
import { BlockFactory } from './schema/block-factory';

@Module({
    providers: [SchemaBuilder],
    exports: [SchemaBuilder, BlockFactory],
})
export class PrismaGeneratorModule {}
