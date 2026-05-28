import { SdtfError } from '@shapediver/sdk.sdtf-core';
import * as Buffer from 'buffer';

const path = require('path');
const fs = require('fs');

export class SdtfFileUtils {
    /**
     * Resolves the given relative path.
     * @throws {@link SdtfError} when the path could not be resolved.
     */
    toAbsolutePath(relativePath: string): string {
        try {
            return path.resolve(relativePath);
        } catch (e) {
            throw new SdtfError(`Could not resolve path '${relativePath}': ${e.message}`);
        }
    }

    /**
     * Reads the file asynchronously at the given path.
     * @throws {@link SdtfError} when the file does not exist.
     */
    readFile(absolutePath: string): Promise<ArrayBuffer> {
        if (!fs.existsSync(absolutePath)) {
            throw new SdtfError(`Cannot find file at location '${absolutePath}'.`);
        }

        return new Promise<ArrayBuffer>((resolve, reject) => {
            fs.readFile(absolutePath, (error: Error, buffer: Buffer) => {
                if (error) {
                    reject(error);
                    return;
                }

                const data = new Uint8Array(buffer.byteLength);
                data.set(buffer);
                resolve(data.buffer);
            });
        });
    }
}
