import { ISdtfParser, ISdtfReadableAsset, SdtfError } from '@shapediver/sdk.sdtf-core';
import { isBrowser } from 'browser-or-node';
import { ISdtfBinarySdtf } from '../binary_sdtf/ISdtfBinarySdtf';
import { SdtfBinarySdtf } from '../binary_sdtf/SdtfBinarySdtf';
import { ISdtfBufferCache } from '../buffer_cache/ISdtfBufferCache';
import { SdtfBinaryBufferCache } from '../buffer_cache/SdtfBinaryBufferCache';
import { SdtfFileBufferCache } from '../buffer_cache/SdtfFileBufferCache';
import { SdtfHttpBufferCache } from '../buffer_cache/SdtfHttpBufferCache';
import { ISdtfHttpClient } from '../http/ISdtfHttpClient';
import { SdtfHttpClient } from '../http/SdtfHttpClient';
import { SdtfConfig } from '../SdtfConfig';
import { ISdtfComponentFactoryWrapper } from '../structure/ISdtfComponentFactoryWrapper';
import { ISdtfComponentList } from '../structure/ISdtfComponentList';
import { SdtfComponentFactoryWrapper } from '../structure/SdtfComponentFactoryWrapper';
import { SdtfFileUtils } from '../utils/SdtfFileUtils';
import { SdtfReadableAsset } from './components/SdtfReadableAsset';
import { ISdtfReadableComponentFactory } from './ISdtfReadableComponentFactory';
import { SdtfDataParser } from './SdtfDataParser';
import { SdtfReadableComponentFactory } from './SdtfReadableComponentFactory';

export class SdtfParser implements ISdtfParser {
    private readonly binarySdtfParser: ISdtfBinarySdtf;
    private readonly componentFactory: ISdtfComponentFactoryWrapper;
    private readonly fileUtils: SdtfFileUtils;

    constructor(private readonly config: SdtfConfig) {
        this.binarySdtfParser = new SdtfBinarySdtf();
        this.componentFactory = new SdtfComponentFactoryWrapper();
        this.fileUtils = new SdtfFileUtils();
    }

    async readFromFile(path: string): Promise<ISdtfReadableAsset> {
        // Quick check to make sure we are in NodeJs
        if (isBrowser) throw new SdtfError('Reading from file is only supported in Node.js.');

        let absolutePath, buffer;
        try {
            absolutePath = this.fileUtils.toAbsolutePath(path);
            buffer = await this.fileUtils.readFile(absolutePath);
        } catch (e) {
            throw new SdtfError(`Cannot read sdTF-file: ${e.message}`);
        }

        const [contentBuffer, binaryBuffer] = this.binarySdtfParser.parseBinarySdtf(buffer);
        const jsonContent = this.binarySdtfParser.readJsonContent(contentBuffer);

        const bufferCache = new SdtfFileBufferCache(absolutePath);
        bufferCache.setBinaryBody(binaryBuffer);

        return this.createSdtfAsset(jsonContent, bufferCache);
    }

    async readFromUrl(url: string): Promise<ISdtfReadableAsset> {
        const httpClient: ISdtfHttpClient = new SdtfHttpClient(url, this.config.authToken);
        const [contentBuffer, binaryBuffer] = await httpClient.getJsonContent();
        const jsonContent = this.binarySdtfParser.readJsonContent(contentBuffer);

        const bufferCache = new SdtfHttpBufferCache(httpClient);
        bufferCache.setBinaryBody(binaryBuffer);

        return this.createSdtfAsset(jsonContent, bufferCache);
    }

    readFromBuffer(sdtf: ArrayBuffer): ISdtfReadableAsset {
        const [contentBuffer, binaryBuffer] = this.binarySdtfParser.parseBinarySdtf(sdtf);
        const jsonContent = this.binarySdtfParser.readJsonContent(contentBuffer);

        const bufferCache = new SdtfBinaryBufferCache();
        bufferCache.setBinaryBody(binaryBuffer);

        return this.createSdtfAsset(jsonContent, bufferCache);
    }

    /** Instantiates a sdTF asset that represents the given content. */
    createSdtfAsset(
        content: Record<string, unknown>,
        bufferCache: ISdtfBufferCache
    ): ISdtfReadableAsset {
        const componentList = this.componentFactory.createFromJson(content);
        const readableComponentFactory = new SdtfReadableComponentFactory(
            bufferCache,
            new SdtfDataParser(this.config.integrations)
        );
        return this.buildReadableAsset(componentList, readableComponentFactory);
    }

    /**
     * Transforms the given component list into a readable sdTF asset.
     * @private
     */
    buildReadableAsset(
        componentList: ISdtfComponentList,
        factory: ISdtfReadableComponentFactory
    ): ISdtfReadableAsset {
        const fileInfo = factory.createFileInfo(componentList.fileInfo);
        const asset = new SdtfReadableAsset(fileInfo);
        asset.typeHints = componentList.typeHints.map((t) => factory.createTypeHint(t));
        asset.buffers = componentList.buffers.map((b) => factory.createBuffer(b));
        asset.bufferViews = componentList.bufferViews.map((b) =>
            factory.createBufferView(b, asset.buffers)
        );
        asset.accessors = componentList.accessors.map((a) =>
            factory.createAccessor(a, asset.bufferViews)
        );
        asset.attributes = componentList.attributes.map((a) =>
            factory.createAttributes(a, asset.accessors, asset.typeHints)
        );
        asset.items = componentList.items.map((d) =>
            factory.createDataItem(d, asset.accessors, asset.attributes, asset.typeHints)
        );
        asset.nodes = componentList.nodes.map((n) =>
            factory.createNode(n, asset.attributes, asset.items, asset.typeHints)
        );
        asset.chunks = componentList.chunks.map((c) =>
            factory.createChunk(c, asset.attributes, asset.items, asset.typeHints)
        );

        factory.setChunkReferences(asset.chunks, componentList.chunks, asset.nodes);
        factory.setNodeReferences(asset.nodes, componentList.nodes);

        return asset;
    }
}
