# Prisma Schema Generator

## What is it?

! NB.: This repo is early work in progress !

This application can generate Prisma schemas from some data. Currently the only implemented data parser is made to parse data from DAWA: <https://api.dataforsyningen.dk/replikering/datamodel>

Made using NestJS

## Prerequisites

This project uses `pnpm` as its node package manager.

For code quality it uses prettier, eslint and editorconfig

## Installation

```bash
pnpm i
```

### Using nix flake

...

## Running the app

```bash
pnpm start
```

The output schema file goes in the `.out` directory

## Roadmap

-   More data sources
-   Proper command line interface
-   Publish Node Package
-   Tests

## License

MIT
