import { SdDtfError } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBinarySdtf } from "./ISdDtfBinarySdtf"

export class SdDtfBinarySdtf implements ISdDtfBinarySdtf {

    /** Number of bytes of the sdTF header. */
    readonly binaryHeaderLength = 20

    constructBinarySdtf (content: Record<string, unknown>, body: ArrayBuffer): ArrayBuffer {
        throw new Error("Not yet implemented!")
    }

    parseBinarySdtf (sdtf: ArrayBuffer): [ DataView, DataView ] {
        const header = new DataView(sdtf, 0, this.binaryHeaderLength)
        const [ contentLength, totalLength ] = this.readHeader(header)

        const jsonContent = new DataView(sdtf, this.binaryHeaderLength, contentLength)
        const binaryBody = new DataView(sdtf, this.binaryHeaderLength + contentLength, totalLength - this.binaryHeaderLength - contentLength)

        return [ jsonContent, binaryBody ]
    }

    readHeader (header: DataView | ArrayBuffer): [ number, number ] {
        if (header instanceof ArrayBuffer) header = new DataView(header)

        const magic =
            String.fromCharCode(header.getUint8(0)) +
            String.fromCharCode(header.getUint8(1)) +
            String.fromCharCode(header.getUint8(2)) +
            String.fromCharCode(header.getUint8(3))
        if (magic !== "sdtf") throw new SdDtfError(`Invalid identifier: Unknown file type for identifier '${ magic }'.`)

        const version = header.getUint32(4, true)
        if (version !== 1) throw new SdDtfError(`Invalid version: Unsupported sdTF version '${ version }'.`)

        const totalLength = header.getUint32(8, true)
        const contentLength = header.getUint32(12, true)

        const contentFormat = header.getUint32(16, true)
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
        const totalLength = this.binaryHeaderLength + contentLength + bodyLength
        headerDataView.setUint32(8, totalLength, true)

        // Write length of content string
        headerDataView.setUint32(12, contentLength, true)

        // Write format string
        const format = 0    // JSON
        headerDataView.setUint32(16, format, true)

        return headerDataView.buffer
    }

    readJsonContent (jsonContent: DataView | ArrayBuffer): Record<string, unknown> {
        if (jsonContent instanceof ArrayBuffer) jsonContent = new DataView(jsonContent)

        try {
            return JSON.parse(new TextDecoder().decode(jsonContent))
        } catch (e) {
            throw new SdDtfError(`Invalid content: Cannot parse JSON content. ${ e.message }`)
        }
    }

}
