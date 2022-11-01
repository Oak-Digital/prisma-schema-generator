import { Block } from './block.interface';

export interface EnumBlock extends Block {
    prefix: 'enum';
    members: string[];
}
