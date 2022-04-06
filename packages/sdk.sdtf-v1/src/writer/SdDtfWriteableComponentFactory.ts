import {
    ISdDtfWriteableAccessor,
    ISdDtfWriteableAsset,
    ISdDtfWriteableAttribute,
    ISdDtfWriteableAttributes,
    ISdDtfWriteableBuffer,
    ISdDtfWriteableBufferView,
    ISdDtfWriteableChunk,
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
import { ISdDtfWriteableComponentFactory } from "./ISdDtfWriteableComponentFactory"

export class SdDtfWriteableComponentFactory implements ISdDtfWriteableComponentFactory {

    readonly ASSET_VERSION = "1.0"
    readonly ASSET_GENERATOR = "ShapeDiverSdtfWriter"

    createAccessor (bufferData?: ArrayBuffer): ISdDtfWriteableAccessor {
        const accessor = new SdDtfWriteableAccessor()
        if (bufferData) accessor.bufferView = this.createBufferView(bufferData)
        return accessor
    }

    createAsset (): ISdDtfWriteableAsset {
        const fileInfo: ISdDtfWriteableFileInfo = new SdDtfWriteableFileInfo(this.ASSET_VERSION)
        fileInfo.generator = this.ASSET_GENERATOR

        return new SdDtfWriteableAsset(fileInfo)
    }

    createAttribute (value?: unknown, typeHint?: string): ISdDtfWriteableAttribute {
        const attribute = new SdDtfWriteableAttribute()
        attribute.value = value
        if (typeHint !== undefined) attribute.typeHint = this.createTypeHint(typeHint)
        return attribute
    }

    createAttributes (content?: Record<string, [ value: unknown, typeHint?: string ]>): ISdDtfWriteableAttributes {
        const attributes = new SdDtfWriteableAttributes()
        Object.entries(content ?? {}).forEach(([ name, attr ]) => attributes.entries[name] = this.createAttribute(...attr))
        return attributes
    }

    createBuffer (data?: ArrayBuffer): ISdDtfWriteableBuffer {
        const buffer = new SdDtfWriteableBuffer()
        buffer.data = data
        return buffer
    }

    createBufferView (bufferData?: ArrayBuffer): ISdDtfWriteableBufferView {
        const bufferView = new SdDtfWriteableBufferView()
        if (bufferData) bufferView.buffer = this.createBuffer(bufferData)
        return bufferView
    }

    createChunk (name?: string): ISdDtfWriteableChunk {
        const chunk = new SdDtfWriteableChunk()
        chunk.name = name
        return chunk
    }

    createDataItem (value?: unknown, typeHint?: string): ISdDtfWriteableDataItem {
        const dataItem = new SdDtfWriteableDataItem()
        dataItem.value = value
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

}
