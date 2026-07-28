import { SdtfError } from '@shapediver/sdk.sdtf-core';
import { ISdtfBinarySdtf } from '../binary_sdtf/ISdtfBinarySdtf';
import { SdtfBinarySdtf } from '../binary_sdtf/SdtfBinarySdtf';
import { ISdtfHttpClient } from './ISdtfHttpClient';

/** HTTP client of a single sdTF asset. */
export class SdtfHttpClient implements ISdtfHttpClient {
    private readonly binarySdtfParser: ISdtfBinarySdtf;

    /** The URL of the sdTF JSON content. */
    readonly jsonContentUrl: string;

    /** the minimum headers object that should be used for all HTTP calls.. */
    private readonly basicHttpHeader: Record<string, string>;

    constructor(jsonContentUrl: string, authToken?: string) {
        this.binarySdtfParser = new SdtfBinarySdtf();

        // This initializes this http client for the specified sdTF asset
        this.jsonContentUrl = jsonContentUrl;

        // Initialize tha basic HTTP header object
        this.basicHttpHeader = {};
        if (authToken) this.basicHttpHeader.authorization = 'Bearer ' + authToken;
    }

    /**
     * Constructs the URL of this sdTF asset for the given URI.
     * The URIs of all sdTF buffers of this sdTF asset are relative to the path of the JSON content file.
     * When no URI is specified, the URL of the JSON content is returned.
     * @private
     */
    calcUrl(uri: string | undefined): string {
        if (!uri) return this.jsonContentUrl;

        const index = this.jsonContentUrl.lastIndexOf('/');
        return `${this.jsonContentUrl.substring(0, index)}/${uri}`;
    }

    async getJsonContent(): Promise<[DataView, DataView | undefined]> {
        try {
            const { data, partial } = await this.fetch(
                this.jsonContentUrl,
                0,
                this.binarySdtfParser.binaryHeaderLength
            );

            if (partial) {
                // Partial requests are supported by the server - fetch json content next
                const [contentLength, _] = this.binarySdtfParser.readHeader(data);
                const jsonContentBuffer = await this.fetch(this.jsonContentUrl, 20, contentLength);

                // We have to check again if the response was really a partial one, since the
                // browser might have returned the full file if it was cached.
                if (jsonContentBuffer.partial)
                    return [new DataView(jsonContentBuffer.data), undefined];
            }

            // Whether partial or full content, parse and return the binary sdTF
            return this.binarySdtfParser.parseBinarySdtf(data);
        } catch (e) {
            throw new SdtfError(`Could not fetch sdTF JSON content: ${e.message}`);
        }
    }

    async getBinaryBuffer(
        uri: string | undefined,
        offset: number,
        length: number
    ): Promise<[DataView, ArrayBuffer | undefined]> {
        try {
            const { data, partial } = await this.fetch(this.calcUrl(uri), offset, length);

            if (partial) {
                // Partial requests are supported by the server - partial buffer was fetched
                return [new DataView(data), undefined];
            } else {
                // Partial requests are supported by the server - entire buffer was fetched
                return [new DataView(data, offset, length), data];
            }
        } catch (e) {
            throw new SdtfError(`Could not fetch sdTF binary buffer: ${e.message}`);
        }
    }

    /**
     * Checks if the server supports HTTP range requests by sending a HEAD request and analyzing the response header.
     * When the server supports range requests, only the requested part is fetched.
     * Otherwise, the entire sdTF file is fetched.
     * @private
     * @param url
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @throws {@link SdtfError} when the request was not successful.
     */
    async fetch(
        url: string,
        offset: number,
        length: number
    ): Promise<{ data: ArrayBuffer; partial: boolean }> {
        let response: Response;
        try {
            response = await globalThis.fetch(url, {
                method: 'HEAD',
                headers: this.basicHttpHeader,
            });
        } catch (e) {
            throw new SdtfError(e instanceof Error ? e.message : String(e));
        }

        // Validate response status
        if (response.status > 299) throw new SdtfError(`Received HTTP status ${response.status}.`);

        // Check if the content has been encoded (no range request possible)
        const contentEncoding = response.headers.get('content-encoding') !== null;

        // Check if HTTP range requests are supported
        const acceptRanges = response.headers.get('accept-ranges');

        // When the data has not been encoded and range requests are supported -> fetch partially.
        // Otherwise -> fetch all.
        const rangeRequestsSupported = !contentEncoding && acceptRanges === 'bytes';

        // Fetch the actual data.
        const data = rangeRequestsSupported
            ? await this.fetchPartially(url, offset, length)
            : await this.fetchFully(url);

        return {
            data,
            partial: rangeRequestsSupported,
        };
    }

    /**
     * Sends an HTTP range request to fetch only the requested part.
     * Assumes, that the server supports HTTP range requests and that the response is NOT compressed.
     * Otherwise, ranged requests may fail when the response is compressed.
     * @private
     * @param url
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @throws {@link SdtfError} when the request was not successful.
     */
    async fetchPartially(url: string, offset: number, length: number): Promise<ArrayBuffer> {
        let response: Response;
        try {
            response = await globalThis.fetch(url, {
                headers: {
                    ...this.basicHttpHeader,
                    range: `bytes=${offset}-${offset + length - 1}`,
                },
            });

            // Validate response status
            if (response.status === 416) throw new SdtfError('Invalid range requested.');
            if (response.status !== 200 && response.status !== 206)
                throw new SdtfError(`Received HTTP status ${response.status}.`);

            const buffer = await response.arrayBuffer();

            // The browser might cache the full data of the response. When this happens, a consecutive
            // partial-fetch request, will return the full data as well. Thus, we have to extract the
            // requested part manually.
            return buffer.byteLength > length ? buffer.slice(offset, offset + length) : buffer;
        } catch (e) {
            if (e instanceof SdtfError) throw e;
            throw new SdtfError(e instanceof Error ? e.message : String(e));
        }
    }

    /**
     * Fetches the entire sdTF file (either a binary sdTF or just binary data).
     * Fallback when HTTP range requests are not supported by the server.
     * @private
     * @param url
     * @throws {@link SdtfError} when the request was not successful.
     */
    async fetchFully(url: string): Promise<ArrayBuffer> {
        let response: Response;
        try {
            response = await globalThis.fetch(url, {
                headers: this.basicHttpHeader,
            });

            // Validate response status
            if (response.status !== 200)
                throw new SdtfError(`Received HTTP status ${response.status}.`);

            return await response.arrayBuffer();
        } catch (e) {
            if (e instanceof SdtfError) throw e;
            throw new SdtfError(e instanceof Error ? e.message : String(e));
        }
    }
}
