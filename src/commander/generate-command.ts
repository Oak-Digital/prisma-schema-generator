import { exec } from 'child_process';
import { Command, CommandRunner } from 'nest-commander';
import { FileWriter } from 'src/file-writer/file-writer';
import { SchemaTester } from 'src/mock-data/schema-tester';

@Command({ name: 'generate', description: '' })
export class GenerateCommand extends CommandRunner {
    constructor(private tester: SchemaTester, private writer: FileWriter) {
        super();
    }

    async run(): Promise<void> {
        const fileContent = this.tester.testRender();
        await this.writer.writeFile('.', 'schema.prisma', fileContent);

        exec('npx prisma format', (error) => {
            if (error) console.error(`${error}`);
        });
    }
}
