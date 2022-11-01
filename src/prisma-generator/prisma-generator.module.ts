import { Module } from '@nestjs/common';
import { SchemaBuilder } from './schema/schema-builder';

@Module({
    providers: [SchemaBuilder],
    exports: [SchemaBuilder],
})
export class PrismaGeneratorModule {}
