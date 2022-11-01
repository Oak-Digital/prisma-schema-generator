import { BlockAttribute } from '../attributes/block-attribute.interface';

export type BlockPrefix = 'enum' | 'type' | 'datasource' | 'generator' | 'model';

export interface Block {
    prefix: BlockPrefix;
    name: string;
    attributes?: BlockAttribute[];
}
