import { ScalarAttribute } from '../attributes/scalar-attribute.interface';
import { Field } from './field.interface';

// TODO: Support for database native types
export enum ScalarType {
    String = 'String',
    Boolean = 'Boolean',
    Int = 'Int',
    BigInt = 'BigInt',
    Float = 'Float',
    Decimal = 'Decimal',
    DateTime = 'DateTime',
    Json = 'Json',
    Bytes = 'Bytes',
    // TODO: Support for 'unsupported'-type
    // Unsupported = 'Unsupported',
}

export enum ScalarTypeModifier {
    List,
    Optional,
}

export interface Scalar extends Field {
    type: ScalarType | string;
    modifiers?: ScalarTypeModifier[];
    attributes?: ScalarAttribute[];
    comment?: string;
}
