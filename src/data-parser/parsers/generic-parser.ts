import { SchemaBuilder } from 'src/prisma-generator/schema/schema-builder';

export abstract class GenericParser {
    abstract build(): void;
    abstract render(): string;
}
