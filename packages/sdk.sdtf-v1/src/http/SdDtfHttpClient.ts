import { SdDtfError } from "@shapediver/sdk.sdtf-core"
import axios from "axios"
import { ISdDtfBinarySdtf } from "../binary_sdtf/ISdDtfBinarySdtf"
import { SdDtfBinarySdtf } from "../binary_sdtf/SdDtfBinarySdtf"
import { ISdDtfHttpClient } from "./ISdDtfHttpClient"

/** HTTP client of a single sdTF asset. */
export class SdDtfHttpClient implements ISdDtfHttpClient {

    private readonly binarySdtfParser: ISdDtfBinarySdtf

    /** The URL of the sdTF JSON content. */
    readonly jsonContentUrl: string

    constructor (jsonContentUrl: string) {
        this.binarySdtfParser = new SdDtfBinarySdtf()

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
            } = await this.tryFetchPartially(this.jsonContentUrl, 0, this.binarySdtfParser.binaryHeaderLength)

            if (partial) {
                // Partial requests are supported by the server - fetch json content next
                const [ contentLength, _ ] = this.binarySdtfParser.readHeader(data)
                const jsonContentBuffer = await this.tryFetchPartially(this.jsonContentUrl, 20, contentLength)
                return [ new DataView(jsonContentBuffer.data), undefined ]
            } else {
                // Entire sdTF has been returned - parse and return
                return this.binarySdtfParser.parseBinarySdtf(data)
            }
        } catch (e) {
            throw new SdDtfError(`Could not fetch sdTF JSON content: ${ e.message }`)
        }
    }

    async getBinaryBuffer (uri: string | undefined, offset: number, length: number): Promise<[ DataView, ArrayBuffer | undefined ]> {
        try {
            const { data, partial } = await this.tryFetchPartially(this.calcUrl(uri), offset, length)
            if (partial) {
                // Partial requests are supported by the server - partial buffer was fetched
                return [ new DataView(data), undefined ]
            } else {
                // Partial requests are supported by the server - entire buffer was fechted
                return [ new DataView(data, offset, length), data ]
            }
        } catch (e) {
            throw new SdDtfError(`Could not fetch sdTF binary buffer: ${ e.message }`)
        }
    }

    /**
     * Tries to fetch the specified part of the sdTF file.
     * When the server supports HTTP range requests, only the requested part is returned.
     * Otherwise, the entire sdTF file (either a binary sdTF or just binary data) is returned.
     * @private
     * @param url
     * @param offset - Zero-based byte index at which to begin (inclusive).
     * @param length - Length of the buffer.
     * @throws {@link SdDtfError} when the request was not successful.
     */
    async tryFetchPartially (url: string, offset: number, length: number): Promise<{ data: ArrayBuffer, partial: boolean }> {
        let response
        try {

            response = await axios.get(url, {
                headers: { range: `bytes=${ offset }-${ offset + length - 1 }` },
                responseType: "arraybuffer",
            })
        } catch (e) {
            throw new SdDtfError(e.message)
        }

        // Validate response status
        if (response.status === 416) throw new SdDtfError("Invalid range requested.")
        if (response.status > 299) throw new SdDtfError(`Received HTTP status ${ response.status }.`)

        const buffer = Uint8Array.from(response.data).buffer

        return {
            data: buffer,
            // When the server supports HTTP range requests, it responds with an 206 status.
            partial: response.status === 206,
        }
    }

}
