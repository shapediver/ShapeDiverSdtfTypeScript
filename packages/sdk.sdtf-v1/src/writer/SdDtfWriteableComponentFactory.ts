import {
    isDataObject,
    ISdDtfWriteableAccessor,
    ISdDtfWriteableAsset,
    ISdDtfWriteableAttribute,
    ISdDtfWriteableAttributes,
    ISdDtfWriteableBuffer,
    ISdDtfWriteableBufferView,
    ISdDtfWriteableChunk,
    ISdDtfWriteableComponentFactory,
    ISdDtfWriteableDataItem,
    ISdDtfWriteableFileInfo,
    ISdDtfWriteableNode,
    ISdDtfWriteableTypeHint,
    SdDtfTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfWriteableAccessor } from "./components/SdDtfWriteableAccessor"
import { SdDtfWriteableAsset } from "./components/SdDtfWriteableAsset"
import { SdDtfWriteableAttribute, SdDtfWriteableAttributes } from "./components/SdDtfWriteableAttributes"
import { SdDtfWriteableBuffer } from "./components/SdDtfWriteableBuffer"
import { SdDtfWriteableBufferView } from "./components/SdDtfWriteableBufferView"
import { SdDtfWriteableChunk } from "./components/SdDtfWriteableChunk"
import { SdDtfWriteableDataItem } from "./components/SdDtfWriteableDataItem"
import { SdDtfWriteableFileInfo } from "./components/SdDtfWriteableFileInfo"
import { SdDtfWriteableNode } from "./components/SdDtfWriteableNode"
import { SdDtfWriteableTypeHint } from "./components/SdDtfWriteableTypeHint"

export class SdDtfWriteableComponentFactory implements ISdDtfWriteableComponentFactory {

    readonly ASSET_VERSION = "1.0"
    readonly ASSET_GENERATOR = "ShapeDiverSdtfWriter"

    createAccessor (content?: { data: ArrayBuffer, contentType: string }): ISdDtfWriteableAccessor {
        const accessor = new SdDtfWriteableAccessor()
        if (content) accessor.bufferView = this.createBufferView(content)
        return accessor
    }

    createAsset (): ISdDtfWriteableAsset {
        const fileInfo: ISdDtfWriteableFileInfo = new SdDtfWriteableFileInfo(this.ASSET_VERSION)
        fileInfo.generator = this.ASSET_GENERATOR

        return new SdDtfWriteableAsset(fileInfo)
    }

    createAttribute (
        content?: unknown | { data: ArrayBuffer, contentType: string },
        typeHint?: string,
    ): ISdDtfWriteableAttribute {
        const attribute = new SdDtfWriteableAttribute()

        if (content) {
            if (this.isBufferContent(content)) attribute.accessor = this.createAccessor(content)
            else attribute.value = content
        }

        if (typeHint !== undefined) attribute.typeHint = this.createTypeHint(typeHint)

        return attribute
    }

    createAttributes (
        content?: Record<string, [ value: unknown | { data: ArrayBuffer, contentType: string }, typeHint?: string ]>,
    ): ISdDtfWriteableAttributes {
        const attributes = new SdDtfWriteableAttributes()
        Object.entries(content ?? {}).forEach(([ name, attr ]) => attributes.entries[name] = this.createAttribute(...attr))
        return attributes
    }

    createBuffer (data?: ArrayBuffer): ISdDtfWriteableBuffer {
        const buffer = new SdDtfWriteableBuffer()
        buffer.data = data
        return buffer
    }

    createBufferView (content?: { data: ArrayBuffer, contentType: string }): ISdDtfWriteableBufferView {
        const bufferView = new SdDtfWriteableBufferView()
        if (content) {
            bufferView.buffer = this.createBuffer(content.data)
            bufferView.contentType = content.contentType
        }
        return bufferView
    }

    createChunk (name?: string): ISdDtfWriteableChunk {
        const chunk = new SdDtfWriteableChunk()
        chunk.name = name
        return chunk
    }

    createDataItem (
        content?: unknown | { data: ArrayBuffer, contentType: string },
        typeHint?: string,
    ): ISdDtfWriteableDataItem {
        const dataItem = new SdDtfWriteableDataItem()

        if (content) {
            if (this.isBufferContent(content)) dataItem.accessor = this.createAccessor(content)
            else dataItem.value = content
        }

        if (typeHint !== undefined) dataItem.typeHint = this.createTypeHint(typeHint)

        return dataItem
    }

    createNode (): ISdDtfWriteableNode {
        return new SdDtfWriteableNode()
    }

    createTypeHint (name?: SdDtfTypeHintName | string): ISdDtfWriteableTypeHint {
        const typeHint = new SdDtfWriteableTypeHint()
        typeHint.name = name
        return typeHint
    }

    /**
     * Type guard for buffer content data.
     * @private
     */
    isBufferContent (content: unknown): content is { data: ArrayBuffer, contentType: string } {
        return !!(isDataObject(content) && content.data && content.contentType)
    }

}
