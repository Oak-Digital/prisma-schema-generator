import { Block } from './block.interface';

export type ConnectorType =
    | 'mysql'
    | 'mongodb'
    | 'sqlite'
    | 'postgresql'
    | 'sqlserver'
    | 'jdbc:sqlserver'
    | 'cockroachdb';

export interface DataSourceBlock extends Block {
    prefix: 'datasource';
    // activeProvider?: ConnectorType;
    provider: ConnectorType;
    url: string;
    config?: { [key: string]: string };
    // shadowDatabaseUrl?: string;
    // relationMode?: string;
    // extensions?: string[];
}
