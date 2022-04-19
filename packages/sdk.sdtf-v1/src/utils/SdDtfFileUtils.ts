import { SdDtfError } from "@shapediver/sdk.sdtf-core"
import * as Buffer from "buffer"

const path = require("path")
const fs = require("fs")

export class SdDtfFileUtils {

    /**
     * Resolves the given relative path.
     * @throws {@link SdDtfError} when the path could not be resolved.
     */
    toAbsolutePath (relativePath: string): string {
        try {
            return path.resolve(relativePath)
        } catch (e) {
            throw new SdDtfError(`Could not resolve path '${ relativePath }': ${ e.message }`)
        }
    }

    /**
     * Reads the file asynchronously at the given path.
     * @throws {@link SdDtfError} when the file does not exist.
     */
    readFile (absolutePath: string): Promise<ArrayBuffer> {
        if (!fs.existsSync(absolutePath)) {
            throw new SdDtfError(`Cannot find file at location '${ absolutePath }'.`)
        }

        return new Promise<ArrayBuffer>((resolve, reject) => {
            fs.readFile(absolutePath, (error: Error, buffer: Buffer) => {
                if (error) reject(error)

                // The size of the buffer property is arbitrary.
                // Thus, byte offset and length must be taken into account.
                const data = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
                resolve(data)
            })
        })
    }
}
