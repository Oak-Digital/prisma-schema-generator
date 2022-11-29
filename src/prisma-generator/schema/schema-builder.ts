import { Injectable } from '@nestjs/common';
import { BlockAttribute } from './attributes/block-attribute.interface';
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

        return `\tprovider = "${dataSource.provider}"\n\turl = "${dataSource.url}"\n`;
    }

    private renderGeneratorMembers(generator: GeneratorBlock) {
        // TODO: configs

        return `\tprovider = "${generator.provider}"\n`;
    }

    private renderModelMembers(model: ModelBlock) {
        let modelString = '';
        model.fields.forEach((field) => {
            modelString += this.renderScalar(field);
        });
        model.attributes?.forEach((attribute) => {
            modelString += this.renderBlockAttribute(attribute);
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

        let fieldString = '';
        if (scalar.comment) fieldString += `\t/// ${scalar.comment}\n`;
        fieldString += `\t${scalar.name}\t${type}\t`;

        scalar.attributes?.forEach((attr) => {
            fieldString += ' ' + this.renderFieldAttribute(attr);
        });
        fieldString += '\n';

        return fieldString;
    }

    private renderBlockAttribute(attribute: BlockAttribute) {
        let attributeString = `\t${attribute.type}`;

        if (attribute.signature) {
            attributeString += '(';

            const signatures = [];
            attribute.signature.forEach((signature) => {
                signatures.push(signature.value);
            });

            attributeString += signatures.join(',');
            attributeString += ')';
        }

        return attributeString + '\n';
    }

    private renderFieldAttribute(attribute: ScalarAttribute) {
        let attributeString = `${attribute.type}`;

        if (attribute.signature) {
            attributeString += '(';

            const signatures = [];
            attribute.signature.forEach((signature) => {
                let signatureString = signature.value;
                if (signature.type) signatureString += `: ${signature.type}`;
                if (signature.optional) signatureString += '?';
                if (signature.list) signatureString += '[]';

                signatures.push(signatureString);
            });

            attributeString += signatures.join(',');
            attributeString += ')';
        }

        return attributeString;
    }

    private renderEnumMembers(enumBlock: EnumBlock) {
        return (
            '\t' +
            enumBlock.members.reduce((aggregator, element) => {
                return `${aggregator}\n\t${element}`;
            }) +
            '\n'
        );
    }
}
