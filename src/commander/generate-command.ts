import { exec } from 'child_process';
import { existsSync } from 'fs';
import { Command, CommandRunner, Option } from 'nest-commander';
import path from 'path';
import { FileWriter } from 'src/file-writer/file-writer';
import { SchemaTester } from 'src/mock-data/schema-tester';

@Command({ name: 'generate', description: '', options: { isDefault: true } })
export class GenerateCommand extends CommandRunner {
    constructor(private tester: SchemaTester, private writer: FileWriter) {
        super();
    }

    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        const path = options.output ?? '.';

        // console.log('path is', path);

        const fileName = 'schema.prisma';

        const fileContent = this.tester.testRender();

        await this.writer.writeFile(path, fileName, fileContent);

        // Format resulting file
        exec(`npx prisma format --schema ${path}`, (error) => {
            if (error) console.error(`${error}`);
        });
    }

    @Option({
        flags: '-o, --output [Schema output file location]',
        name: 'withPath',
        description: 'where the resulting schema should be written',
    })
    parsePathOption(option: string) {
        // const pathArray = option.split('/'); // TODO: windows sepparators

        // TODO

        return option;
    }
}
