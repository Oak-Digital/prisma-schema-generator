export interface Field {
    name: string;
}

// TODO: do env vars better
export interface EnvValue extends Field {
    fromEnvVar: null | string;
}
