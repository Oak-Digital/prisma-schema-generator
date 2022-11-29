import { Injectable } from '@nestjs/common';
import { BlockAttribute, BlockAttributeType } from 'src/prisma-generator/schema/attributes/block-attribute.interface';
import {
    ScalarAttribute,
    ScalarAttributeType,
} from 'src/prisma-generator/schema/attributes/scalar-attribute.interface';
import { ModelBlock } from 'src/prisma-generator/schema/blocks/model-block.interface';
import { Scalar, ScalarType, ScalarTypeModifier } from 'src/prisma-generator/schema/fields/scalar.interface';
import { SchemaBuilder } from 'src/prisma-generator/schema/schema-builder';
import { GenericParser } from './generic-parser';

interface DawaObject {
    key: string[];
    attributes: DawaAttribute[];
}

interface DawaAttribute {
    name: string;
    type: DawaAttributeType;
    nullable: boolean;
    description: string;
}

type DawaAttributeType =
    | 'uuid'
    | 'integer'
    | 'localdatetime'
    | 'string'
    | 'real'
    | 'geometry'
    | 'boolean'
    | 'geometry3d'
    | 'timestamp'
    | 'point2d';

@Injectable()
export class DawaParser extends GenericParser {
    DISALLOWED_CHARACTERS = ['æ', 'ø', 'å'];

    constructor(protected builder: SchemaBuilder) {
        super();
    }

    async build() {
        const data = await this.fetchDawaData('https://api.dataforsyningen.dk/replikering/datamodel');
        const models = Object.entries(data).map((object) => this.dawaObjectToModel(...object));

        models.forEach((model) => {
            this.builder.addBlock(model);
        });
    }

    render() {
        return this.builder.renderSchema().join('\n\n');
    }

    // getAllTypes(data: Record<string, DawaObject>) {
    //     return Object.entries(data)
    //         .map((el) => el[1].attributes.map((el) => el.type))
    //         .flat(1)
    //         .filter((value, index, self) => self.indexOf(value) === index);
    // }

    private async fetchDawaData(url: string): Promise<Record<string, DawaObject>> {
        const responseData: Record<string, DawaObject> = await fetch(url)
            .then((res) => res.text())
            .then((text) => JSON.parse(text.replace(/æ/gim, 'ae').replace(/'ø'/gim, 'oe').replace(/å/gim, 'aa')))
            .catch((e) => {
                console.error(e);
                return [];
            });

        return responseData;
    }

    private dawaObjectToModel(name: string, object: DawaObject): ModelBlock {
        const [sanitizedName, nameInvalid] = this.sanitizeName(name);
        const attributes: BlockAttribute[] = [];

        if (nameInvalid)
            attributes.push({
                type: BlockAttributeType.map,
                signature: [
                    {
                        value: `"${name}"`,
                    },
                ],
            });

        return {
            name: sanitizedName,
            prefix: 'model',
            fields: object.attributes.map((attribute) =>
                this.dawaAttributeToScalar(attribute, object.key.includes(attribute.name))
            ),
            attributes: attributes,
        };
    }

    private dawaAttributeToScalar(attribute: DawaAttribute, isKey = false): Scalar {
        const [name, nameInvalid] = this.sanitizeName(attribute.name);

        const modifiers: ScalarTypeModifier[] = [];
        const attributes: ScalarAttribute[] = [];

        if (isKey)
            attributes.push({
                type: ScalarAttributeType.unique,
            });

        if (attribute.nullable) modifiers.push(ScalarTypeModifier.Optional);

        if (nameInvalid)
            attributes.push({
                type: ScalarAttributeType.map,
                signature: [
                    {
                        value: `"${attribute.name}"`,
                    },
                ],
            });

        return {
            name: name,
            type: this.getMappedScalarTypeByDawaType(attribute.type),
            attributes: attributes,
            modifiers: modifiers,
            comment:
                attribute.description === 'Ikke tilgaengelig'
                    ? undefined
                    : attribute.description.replace(/\n/g, '\n\t//'),
        };
    }

    private sanitizeName(name: string): [string, boolean] {
        if (this.DISALLOWED_CHARACTERS.some((c) => name.includes(c))) {
            return [name.replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa'), true];
        }

        return [name, false];
    }

    private getMappedScalarTypeByDawaType(type: DawaAttributeType): ScalarType {
        switch (type) {
            case 'string':
            case 'uuid':
            case 'real':
            case 'geometry':
            case 'geometry3d':
            case 'point2d':
                return ScalarType.String;
            case 'boolean':
                return ScalarType.Boolean;
            case 'integer':
                return ScalarType.Int;
            case 'timestamp':
            case 'localdatetime':
                return ScalarType.DateTime;
        }
    }
}
