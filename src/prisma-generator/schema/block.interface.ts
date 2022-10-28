export interface BlockBody {
    member: string[];
}

export interface Block {
    prefix: string;
    name: string;
    body: BlockBody;
    toString(): string;
}
