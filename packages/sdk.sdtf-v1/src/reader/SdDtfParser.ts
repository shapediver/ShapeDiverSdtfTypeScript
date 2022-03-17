import { ISdDtfAsset, ISdDtfParser } from "@shapediver/sdk.sdtf-core"
import axios from "axios"
import { isBrowser } from "browser-or-node"
import { ISdDtfBinarySdtf } from "../binary_sdtf/ISdDtfBinarySdtf"
import { SdDtfBinarySdtf } from "../binary_sdtf/SdDtfBinarySdtf"
import { SdDtfError } from "../SdDtfError"
import { SdDtfAssetBuilder } from "./SdDtfAssetBuilder"

export class SdDtfParser implements ISdDtfParser {

    private readonly binarySdtfParser: ISdDtfBinarySdtf

    constructor () {
        this.binarySdtfParser = new SdDtfBinarySdtf()
    }

    readFromFile (path: string): ISdDtfAsset {
        // Quick check to make sure we are in NodeJs
        if (isBrowser) {
            throw new SdDtfError("Reading from file is only supported in Node.js.")
        }

        const resolve = require("path").resolve
        const fs = require("fs")

        // Convert relative path to absolute path
        const absolutePath = resolve(path)

        if (!fs.existsSync(absolutePath)) {
            throw new SdDtfError(`Error reading sdTF-file: Cannot find file at location '${ absolutePath }'`)
        }

        const buffer = fs.readFileSync(path)
        return this.readFromBuffer(buffer.buffer)
    }

    async readFromUrl (url: string): Promise<ISdDtfAsset> {
        let response
        try {
            response = await axios.get(url, { responseType: "arraybuffer" })
        } catch (e) {
            throw new SdDtfError(`Could not fetch from URL: ${ e.message }`)
        }

        if (response.status !== 200) {
            throw new SdDtfError(`Could not fetch from URL: Response status is ${ response.status }.`)
        }

        if (!(response.headers["content-type"] && response.headers["content-type"] === "model/vnd.sdtf")) {
            throw new SdDtfError("Unsupported file type: Non-binary sdTF encoding not implemented.")
        }

        let buffer: ArrayBuffer = (response.data instanceof ArrayBuffer) ?
            response.data :
            (<Uint8Array>response.data).buffer

        return this.readFromBuffer(buffer)
    }

    readFromBuffer (buffer: ArrayBuffer): ISdDtfAsset {
        const [ content, _ ] = this.binarySdtfParser.parseBinarySdtf(buffer)
        return this.createSdtfAsset(content)
    }

    /** Instantiates a sdTF asset that represents the given content. */
    createSdtfAsset (content: Record<string, unknown>): ISdDtfAsset {
        // NOTE:
        //  Object references between components are set during individual build
        //  sets as well. Thus, the order in which the build steps are executed
        //  is crucial! Otherwise, runtime errors will occur.
        return new SdDtfAssetBuilder(content)
            .buildTypeHint()
            .buildBuffer()
            .buildBufferView()
            .buildAccessor()
            .buildAttributes()
            .buildDataItem()
            .buildNode()
            .buildChunks()
            .buildFileInfo()
            .getResult()
    }

}
