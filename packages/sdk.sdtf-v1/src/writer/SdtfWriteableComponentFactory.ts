import {
    isDataObject,
    ISdtfWriteableAccessor,
    ISdtfWriteableAsset,
    ISdtfWriteableAttribute,
    ISdtfWriteableAttributes,
    ISdtfWriteableBuffer,
    ISdtfWriteableBufferView,
    ISdtfWriteableChunk,
    ISdtfWriteableComponentFactory,
    ISdtfWriteableDataItem,
    ISdtfWriteableFileInfo,
    ISdtfWriteableNode,
    ISdtfWriteableTypeHint,
    SdtfTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdtfWriteableAccessor } from "./components/SdtfWriteableAccessor"
import { SdtfWriteableAsset } from "./components/SdtfWriteableAsset"
import { SdtfWriteableAttribute, SdtfWriteableAttributes } from "./components/SdtfWriteableAttributes"
import { SdtfWriteableBuffer } from "./components/SdtfWriteableBuffer"
import { SdtfWriteableBufferView } from "./components/SdtfWriteableBufferView"
import { SdtfWriteableChunk } from "./components/SdtfWriteableChunk"
import { SdtfWriteableDataItem } from "./components/SdtfWriteableDataItem"
import { SdtfWriteableFileInfo } from "./components/SdtfWriteableFileInfo"
import { SdtfWriteableNode } from "./components/SdtfWriteableNode"
import { SdtfWriteableTypeHint } from "./components/SdtfWriteableTypeHint"

export class SdtfWriteableComponentFactory implements ISdtfWriteableComponentFactory {

    readonly ASSET_VERSION = "1.0"
    readonly ASSET_GENERATOR = "ShapeDiverSdtfWriter"

    createAccessor (content?: { data: ArrayBuffer, contentType: string }): ISdtfWriteableAccessor {
        const accessor = new SdtfWriteableAccessor()
        if (content) accessor.bufferView = this.createBufferView(content)
        return accessor
    }

    createAsset (): ISdtfWriteableAsset {
        const fileInfo: ISdtfWriteableFileInfo = new SdtfWriteableFileInfo(this.ASSET_VERSION)
        fileInfo.generator = this.ASSET_GENERATOR

        return new SdtfWriteableAsset(fileInfo)
    }

    createAttribute (
        content?: unknown | { data: ArrayBuffer, contentType: string },
        typeHint?: string,
    ): ISdtfWriteableAttribute {
        const attribute = new SdtfWriteableAttribute()

        if (content) {
            if (this.isBufferContent(content)) attribute.accessor = this.createAccessor(content)
            else attribute.value = content
        }

        if (typeHint !== undefined) attribute.typeHint = this.createTypeHint(typeHint)

        return attribute
    }

    createAttributes (
        content?: Record<string, [ value: unknown | { data: ArrayBuffer, contentType: string }, typeHint?: string ]>,
    ): ISdtfWriteableAttributes {
        const attributes = new SdtfWriteableAttributes()
        Object.entries(content ?? {}).forEach(([ name, attr ]) => attributes.entries[name] = this.createAttribute(...attr))
        return attributes
    }

    createBuffer (data?: ArrayBuffer): ISdtfWriteableBuffer {
        const buffer = new SdtfWriteableBuffer()
        buffer.data = data
        return buffer
    }

    createBufferView (content?: { data: ArrayBuffer, contentType: string }): ISdtfWriteableBufferView {
        const bufferView = new SdtfWriteableBufferView()
        if (content) {
            bufferView.buffer = this.createBuffer(content.data)
            bufferView.contentType = content.contentType
        }
        return bufferView
    }

    createChunk (name?: string): ISdtfWriteableChunk {
        const chunk = new SdtfWriteableChunk()
        chunk.name = name
        return chunk
    }

    createDataItem (
        content?: unknown | { data: ArrayBuffer, contentType: string },
        typeHint?: string,
    ): ISdtfWriteableDataItem {
        const dataItem = new SdtfWriteableDataItem()

        if (content) {
            if (this.isBufferContent(content)) dataItem.accessor = this.createAccessor(content)
            else dataItem.value = content
        }

        if (typeHint !== undefined) dataItem.typeHint = this.createTypeHint(typeHint)

        return dataItem
    }

    createNode (): ISdtfWriteableNode {
        return new SdtfWriteableNode()
    }

    createTypeHint (name?: SdtfTypeHintName | string): ISdtfWriteableTypeHint {
        const typeHint = new SdtfWriteableTypeHint()
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
