export enum ScalarAttributeType {
    id = '@id',
    default = '@default',
    unique = '@unique',
    relation = '@relation',
    map = '@map',
    ignore = '@ignore',
    native = '@db',
    updatedAt = '@updatedAt',
}

export interface ScalarAttribute {
    type: ScalarAttributeType;
    signature?: {
        value: string;
        type?: string;
        optional?: true;
        list?: true;
    }[];
}
