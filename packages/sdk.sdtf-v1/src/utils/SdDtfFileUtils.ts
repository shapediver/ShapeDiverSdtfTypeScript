import { SdDtfError } from "@shapediver/sdk.sdtf-core"

export class SdDtfFileUtils {

    /** Resolves the given path. */
    toAbsolutePath (path: string): string {
        return require("path").resolve(path)
    }

    /**
     * Reads the file at the given path
     * @throws {@link SdDtfError} when the file does not exist.
     */
    readFile (absolutePath: string): ArrayBuffer {
        if (!require("fs").existsSync(absolutePath)) {
            throw new SdDtfError(`Cannot find file at location '${ absolutePath }'.`)
        }

        return require("fs").readFileSync(absolutePath).buffer
    }
}
