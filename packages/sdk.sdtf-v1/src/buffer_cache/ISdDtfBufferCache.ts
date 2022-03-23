/**
 * In-memory cache for sdTF buffer data.
 * When a buffer was not found, it will be acquired and returned instead.
 */
export interface ISdDtfBufferCache {

    /** Stores the binary body of a binary sdTF in cache. */
    setBinaryBody (binaryBody: DataView): void

    /**
     * Returns the requested buffer from cache.
     * When the buffer was not found in cache, the data is acquired and then put in cache for further use.
     * @param rel - Buffer link relative to the sdTF JSON content.
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     */
    getBuffer (rel: string | undefined, offset: number, length: number): Promise<DataView>

}
