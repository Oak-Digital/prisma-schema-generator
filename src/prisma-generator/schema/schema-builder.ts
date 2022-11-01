import { Injectable } from '@nestjs/common';
import { ScalarAttribute } from './attributes/scalar-attribute.interface';
import { Block } from './blocks/block.interface';
import { DataSourceBlock } from './blocks/data-source-block.interface';
import { EnumBlock } from './blocks/enum-block.interface';
import { GeneratorBlock } from './blocks/generator-block.interface';
import { ModelBlock } from './blocks/model-block.interface';
import { Scalar, ScalarTypeModifier } from './fields/scalar.interface';

@Injectable()
export class SchemaBuilder {
    private schema: Block[] = [];

    clearSchema() {
        this.schema = [];
    }

    renderSchema() {
        return this.schema.map((block) => {
            return this.renderBlock(block);
        });
    }

    addBlock(block: Block) {
        this.schema.push(block);
    }

    renderBlock(block: Block) {
        let blockString = '';
        blockString += `${block.prefix} ${block.name} {\n`;

        switch (block.prefix) {
            case 'datasource':
                blockString += this.renderDataSourceMembers(<DataSourceBlock>block);
                break;

            case 'generator':
                blockString += this.renderGeneratorMembers(<GeneratorBlock>block);
                break;

            case 'model':
                blockString += this.renderModelMembers(<ModelBlock>block);
                break;

            case 'enum':
                blockString += this.renderEnumMembers(<EnumBlock>block);
                break;

            default:
                console.warn(`Invalid block type: "${block.prefix}".`, block);
                return '';
        }
        blockString += '}';
        return blockString;
    }

    private renderDataSourceMembers(dataSource: DataSourceBlock) {
        // TODO: configs

        return `provider = "${dataSource.provider}"\nurl = "${dataSource.url}\n"`;
    }

    private renderGeneratorMembers(generator: GeneratorBlock) {
        // TODO: configs

        return `provider = "${generator.provider}"\n`;
    }

    private renderModelMembers(model: ModelBlock) {
        let modelString = '';
        model.fields.forEach((field) => {
            modelString += this.renderScalar(field);
        });
        return modelString;
    }

    private renderScalar(scalar: Scalar) {
        let type = scalar.type.toString();

        if (scalar.modifiers) {
            // TODO: handle modifiers better
            if (scalar.modifiers.includes(ScalarTypeModifier.List)) type += '[]';
            if (scalar.modifiers.includes(ScalarTypeModifier.Optional)) type += '?';
        }

        let fieldString = `\t${scalar.name}\t${type}\t`;

        scalar.attributes?.forEach((attr) => {
            fieldString += ' ' + this.renderFieldAttribute(attr);
        });
        fieldString += '\n';

        return fieldString;
    }

    private renderFieldAttribute(attribute: ScalarAttribute) {
        let attributeString = `${attribute.type}`;

        if (attribute.signature) {
            attributeString += '(';
            attribute.signature.forEach((signature) => {
                attributeString += signature.value;
                if (signature.type) attributeString += `: ${signature.type}`;
                if (signature.optional) attributeString += '?';
                if (signature.list) attributeString += '[]';
                attributeString += ' ';
            });
            attributeString += ')';
        }

        return attributeString;
    }

    private renderEnumMembers(enumblock: EnumBlock) {
        return (
            enumblock.members.reduce((aggr, el) => {
                return `${aggr}\n${el}`;
            }) + '\n'
        );
    }
}
