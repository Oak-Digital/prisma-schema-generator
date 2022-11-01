import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { promisify } from 'util';

@Injectable()
export class FileWriter {
    /**
     * Writes a file at a given path via a promise interface.
     *
     * @param {string} path
     * @param {string} fileName
     * @param {string} data
     *
     * @return {Promise<void>}
     */
    async writeFile(path: string, fileName: string, data: string) {
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        const writeFile = promisify(fs.writeFile);
        return writeFile(`${path}/${fileName}`, data, 'utf8');
    }
}
