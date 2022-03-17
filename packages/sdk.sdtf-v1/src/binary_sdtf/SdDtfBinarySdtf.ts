import { SdDtfError } from "../SdDtfError"
import { ISdDtfBinarySdtf } from "./ISdDtfBinarySdtf"

export class SdDtfBinarySdtf implements ISdDtfBinarySdtf {

    private readonly BINARY_HEADER_LENGTH = 20

    constructBinarySdtf (content: Record<string, unknown>, body: ArrayBuffer): ArrayBuffer {
        throw new Error("Not yet implemented!")
    }

    parseBinarySdtf (sdtf: ArrayBuffer): [ Record<string, unknown>, ArrayBuffer ] {
        const [ contentLength, totalLength ] = this.readHeader(sdtf)
        const content = this.readJsonContent(sdtf, contentLength)
        const body = this.readBinaryBody(sdtf, contentLength, totalLength)

        return [ content, body ]
    }

    /**
     * Parses the header of the given sdTF file and validates its parts.
     * @private
     * @returns - [ content length, total length ]
     * @throws {@link SdDtfError} when the validation fails.
     */
    readHeader (sdtf: ArrayBuffer): [ number, number ] {
        const headerDataView = new DataView(sdtf, 0, this.BINARY_HEADER_LENGTH)

        const magic =
            String.fromCharCode(headerDataView.getUint8(0)) +
            String.fromCharCode(headerDataView.getUint8(1)) +
            String.fromCharCode(headerDataView.getUint8(2)) +
            String.fromCharCode(headerDataView.getUint8(3))
        if (magic !== "sdtf") throw new SdDtfError(`Invalid identifier: Unknown file type for identifier '${ magic }'.`)

        const version = headerDataView.getUint32(4, true)
        if (version !== 1) throw new SdDtfError(`Invalid version: Unsupported sdTF version '${ version }'.`)

        const totalLength = headerDataView.getUint32(8, true)
        const contentLength = headerDataView.getUint32(12, true)

        const contentFormat = headerDataView.getUint32(16, true)
        if (contentFormat !== 0) throw new SdDtfError(`Invalid content: Unsupported content format '${ contentFormat }'.`)

        return [ contentLength, totalLength ]
    }

    /** Creates an sdTF header buffer object. */
    writeHeader (contentLength: number, bodyLength: number): ArrayBuffer {
        const buffer = new Uint8Array(20)
        const headerDataView = new DataView(buffer.buffer, 0, buffer.byteLength)

        // Write magic (here we must use Unicode encoding)
        const magic = "sdtf"
        headerDataView.setUint8(0, magic.codePointAt(0)!)
        headerDataView.setUint8(1, magic.codePointAt(1)!)
        headerDataView.setUint8(2, magic.codePointAt(2)!)
        headerDataView.setUint8(3, magic.codePointAt(3)!)

        // Write version
        const version = 1
        headerDataView.setUint32(4, version, true)

        // Write total length of file
        const totalLength = this.BINARY_HEADER_LENGTH + contentLength + bodyLength
        headerDataView.setUint32(8, totalLength, true)

        // Write length of content string
        headerDataView.setUint32(12, contentLength, true)

        // Write format string
        const format = 0    // JSON
        headerDataView.setUint32(16, format, true)

        return headerDataView.buffer
    }

    /**
     * Extracts the content string of the given sdTF file and parses it as a JSON object.
     * @private
     * @throws {@link SdDtfError} when parsing of the content fails.
     */
    readJsonContent (sdtf: ArrayBuffer, contentLength: number): Record<string, unknown> {
        try {
            return JSON.parse(new TextDecoder().decode(new DataView(sdtf, this.BINARY_HEADER_LENGTH, contentLength)))
        } catch (e) {
            throw new SdDtfError(`Invalid content: Cannot parse JSON content. ${ e.message }`)
        }
    }

    /**
     * Extracts the binary body of the given sdTF file.
     * @private
     * @throws {@link SdDtfError}
     */
    readBinaryBody (sdtf: ArrayBuffer, contentLength: number, totalLength: number): ArrayBuffer {
        // NOTE:
        //  `slice` does not care about the overall length! When the buffer is shorter or longer, the result gets
        //  truncated accordingly.
        return sdtf.slice(this.BINARY_HEADER_LENGTH + contentLength, totalLength)
    }

}
