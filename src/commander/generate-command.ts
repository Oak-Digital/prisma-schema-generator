import { exec } from 'child_process';
import { Command, CommandRunner, Option } from 'nest-commander';
import { DawaParser } from 'src/data-parser/parsers/dawa-parser';
import { FileWriter } from 'src/file-writer/file-writer';
import { SchemaTester } from 'src/mock-data/schema-tester';

@Command({ name: 'generate', description: '', options: { isDefault: true } })
export class GenerateCommand extends CommandRunner {
    constructor(private dawa: DawaParser, private writer: FileWriter) {
        super();
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        const path = options.output ?? './.out/';
        const fileName = 'schema.prisma';

        await this.dawa.build();
        const fileContent = this.dawa.render();

        await this.writer.writeFile(path, fileName, fileContent);

        const prismaBin = 'prisma';

        // Format resulting file
        exec(`${prismaBin} format --schema ${path}`, (error) => {
            if (error) console.error(`${error}`);
        });
    }

    @Option({
        flags: '-o, --output [Schema output file location]',
        name: 'withPath',
        description: 'where the resulting schema should be written',
    })
    parsePathOption(option: string) {
        // const pathArray = option.split('/'); // TODO: windows separators

        // TODO

        return option;
    }
}
