import { Block } from './block.interface';
import { Scalar } from './scalar.interface';

export interface Model extends Block {
    prefix: 'model';

    fields: Scalar[];
}
