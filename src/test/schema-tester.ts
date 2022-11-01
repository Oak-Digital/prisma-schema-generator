import { Injectable } from '@nestjs/common';
import { ScalarAttributeType } from 'src/prisma-generator/schema/attributes/scalar-attribute.interface';
import { DataSourceBlock } from 'src/prisma-generator/schema/blocks/data-source-block.interface';
import { EnumBlock } from 'src/prisma-generator/schema/blocks/enum-block.interface';
import { GeneratorBlock } from 'src/prisma-generator/schema/blocks/generator-block.interface';
import { ModelBlock } from 'src/prisma-generator/schema/blocks/model-block.interface';
import { ScalarType, ScalarTypeModifier } from 'src/prisma-generator/schema/fields/scalar.interface';

import { SchemaBuilder } from 'src/prisma-generator/schema/schema-builder';

@Injectable()
export class SchemaTester {
    constructor(private builder: SchemaBuilder) {}

    testRender() {
        this.addBlocks();
        return this.builder.renderSchema().join('\n');
    }

    addBlocks() {
        this.builder.addBlock(this.getTestDataSource());
        this.builder.addBlock(this.getTestGenerator());
        this.builder.addBlock(this.getTestModelUser());
        this.builder.addBlock(this.getTestModelPost());
        this.builder.addBlock(this.getTestEnum());
    }

    addInvalidBlock() {
        this.builder.addBlock({
            name: 'invalid',
            prefix: 'type',
        });
    }

    getTestDataSource(): DataSourceBlock {
        return {
            name: 'db',
            prefix: 'datasource',
            provider: 'postgresql',
            url: 'postgresql://postgres:postgres@localhost:5432/mydb?schema=public',
        };
    }

    getTestGenerator(): GeneratorBlock {
        return {
            name: 'client',
            prefix: 'generator',
            provider: 'prisma-client-js',
            output: '../src/generated/client',
        };
    }

    getTestModelUser(): ModelBlock {
        return {
            prefix: 'model',
            name: 'User',
            fields: [
                {
                    name: 'id',
                    type: ScalarType.Int,
                    attributes: [
                        {
                            type: ScalarAttributeType.id,
                        },
                        {
                            type: ScalarAttributeType.default,
                            signature: [
                                {
                                    value: 'autoincrement()',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'createdAt',
                    type: ScalarType.DateTime,
                    attributes: [
                        {
                            type: ScalarAttributeType.default,
                            signature: [
                                {
                                    value: 'now()',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'email',
                    type: ScalarType.String,
                    attributes: [
                        {
                            type: ScalarAttributeType.unique,
                        },
                    ],
                },
                {
                    name: 'name',
                    type: ScalarType.String,
                    modifiers: [ScalarTypeModifier.Optional],
                },
                {
                    name: 'role',
                    type: 'Role',
                    attributes: [
                        {
                            type: ScalarAttributeType.default,
                        },
                    ],
                },
                {
                    name: 'posts',
                    type: 'Post',
                    modifiers: [],
                },
                {
                    name: 'profile',
                    type: 'Profile',
                    modifiers: [],
                },
            ],
        };
    }

    getTestModelPost(): ModelBlock {
        return {
            prefix: 'model',
            name: 'Post',
            fields: [
                {
                    name: 'id',
                    type: ScalarType.Int,
                    attributes: [
                        {
                            type: ScalarAttributeType.id,
                        },
                        {
                            type: ScalarAttributeType.default,
                            signature: [
                                {
                                    value: 'autoincrement()',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'createdAt',
                    type: ScalarType.DateTime,
                    attributes: [
                        {
                            type: ScalarAttributeType.default,
                            signature: [
                                {
                                    value: 'now()',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'updatedAt',
                    type: ScalarType.DateTime,
                    attributes: [
                        {
                            type: ScalarAttributeType.updatedAt,
                        },
                    ],
                },
                {
                    name: 'published',
                    type: ScalarType.Boolean,
                    attributes: [
                        {
                            type: ScalarAttributeType.default,
                            signature: [
                                {
                                    value: 'false',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'title',
                    type: ScalarType.String,
                },
                {
                    name: 'author',
                    type: 'User',
                    modifiers: [ScalarTypeModifier.Optional],
                    attributes: [
                        {
                            type: ScalarAttributeType.relation,
                            signature: [
                                {
                                    value: 'fields',
                                    type: '[authorId]',
                                },
                                {
                                    value: 'references',
                                    type: '[id]',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'authorId',
                    type: ScalarType.Int,
                    modifiers: [ScalarTypeModifier.Optional],
                },
            ],
        };
    }

    getTestEnum(): EnumBlock {
        return {
            prefix: 'enum',
            name: 'Role',
            members: ['USER', 'ADMIN'],
        };
    }
}
