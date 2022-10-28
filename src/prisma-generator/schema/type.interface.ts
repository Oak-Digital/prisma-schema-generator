import { Block } from './block.interface';
import { ScalarType } from './scalar.interface';

export interface Type extends Block {
    prefix: 'type';
    fields: ScalarType[];
}
