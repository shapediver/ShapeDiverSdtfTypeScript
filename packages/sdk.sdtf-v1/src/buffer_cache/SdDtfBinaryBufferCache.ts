import { SdDtfError } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBufferCache } from "./ISdDtfBufferCache"

export class SdDtfBinaryBufferCache implements ISdDtfBufferCache {

    readonly cacheIdFullBuffer = "full"

    /**
     * Caching object used to store already fetched/loaded buffers.
     * The key is a hash of the buffer's URI.
     * The id encapsulates the offset and length of the buffer; or {@link cacheIdFullBuffer} for the entire buffer.
     * @private
     */
    readonly cache: { [key: string]: { [offset: string]: DataView } }

    constructor () {
        this.cache = {}
    }

    /**
     * Calculates the cache key by hashing the given buffer URI.
     * Simple, __insecure__ hashing function that's short, fast, and has no dependencies.
     * @protected
     */
    calcCacheKey (uri: string = ""): string {
        let hash = 0
        for (let i = 0; i < uri.length; i++) {
            const char = uri.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash &= hash // Convert to 32bit integer
        }
        return new Uint32Array([ hash ])[0].toString(36)
    }

    /**
     * Calculates the cache ID based on the given buffer range.
     * @protected
     */
    calcCacheId (offset: number, length: number): string {
        return `${ offset };${ length }`
    }

    /**
     * Returns the buffer with the given key and range from cache.
     * @protected
     */
    loadFromCache (key: string, offset: number, length: number): DataView | undefined {
        const item = this.cache[key]
        if (!item) {
            // Buffer not found in cache
            return undefined
        }

        const id = this.calcCacheId(offset, length)
        if (item[id]) {
            // Buffer found in cache for this range
            return item[id]
        }

        if (item[this.cacheIdFullBuffer]) {
            // Entire buffer object stored for this key - return range
            return new DataView(item[this.cacheIdFullBuffer].buffer, offset, length)
        }
    }

    /**
     * Stores the buffer with the given key and range in cache.
     * @protected
     */
    storeInCache (key: string, id: string, buffer: DataView): void {
        const item = this.cache[key] ?? {}
        item[id] = buffer
        this.cache[key] = item
    }

    setBinaryBody (binaryBody?: DataView): void {
        if (!binaryBody) return

        this.cache[this.calcCacheKey()] = {
            [this.cacheIdFullBuffer]: binaryBody,
        }
    }

    async getBuffer (uri: string | undefined, offset: number, length: number): Promise<DataView> {
        const cacheKey = this.calcCacheKey(uri)

        return this.loadFromCache(cacheKey, offset, length) ??
            await this.acquireBuffer(uri, length, offset)
    }

    /**
     * Resolves and loads external buffer files - this is not supported in this mode!
     * However, this can be overwritten by other buffer cache implementations.
     * @protected
     */
    async acquireBuffer (uri: string | undefined, offset: number, length: number): Promise<DataView> {
        throw new SdDtfError("Resolution of external buffers is not supported in this mode. " +
            "Please use 'ISdDtfParser.readFromFile()' or 'ISdDtfParser.readFromUrl()' to instantiate the sdTF asset and to enable this functionality.")
    }

}
