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

export enum FieldTypeModifier {
    List,
    Optional,
}

export interface Scalar {
    name: string;
    type: ScalarType;
    value?: any;

    modifiers?: FieldTypeModifier[];
}
