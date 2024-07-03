import { ISdtfHttpClient } from '../http/ISdtfHttpClient';
import { SdtfBinaryBufferCache } from './SdtfBinaryBufferCache';

export class SdtfHttpBufferCache extends SdtfBinaryBufferCache {
    constructor(private readonly httpClient: ISdtfHttpClient) {
        super();
    }

    /**
     * Fetches the requested buffer and updates the internal buffer cache.
     * @override
     * @protected
     */
    async acquireBuffer(
        uri: string | undefined,
        offset: number,
        length: number
    ): Promise<DataView> {
        const [partialBuffer, entireBuffer] = await this.httpClient.getBinaryBuffer(
            uri,
            offset,
            length
        );

        // Cache the entire buffer if possible, otherwise the partial buffer
        if (entireBuffer) {
            this.storeInCache(
                this.calcCacheKey(uri),
                this.cacheIdFullBuffer,
                new DataView(entireBuffer)
            );
        } else {
            this.storeInCache(
                this.calcCacheKey(uri),
                this.calcCacheId(offset, length),
                partialBuffer
            );
        }

        return partialBuffer;
    }
}
