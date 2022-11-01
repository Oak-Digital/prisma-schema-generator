import { Block } from './block.interface';

export type GeneratorProvider = 'prisma-client-js';
export type GeneratorEngineType = 'library' | 'binary';

export enum GeneratorBinaryTargets {
    native = 'native', // Default
    macos = 'darwin',
    windows = 'windows',
    alpine = 'linux-musl', // Alpine Linux
    debian_1_0 = 'debian-openssl-1.0.x', // Debian 8, Ubuntu 14, Ubuntu 18, Mint 18
    debian_1_1 = 'debian-openssl-1.1.x', // Debian 9 - 11, Ubuntu 18 - 21, Mint 19, Arch
    debian_3_0 = 'debian-openssl-3.0.x', // Ubuntu 22, Mint 21
    rhel_1_0 = 'rhel-openssl-1.0.x', // CentOS
    rhel_1_1 = 'rhel-openssl-1.1.x', // Fedora 28 - 30
    rhel_3_0 = 'rhel-openssl-3.0.x', // Fedora 36
    arm64_1_0 = 'linux-arm64-openssl-1.0.x',
    arm64_1_1 = 'linux-arm64-openssl-1.1.x',
    arm64_3_0 = 'linux-arm64-openssl-3.0.x',
}

export interface GeneratorBlock extends Block {
    prefix: 'generator';
    provider: GeneratorProvider | string;
    output?: string;
    previewFeatures?: string[];
    engineType?: GeneratorEngineType;
    binaryTargets?: GeneratorBinaryTargets[];
}
