import { SdtfError } from "@shapediver/sdk.sdtf-core"
import axios from "axios"
import { ISdtfBinarySdtf } from "../binary_sdtf/ISdtfBinarySdtf"
import { SdtfBinarySdtf } from "../binary_sdtf/SdtfBinarySdtf"
import { ISdtfHttpClient } from "./ISdtfHttpClient"

/** HTTP client of a single sdTF asset. */
export class SdtfHttpClient implements ISdtfHttpClient {

    private readonly binarySdtfParser: ISdtfBinarySdtf

    /** The URL of the sdTF JSON content. */
    readonly jsonContentUrl: string

    constructor (jsonContentUrl: string) {
        this.binarySdtfParser = new SdtfBinarySdtf()

        // This initializes this http client for the specified sdTF asset
        this.jsonContentUrl = jsonContentUrl
    }

    /**
     * Constructs the URL of this sdTF asset for the given URI.
     * The URIs of all sdTF buffers of this sdTF asset are relative to the path of the JSON content file.
     * When no URI is specified, the URL of the JSON content is returned.
     * @private
     */
    calcUrl (uri: string | undefined): string {
        if (!uri) return this.jsonContentUrl

        const index = this.jsonContentUrl.lastIndexOf("/")
        return `${ this.jsonContentUrl.substring(0, index) }/${ uri }`
    }

    async getJsonContent (): Promise<[ DataView, DataView | undefined ]> {
        try {
            const {
                data,
                partial,
            } = await this.fetch(this.jsonContentUrl, 0, this.binarySdtfParser.binaryHeaderLength)

            if (partial) {
                // Partial requests are supported by the server - fetch json content next
                const [ contentLength, _ ] = this.binarySdtfParser.readHeader(data)
                const jsonContentBuffer = await this.fetch(this.jsonContentUrl, 20, contentLength)
                return [ new DataView(jsonContentBuffer.data), undefined ]
            } else {
                // Entire sdTF has been returned - parse and return
                return this.binarySdtfParser.parseBinarySdtf(data)
            }
        } catch (e) {
            throw new SdtfError(`Could not fetch sdTF JSON content: ${ e.message }`)
        }
    }

    async getBinaryBuffer (uri: string | undefined, offset: number, length: number): Promise<[ DataView, ArrayBuffer | undefined ]> {
        try {
            const { data, partial } = await this.fetch(this.calcUrl(uri), offset, length)

            if (partial) {
                // Partial requests are supported by the server - partial buffer was fetched
                return [ new DataView(data), undefined ]
            } else {
                // Partial requests are supported by the server - entire buffer was fetched
                return [ new DataView(data, offset, length), data ]
            }
        } catch (e) {
            throw new SdtfError(`Could not fetch sdTF binary buffer: ${ e.message }`)
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
    async fetch (url: string, offset: number, length: number): Promise<{ data: ArrayBuffer, partial: boolean }> {
        let response
        try {
            response = await axios.head(url)
        } catch (e) {
            throw new SdtfError(e.message)
        }

        // Validate response status
        if (response.status > 299) throw new SdtfError(`Received HTTP status ${ response.status }.`)

        const acceptRanges = response.headers["Accept-Ranges"] ?? response.headers["accept-ranges"]
        const rangeRequestsSupported = (acceptRanges === "bytes")

        // Fetch the actual data
        const data = (rangeRequestsSupported) ?
            await this.fetchPartially(url, offset, length) :
            await this.fetchFully(url, offset, length)

        // This is required to support Node.js as well as Browsers
        const buffer = (data instanceof ArrayBuffer) ? data : Uint8Array.from(data).buffer

        return {
            data: buffer,
            partial: rangeRequestsSupported,
        }
    }

    /**
     * Sends an HTTP range request to fetch only the requested part.
     * Assumes, that the server supports HTTP range requests and that the response is NOT compressed.
     * Otherwise, Axios throws an `ERR_CONTENT_DECODING_FAILED` error in the browser.
     * @private
     * @param url
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @throws {@link SdtfError} when the request was not successful.
     */
    async fetchPartially (url: string, offset: number, length: number): Promise<any> {
        let response
        try {
            response = await axios.get(url, {
                headers: { range: `bytes=${ offset }-${ offset + length - 1 }` },
                responseType: "arraybuffer",
            })
        } catch (e) {
            throw new SdtfError(e.message)
        }

        // Validate response status
        if (response.status === 416) throw new SdtfError("Invalid range requested.")
        if (response.status !== 206) throw new SdtfError(`Received HTTP status ${ response.status }.`)

        return response.data
    }

    /**
     * Fetches the entire sdTF file (either a binary sdTF or just binary data).
     * Fallback when HTTP range requests are not supported by the server.
     * @private
     * @param url
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @throws {@link SdtfError} when the request was not successful.
     */
    async fetchFully (url: string, offset: number, length: number): Promise<any> {
        let response
        try {
            response = await axios.get(url, {
                responseType: "arraybuffer",
            })
        } catch (e) {
            throw new SdtfError(e.message)
        }

        // Validate response status
        if (response.status !== 200) throw new SdtfError(`Received HTTP status ${ response.status }.`)

        return response.data
    }

}
