import { ISdDtfAsset, ISdDtfParser, ISdDtfReader, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { isBrowser } from "browser-or-node"
import { ISdDtfBinarySdtf } from "../binary_sdtf/ISdDtfBinarySdtf"
import { SdDtfBinarySdtf } from "../binary_sdtf/SdDtfBinarySdtf"
import { ISdDtfBufferCache } from "../buffer_cache/ISdDtfBufferCache"
import { SdDtfBinaryBufferCache } from "../buffer_cache/SdDtfBinaryBufferCache"
import { SdDtfFileBufferCache } from "../buffer_cache/SdDtfFileBufferCache"
import { SdDtfHttpBufferCache } from "../buffer_cache/SdDtfHttpBufferCache"
import { ISdDtfHttpClient } from "../http/ISdDtfHttpClient"
import { SdDtfHttpClient } from "../http/SdDtfHttpClient"
import { SdDtfFileUtils } from "../utils/SdDtfFileUtils"
import { SdDtfAssetBuilder } from "./SdDtfAssetBuilder"
import { SdDtfDataParser } from "./SdDtfDataParser"

export class SdDtfParser implements ISdDtfParser {

    private readonly binarySdtfParser: ISdDtfBinarySdtf
    private readonly fileUtils: SdDtfFileUtils

    constructor (private readonly readers: ISdDtfReader[]) {
        this.binarySdtfParser = new SdDtfBinarySdtf()
        this.fileUtils = new SdDtfFileUtils()
    }

    readFromFile (path: string): ISdDtfAsset {
        // Quick check to make sure we are in NodeJs
        if (isBrowser) throw new SdDtfError("Reading from file is only supported in Node.js.")

        let absolutePath, buffer
        try {
            absolutePath = this.fileUtils.toAbsolutePath(path)
            buffer = this.fileUtils.readFile(absolutePath)
        } catch (e) {
            throw new SdDtfError(`Error reading sdTF-file: ${ e.message }`)
        }

        const [ contentBuffer, binaryBuffer ] = this.binarySdtfParser.parseBinarySdtf(buffer)
        const jsonContent = this.binarySdtfParser.readJsonContent(contentBuffer)

        const bufferCache = new SdDtfFileBufferCache(absolutePath)
        bufferCache.setBinaryBody(binaryBuffer)
        // TODO add bufferCache to context

        return this.createSdtfAsset(jsonContent, bufferCache)
    }

    async readFromUrl (url: string): Promise<ISdDtfAsset> {
        const httpClient: ISdDtfHttpClient = new SdDtfHttpClient(url)
        const [ contentBuffer, binaryBuffer ] = await httpClient.getJsonContent()
        const jsonContent = this.binarySdtfParser.readJsonContent(contentBuffer)

        const bufferCache = new SdDtfHttpBufferCache(httpClient)
        bufferCache.setBinaryBody(binaryBuffer)
        // TODO add bufferCache to context

        return this.createSdtfAsset(jsonContent, bufferCache)
    }

    readFromBuffer (sdtf: ArrayBuffer): ISdDtfAsset {
        const [ contentBuffer, binaryBuffer ] = this.binarySdtfParser.parseBinarySdtf(sdtf)
        const jsonContent = this.binarySdtfParser.readJsonContent(contentBuffer)

        const bufferCache = new SdDtfBinaryBufferCache()
        bufferCache.setBinaryBody(binaryBuffer)
        // TODO add bufferCache to context

        return this.createSdtfAsset(jsonContent, bufferCache)
    }

    /** Instantiates a sdTF asset that represents the given content. */
    createSdtfAsset (content: Record<string, unknown>, bufferCache: ISdDtfBufferCache): ISdDtfAsset {
        // NOTE:
        //  Object references between components are set during individual build
        //  sets as well. Thus, the order in which the build steps are executed
        //  is crucial! Otherwise, runtime errors will occur.
        return new SdDtfAssetBuilder(content, bufferCache, new SdDtfDataParser(this.readers))
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
