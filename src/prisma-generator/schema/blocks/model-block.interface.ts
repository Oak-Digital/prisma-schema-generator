import { Scalar } from '../fields/scalar.interface';
import { Block } from './block.interface';

export interface ModelBlock extends Block {
    prefix: 'model';
    fields: Scalar[];
}
