import { ScalarType } from '../fields/scalar.interface';
import { Block } from './block.interface';

export interface TypeBlock extends Block {
    prefix: 'type';
    members: { name: string; type: ScalarType | string }[];
}
