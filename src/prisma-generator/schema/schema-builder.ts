import { Injectable } from '@nestjs/common';
import { Block } from './block.interface';

@Injectable()
export class SchemaBuilder {
    private blocks: Block[] = [];

    addBlock(block: Block) {
        this.blocks.push(block);
    }

    testData() {
        return;
    }
}
