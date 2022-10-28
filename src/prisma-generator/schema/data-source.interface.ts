import { EnvValue } from './env-value.interface';

export type ConnectorType =
    | 'mysql'
    | 'mongodb'
    | 'sqlite'
    | 'postgresql'
    | 'sqlserver'
    | 'jdbc:sqlserver'
    | 'cockroachdb';

export interface DataSource {
    name: string;
    prefix: 'datasource';
    activeProvider: ConnectorType;
    provider: ConnectorType;
    url: EnvValue;
    config: { [key: string]: string };
    // shadowDatabaseUrl?: string;
    // relationMode?: string;
    // extensions?: string[];
}
