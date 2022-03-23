import { ISdDtfHttpClient } from "../http/ISdDtfHttpClient"
import { SdDtfBinaryBufferCache } from "./SdDtfBinaryBufferCache"

export class SdDtfHttpBufferCache extends SdDtfBinaryBufferCache {

    constructor (
        private readonly httpClient: ISdDtfHttpClient,
    ) {
        super()
    }

    /**
     * Fetches the requested buffer and updates the internal buffer cache.
     * @override
     * @protected
     */
    async acquireBuffer (uri: string | undefined, offset: number, length: number): Promise<DataView> {
        const [ partialBuffer, entireBuffer ] = await this.httpClient.getBinaryBuffer(uri, offset, length)

        // Cache the entire buffer if possible, otherwise the partial buffer
        if (entireBuffer) {
            this.storeInCache(this.calcCacheKey(uri), this.cacheIdFullBuffer, new DataView(entireBuffer))
        } else {
            this.storeInCache(this.calcCacheKey(uri), this.calcCacheId(offset, length), partialBuffer)
        }

        return partialBuffer
    }

}
