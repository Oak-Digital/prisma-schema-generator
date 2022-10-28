import { Block } from './block.interface';
import { DataSource } from './data-source.interface';

export class Schema {
    private datasource?: DataSource;

    static blockToString(block: Block) {
        let blockStr = `${block.prefix} ${block.name} {`;

        // TODO: figure out how to render block body

        blockStr += '}';
        return blockStr;
    }
}
