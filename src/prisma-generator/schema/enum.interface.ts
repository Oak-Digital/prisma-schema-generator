import { Block } from './block.interface';

export interface Enum extends Block {
    prefix: 'enum';
    members: string[];
}
