import {
    ISdDtfAccessor,
    ISdDtfAttributes,
    ISdDtfBuffer,
    ISdDtfBufferView,
    ISdDtfChunk,
    ISdDtfDataItem,
    ISdDtfFileInfo,
    ISdDtfNode,
    ISdDtfReadableAccessor,
    ISdDtfReadableAttributes,
    ISdDtfReadableBuffer,
    ISdDtfReadableBufferView,
    ISdDtfReadableChunk,
    ISdDtfReadableDataItem,
    ISdDtfReadableFileInfo,
    ISdDtfReadableNode,
    ISdDtfReadableTypeHint,
    ISdDtfTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { ISdDtfBufferCache } from "../buffer_cache/ISdDtfBufferCache"
import { SdDtfReadableAccessor } from "./components/SdDtfReadableAccessor"
import { SdDtfReadableAttribute, SdDtfReadableAttributes } from "./components/SdDtfReadableAttributes"
import { SdDtfReadableBuffer } from "./components/SdDtfReadableBuffer"
import { SdDtfReadableBufferView } from "./components/SdDtfReadableBufferView"
import { SdDtfReadableDataItem } from "./components/SdDtfReadableDataItem"
import { SdDtfReadableFileInfo } from "./components/SdDtfReadableFileInfo"
import { SdDtfReadableNode } from "./components/SdDtfReadableNode"
import { SdDtfReadableTypeHint } from "./components/SdDtfReadableTypeHint"
import { ISdDtfDataParser } from "./ISdDtfDataParser"
import { ISdDtfReadableComponentFactory } from "./ISdDtfReadableComponentFactory"

export class SdDtfReadableComponentFactory implements ISdDtfReadableComponentFactory {

    constructor (
        private readonly bufferCache: ISdDtfBufferCache,
        private readonly dataParser: ISdDtfDataParser,
    ) {
    }

    createAccessor (accessor: ISdDtfAccessor, bufferViews: ISdDtfReadableBufferView[]): ISdDtfReadableAccessor {
        // Instantiate object
        const readableAccessor = new SdDtfReadableAccessor(bufferViews[accessor.bufferView])

        readableAccessor.bufferView = bufferViews[accessor.bufferView]
        readableAccessor.id = accessor.id
        readableAccessor.additionalProperties = accessor.additionalProperties

        return readableAccessor
    }

    createAttributes (
        attribute: ISdDtfAttributes,
        accessors: ISdDtfReadableAccessor[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableAttributes {
        const readableAttributes = new SdDtfReadableAttributes()

        Object.entries(attribute.entries).forEach(([ name, attribute ]) => {
            const readableAttribute = new SdDtfReadableAttribute(this.dataParser)
            if (attribute.accessor !== undefined) readableAttribute.accessor = accessors[attribute.accessor]
            if (attribute.typeHint !== undefined) readableAttribute.typeHint = typeHints[attribute.typeHint]
            readableAttribute.value = attribute.value
            readableAttributes.entries[name] = readableAttribute
        })

        return readableAttributes
    }

    createBuffer (buffer: ISdDtfBuffer): ISdDtfReadableBuffer {
        const readableBuffer = new SdDtfReadableBuffer(buffer.byteLength, this.bufferCache)
        readableBuffer.uri = buffer.uri
        readableBuffer.additionalProperties = buffer.additionalProperties

        return readableBuffer
    }

    createBufferView (bufferView: ISdDtfBufferView, buffers: ISdDtfReadableBuffer[]): ISdDtfReadableBufferView {
        const readableBufferView = new SdDtfReadableBufferView(
            buffers[bufferView.buffer],
            bufferView.byteLength,
            bufferView.byteOffset,
            bufferView.contentType,
        )
        readableBufferView.contentEncoding = bufferView.contentEncoding
        readableBufferView.name = bufferView.name
        readableBufferView.additionalProperties = bufferView.additionalProperties

        return readableBufferView
    }

    createChunk (
        chunk: ISdDtfChunk,
        attributes: ISdDtfReadableAttributes[],
        dataItems: ISdDtfReadableDataItem[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableChunk {
        return this.createNode(chunk, attributes, dataItems, typeHints)
    }

    createDataItem (
        dataItem: ISdDtfDataItem,
        accessors: ISdDtfReadableAccessor[],
        attributes: ISdDtfReadableAttributes[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableDataItem {
        const readableDataItem = new SdDtfReadableDataItem(this.dataParser)

        if (dataItem.accessor !== undefined) readableDataItem.accessor = accessors[dataItem.accessor]
        if (dataItem.attributes !== undefined) readableDataItem.attributes = attributes[dataItem.attributes]
        if (dataItem.typeHint !== undefined) readableDataItem.typeHint = typeHints[dataItem.typeHint]
        readableDataItem.value = dataItem.value
        readableDataItem.additionalProperties = dataItem.additionalProperties

        return readableDataItem
    }

    createFileInfo (fileInfo: ISdDtfFileInfo): ISdDtfReadableFileInfo {
        const readableFileInfo = new SdDtfReadableFileInfo(fileInfo.version)

        readableFileInfo.copyright = fileInfo.copyright
        readableFileInfo.generator = fileInfo.generator
        readableFileInfo.version = fileInfo.version
        readableFileInfo.additionalProperties = fileInfo.additionalProperties

        return readableFileInfo
    }

    createNode (
        node: ISdDtfNode,
        attributes: ISdDtfReadableAttributes[],
        dataItems: ISdDtfReadableDataItem[],
        typeHints: ISdDtfReadableTypeHint[],
    ): ISdDtfReadableNode {
        const readableNode = new SdDtfReadableNode()

        // NOTE the node property is ignored on purpose and later linked via `setNodeReferences`
        if (node.attributes !== undefined) readableNode.attributes = attributes[node.attributes]
        readableNode.items = node.items.map(d => dataItems[d])
        readableNode.name = node.name
        if (node.typeHint !== undefined) readableNode.typeHint = typeHints[node.typeHint]
        readableNode.additionalProperties = node.additionalProperties

        return readableNode
    }

    createTypeHint (typeHint: ISdDtfTypeHint): ISdDtfReadableTypeHint {
        const readableTypeHint = new SdDtfReadableTypeHint(typeHint.name)
        readableTypeHint.additionalProperties = typeHint.additionalProperties

        return readableTypeHint
    }

    setChunkReferences (readableChunks: ISdDtfReadableChunk[], chunks: ISdDtfChunk[], readableNodes: ISdDtfReadableNode[]): void {
        chunks.forEach((chunk, index) => {
            const readableChunk = readableChunks[index]
            readableChunk.nodes = chunk.nodes.map(nodePos => readableNodes[nodePos])
        })
    }

    setNodeReferences (readableNodes: ISdDtfReadableNode[], nodes: ISdDtfNode[]): void {
        nodes.forEach((node, index) => {
            const readableNode = readableNodes[index]
            readableNode.nodes = node.nodes.map(nodePos => readableNodes[nodePos])
        })
    }

}
