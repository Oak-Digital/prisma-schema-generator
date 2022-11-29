export enum BlockAttributeType {
    id = '@@id',
    unique = '@@unique',
    index = '@@index',
    map = '@@map',
    ignore = '@@ignore',
}

export interface BlockAttribute {
    type: BlockAttributeType;
    signature?: { value: string }[];
}
