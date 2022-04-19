import { SdDtfError } from "@shapediver/sdk.sdtf-core"
import { SdDtfFileUtils } from "../utils/SdDtfFileUtils"
import { SdDtfBinaryBufferCache } from "./SdDtfBinaryBufferCache"

export class SdDtfFileBufferCache extends SdDtfBinaryBufferCache {

    private readonly fileUtils: SdDtfFileUtils

    /** The paths of all sdTF buffers of this sdTF asset are relative to the path of the JSON content file. */
    private readonly basePath: string

    constructor (absolutePath: string) {
        super()

        this.fileUtils = new SdDtfFileUtils()

        // Calculate the base path for all external buffers
        const index = absolutePath.lastIndexOf("/")
        this.basePath = absolutePath.substring(0, index)
    }

    /**
     * Loads the requested buffer from disk and updates the internal buffer cache.
     * @override
     * @protected
     */
    async acquireBuffer (relativePath: string | undefined, offset: number, length: number): Promise<DataView> {
        let buffer
        try {
            buffer = await this.fileUtils.readFile(`${ this.basePath }/${ relativePath }`)
        } catch (e) {
            throw new SdDtfError(`Error reading buffer: ${ e.message }`)
        }

        // Cache the entire buffer
        this.storeInCache(this.calcCacheKey(relativePath), this.cacheIdFullBuffer, new DataView(buffer))

        return new DataView(buffer, offset, length)
    }

}
