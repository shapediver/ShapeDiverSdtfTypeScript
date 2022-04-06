import { ISdDtfIntegration, ISdDtfParser, ISdDtfReadableAsset, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { isBrowser } from "browser-or-node"
import { ISdDtfBinarySdtf } from "../binary_sdtf/ISdDtfBinarySdtf"
import { SdDtfBinarySdtf } from "../binary_sdtf/SdDtfBinarySdtf"
import { ISdDtfBufferCache } from "../buffer_cache/ISdDtfBufferCache"
import { SdDtfBinaryBufferCache } from "../buffer_cache/SdDtfBinaryBufferCache"
import { SdDtfFileBufferCache } from "../buffer_cache/SdDtfFileBufferCache"
import { SdDtfHttpBufferCache } from "../buffer_cache/SdDtfHttpBufferCache"
import { ISdDtfHttpClient } from "../http/ISdDtfHttpClient"
import { SdDtfHttpClient } from "../http/SdDtfHttpClient"
import { ISdDtfComponentFactoryWrapper } from "../structure/ISdDtfComponentFactoryWrapper"
import { ISdDtfComponentList } from "../structure/ISdDtfComponentList"
import { SdDtfComponentFactoryWrapper } from "../structure/SdDtfComponentFactoryWrapper"
import { SdDtfFileUtils } from "../utils/SdDtfFileUtils"
import { SdDtfReadableAsset } from "./components/SdDtfReadableAsset"
import { ISdDtfReadableComponentFactory } from "./ISdDtfReadableComponentFactory"
import { SdDtfDataParser } from "./SdDtfDataParser"
import { SdDtfReadableComponentFactory } from "./SdDtfReadableComponentFactory"

export class SdDtfParser implements ISdDtfParser {

    private readonly binarySdtfParser: ISdDtfBinarySdtf
    private readonly componentFactory: ISdDtfComponentFactoryWrapper
    private readonly fileUtils: SdDtfFileUtils

    constructor (private readonly integration: ISdDtfIntegration[]) {
        this.binarySdtfParser = new SdDtfBinarySdtf()
        this.componentFactory = new SdDtfComponentFactoryWrapper()
        this.fileUtils = new SdDtfFileUtils()
    }

    readFromFile (path: string): ISdDtfReadableAsset {
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

    async readFromUrl (url: string): Promise<ISdDtfReadableAsset> {
        const httpClient: ISdDtfHttpClient = new SdDtfHttpClient(url)
        const [ contentBuffer, binaryBuffer ] = await httpClient.getJsonContent()
        const jsonContent = this.binarySdtfParser.readJsonContent(contentBuffer)

        const bufferCache = new SdDtfHttpBufferCache(httpClient)
        bufferCache.setBinaryBody(binaryBuffer)
        // TODO add bufferCache to context

        return this.createSdtfAsset(jsonContent, bufferCache)
    }

    readFromBuffer (sdtf: ArrayBuffer): ISdDtfReadableAsset {
        const [ contentBuffer, binaryBuffer ] = this.binarySdtfParser.parseBinarySdtf(sdtf)
        const jsonContent = this.binarySdtfParser.readJsonContent(contentBuffer)

        const bufferCache = new SdDtfBinaryBufferCache()
        bufferCache.setBinaryBody(binaryBuffer)
        // TODO add bufferCache to context

        return this.createSdtfAsset(jsonContent, bufferCache)
    }

    /** Instantiates a sdTF asset that represents the given content. */
    createSdtfAsset (content: Record<string, unknown>, bufferCache: ISdDtfBufferCache): ISdDtfReadableAsset {
        const componentList = this.componentFactory.createFromJson(content)
        // TODO apply integrations - validate + map!!!
        const readableComponentFactory = new SdDtfReadableComponentFactory(bufferCache, new SdDtfDataParser(this.integration))
        return this.buildReadableAsset(componentList, readableComponentFactory)
    }

    /**
     * Transforms the given component list into a readable sdTF asset.
     * @private
     */
    buildReadableAsset (componentList: ISdDtfComponentList, factory: ISdDtfReadableComponentFactory): ISdDtfReadableAsset {
        const fileInfo = factory.createReadableFileInfo(componentList.fileInfo)
        const asset = new SdDtfReadableAsset(fileInfo)
        asset.typeHints = componentList.typeHints.map(t => factory.createReadableTypeHint(t))
        asset.buffers = componentList.buffers.map(b => factory.createReadableBuffer(b))
        asset.bufferViews = componentList.bufferViews.map(b => factory.createReadableBufferView(b, asset.buffers))
        asset.accessors = componentList.accessors.map(a => factory.createReadableAccessor(a, asset.bufferViews))
        asset.attributes = componentList.attributes.map(a => factory.createAttribute(a, asset.accessors, asset.typeHints))
        asset.items = componentList.items.map(d => factory.createReadableDataItem(d, asset.accessors, asset.attributes, asset.typeHints))
        asset.nodes = componentList.nodes.map(n => factory.createReadableNode(n, asset.attributes, asset.items, asset.typeHints))
        asset.chunks = componentList.chunks.map(c => factory.createReadableChunk(c, asset.attributes, asset.items, asset.typeHints))

        factory.setChunkReferences(asset.chunks, componentList.chunks, asset.nodes)
        factory.setNodeReferences(asset.nodes, componentList.nodes)

        return asset
    }

}
