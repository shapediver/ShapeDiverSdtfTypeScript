import {
    ISdtfAccessor,
    ISdtfAttributes,
    ISdtfBuffer,
    ISdtfBufferView,
    ISdtfChunk,
    ISdtfDataItem,
    ISdtfFileInfo,
    ISdtfNode,
    ISdtfReadableAccessor,
    ISdtfReadableAttributes,
    ISdtfReadableBuffer,
    ISdtfReadableBufferView,
    ISdtfReadableChunk,
    ISdtfReadableDataItem,
    ISdtfReadableFileInfo,
    ISdtfReadableNode,
    ISdtfReadableTypeHint,
    ISdtfTypeHint,
} from '@shapediver/sdk.sdtf-core';
import { ISdtfBufferCache } from '../buffer_cache/ISdtfBufferCache';
import { SdtfReadableAccessor } from './components/SdtfReadableAccessor';
import {
    SdtfReadableAttribute,
    SdtfReadableAttributes,
} from './components/SdtfReadableAttributes';
import { SdtfReadableBuffer } from './components/SdtfReadableBuffer';
import { SdtfReadableBufferView } from './components/SdtfReadableBufferView';
import { SdtfReadableDataItem } from './components/SdtfReadableDataItem';
import { SdtfReadableFileInfo } from './components/SdtfReadableFileInfo';
import { SdtfReadableNode } from './components/SdtfReadableNode';
import { SdtfReadableTypeHint } from './components/SdtfReadableTypeHint';
import { ISdtfDataParser } from './ISdtfDataParser';
import { ISdtfReadableComponentFactory } from './ISdtfReadableComponentFactory';

export class SdtfReadableComponentFactory implements ISdtfReadableComponentFactory {
    constructor(
        private readonly bufferCache: ISdtfBufferCache,
        private readonly dataParser: ISdtfDataParser
    ) {}

    createAccessor(
        accessor: ISdtfAccessor,
        bufferViews: ISdtfReadableBufferView[]
    ): ISdtfReadableAccessor {
        // Instantiate object
        const readableAccessor = new SdtfReadableAccessor(bufferViews[accessor.bufferView]);

        readableAccessor.bufferView = bufferViews[accessor.bufferView];
        readableAccessor.id = accessor.id;
        readableAccessor.additionalProperties = accessor.additionalProperties;

        return readableAccessor;
    }

    createAttributes(
        attribute: ISdtfAttributes,
        accessors: ISdtfReadableAccessor[],
        typeHints: ISdtfReadableTypeHint[]
    ): ISdtfReadableAttributes {
        const readableAttributes = new SdtfReadableAttributes();

        Object.entries(attribute.entries).forEach(([name, attribute]) => {
            const readableAttribute = new SdtfReadableAttribute(this.dataParser);
            if (attribute.accessor !== undefined)
                readableAttribute.accessor = accessors[attribute.accessor];
            if (attribute.typeHint !== undefined)
                readableAttribute.typeHint = typeHints[attribute.typeHint];
            readableAttribute.value = attribute.value;
            readableAttributes.entries[name] = readableAttribute;
        });

        return readableAttributes;
    }

    createBuffer(buffer: ISdtfBuffer): ISdtfReadableBuffer {
        const readableBuffer = new SdtfReadableBuffer(buffer.byteLength, this.bufferCache);
        readableBuffer.uri = buffer.uri;
        readableBuffer.additionalProperties = buffer.additionalProperties;

        return readableBuffer;
    }

    createBufferView(
        bufferView: ISdtfBufferView,
        buffers: ISdtfReadableBuffer[]
    ): ISdtfReadableBufferView {
        const readableBufferView = new SdtfReadableBufferView(
            buffers[bufferView.buffer],
            bufferView.byteLength,
            bufferView.byteOffset,
            bufferView.contentType
        );
        readableBufferView.contentEncoding = bufferView.contentEncoding;
        readableBufferView.name = bufferView.name;
        readableBufferView.additionalProperties = bufferView.additionalProperties;

        return readableBufferView;
    }

    createChunk(
        chunk: ISdtfChunk,
        attributes: ISdtfReadableAttributes[],
        dataItems: ISdtfReadableDataItem[],
        typeHints: ISdtfReadableTypeHint[]
    ): ISdtfReadableChunk {
        return this.createNode(chunk, attributes, dataItems, typeHints);
    }

    createDataItem(
        dataItem: ISdtfDataItem,
        accessors: ISdtfReadableAccessor[],
        attributes: ISdtfReadableAttributes[],
        typeHints: ISdtfReadableTypeHint[]
    ): ISdtfReadableDataItem {
        const readableDataItem = new SdtfReadableDataItem(this.dataParser);

        if (dataItem.accessor !== undefined)
            readableDataItem.accessor = accessors[dataItem.accessor];
        if (dataItem.attributes !== undefined)
            readableDataItem.attributes = attributes[dataItem.attributes];
        if (dataItem.typeHint !== undefined)
            readableDataItem.typeHint = typeHints[dataItem.typeHint];
        readableDataItem.value = dataItem.value;
        readableDataItem.additionalProperties = dataItem.additionalProperties;

        return readableDataItem;
    }

    createFileInfo(fileInfo: ISdtfFileInfo): ISdtfReadableFileInfo {
        const readableFileInfo = new SdtfReadableFileInfo(fileInfo.version);

        readableFileInfo.copyright = fileInfo.copyright;
        readableFileInfo.generator = fileInfo.generator;
        readableFileInfo.version = fileInfo.version;
        readableFileInfo.additionalProperties = fileInfo.additionalProperties;

        return readableFileInfo;
    }

    createNode(
        node: ISdtfNode,
        attributes: ISdtfReadableAttributes[],
        dataItems: ISdtfReadableDataItem[],
        typeHints: ISdtfReadableTypeHint[]
    ): ISdtfReadableNode {
        const readableNode = new SdtfReadableNode();

        // NOTE the node property is ignored on purpose and later linked via `setNodeReferences`
        if (node.attributes !== undefined) readableNode.attributes = attributes[node.attributes];
        readableNode.items = node.items.map((d) => dataItems[d]);
        readableNode.name = node.name;
        if (node.typeHint !== undefined) readableNode.typeHint = typeHints[node.typeHint];
        readableNode.additionalProperties = node.additionalProperties;

        return readableNode;
    }

    createTypeHint(typeHint: ISdtfTypeHint): ISdtfReadableTypeHint {
        const readableTypeHint = new SdtfReadableTypeHint(typeHint.name);
        readableTypeHint.additionalProperties = typeHint.additionalProperties;

        return readableTypeHint;
    }

    setChunkReferences(
        readableChunks: ISdtfReadableChunk[],
        chunks: ISdtfChunk[],
        readableNodes: ISdtfReadableNode[]
    ): void {
        chunks.forEach((chunk, index) => {
            const readableChunk = readableChunks[index];
            readableChunk.nodes = chunk.nodes.map((nodePos) => readableNodes[nodePos]);
        });
    }

    setNodeReferences(readableNodes: ISdtfReadableNode[], nodes: ISdtfNode[]): void {
        nodes.forEach((node, index) => {
            const readableNode = readableNodes[index];
            readableNode.nodes = node.nodes.map((nodePos) => readableNodes[nodePos]);
        });
    }
}
