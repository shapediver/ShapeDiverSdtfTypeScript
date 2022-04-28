import {
    isDataObject,
    ISdtfAccessor,
    ISdtfAsset,
    ISdtfAttributes,
    ISdtfBuffer,
    ISdtfBufferView,
    ISdtfChunk,
    ISdtfDataItem,
    ISdtfFileInfo,
    ISdtfNode,
    ISdtfTypeHint,
    isNumber,
    isNumberArray,
    SdtfError,
} from "@shapediver/sdk.sdtf-core"
import { SdtfPartialAccessor } from "./components/SdtfPartialAccessor"
import { SdtfPartialAsset } from "./components/SdtfPartialAsset"
import { SdtfAttribute, SdtfPartialAttributes } from "./components/SdtfPartialAttributes"
import { SdtfPartialBuffer } from "./components/SdtfPartialBuffer"
import { SdtfPartialBufferView } from "./components/SdtfPartialBufferView"
import { SdtfPartialDataItem } from "./components/SdtfPartialDataItem"
import { SdtfPartialFileInfo } from "./components/SdtfPartialFileInfo"
import { SdtfPartialNode } from "./components/SdtfPartialNode"
import { SdtfPartialTypeHint } from "./components/SdtfPartialTypeHint"
import { ISdtfComponentFactory } from "./ISdtfComponentFactory"

export class SdtfComponentFactory implements ISdtfComponentFactory {

    readonly propertyNameAccessors = "accessors"
    readonly propertyNameAttributes = "attributes"
    readonly propertyNameBufferViews = "bufferViews"
    readonly propertyNameBuffers = "buffers"
    readonly propertyNameChunks = "chunks"
    readonly propertyNameDataItems = "items"
    readonly propertyNameFileInfo = "asset"
    readonly propertyNameFileInfoAlternative = "fileInfo"   // We might read from readable object as well
    readonly propertyNameNodes = "nodes"
    readonly propertyNameTypeHints = "typeHints"

    createAccessor (accessorData: Record<string, unknown>): Partial<ISdtfAccessor> {
        const accessor = new SdtfPartialAccessor()

        // Set properties of allowed types
        if (isNumber(accessorData.bufferView)) accessor.bufferView = accessorData.bufferView
        if (typeof accessorData.id === "string") accessor.id = accessorData.id

        // Add additional properties
        Object
            .entries(accessorData)
            .filter(([ k, _ ]) => k !== "bufferView" && k !== "id")
            .forEach(([ k, v ]) => accessor.additionalProperties[k] = v)

        return accessor
    }

    createAsset (assetData: Record<string, unknown>): Partial<ISdtfAsset> {
        const asset = new SdtfPartialAsset()

        // There can only be one file info object
        asset.fileInfo = 0

        // Add additional properties
        Object
            .entries(assetData)
            .filter(([ k, _ ]) =>
                k !== this.propertyNameAccessors &&
                k !== this.propertyNameAttributes &&
                k !== this.propertyNameBufferViews &&
                k !== this.propertyNameBuffers &&
                k !== this.propertyNameChunks &&
                k !== this.propertyNameDataItems &&
                k !== this.propertyNameFileInfo &&
                k !== this.propertyNameFileInfoAlternative &&
                k !== this.propertyNameNodes &&
                k !== this.propertyNameTypeHints)
            .forEach(([ k, v ]) => asset.additionalProperties[k] = v)

        return asset
    }

    createAttributes (attributesData: Record<string, unknown>): Partial<ISdtfAttributes> {
        const attributes = new SdtfPartialAttributes()

        // Instantiate individual attributes and set properties
        Object
            .entries(attributesData)
            .forEach(([ name, data ], i) => {
                if (!isDataObject(data)) throw new SdtfError(`Invalid attribute data: Item [${ i }] must be an object.`)

                const attribute = new SdtfAttribute()

                // Set properties of allowed types
                if (typeof data.accessor === "number") attribute.accessor = data.accessor
                if (typeof data.typeHint === "number") attribute.typeHint = data.typeHint
                attribute.value = data.value

                attributes.entries[name] = attribute
            })

        return attributes
    }

    createBuffer (bufferData: Record<string, unknown>): Partial<ISdtfBuffer> {
        const buffer = new SdtfPartialBuffer()

        // Set properties of allowed types
        if (isNumber(bufferData.byteLength)) buffer.byteLength = bufferData.byteLength
        if (typeof bufferData.uri === "string") buffer.uri = bufferData.uri

        // Add additional properties
        Object
            .entries(bufferData)
            .filter(([ k, _ ]) => k !== "byteLength" && k !== "uri")
            .forEach(([ k, v ]) => buffer.additionalProperties[k] = v)

        return buffer
    }

    createBufferView (bufferViewData: Record<string, unknown>): Partial<ISdtfBufferView> {
        const bufferView = new SdtfPartialBufferView()

        // Set properties of allowed types
        if (isNumber(bufferViewData.buffer)) bufferView.buffer = bufferViewData.buffer
        if (isNumber(bufferViewData.byteLength)) bufferView.byteLength = bufferViewData.byteLength
        if (isNumber(bufferViewData.byteOffset)) bufferView.byteOffset = bufferViewData.byteOffset
        if (typeof bufferViewData.contentEncoding === "string") bufferView.contentEncoding = bufferViewData.contentEncoding
        if (typeof bufferViewData.contentType === "string") bufferView.contentType = bufferViewData.contentType
        if (typeof bufferViewData.name === "string") bufferView.name = bufferViewData.name

        // Add additional properties
        Object
            .entries(bufferViewData)
            .filter(([ k, _ ]) => k !== "buffer" && k !== "byteLength" && k !== "byteOffset" && k !== "contentEncoding" && k !== "contentType" && k !== "name")
            .forEach(([ k, v ]) => bufferView.additionalProperties[k] = v)

        return bufferView
    }

    createChunk (chunkData: Record<string, unknown>): Partial<ISdtfChunk> {
        return this.createNode(chunkData)
    }

    createDataItem (dataItemData: Record<string, unknown>): Partial<ISdtfDataItem> {
        const dataItem = new SdtfPartialDataItem()

        // Set properties of allowed types
        if (isNumber(dataItemData.accessor)) dataItem.accessor = dataItemData.accessor
        if (isNumber(dataItemData.attributes)) dataItem.attributes = dataItemData.attributes
        if (isNumber(dataItemData.typeHint)) dataItem.typeHint = dataItemData.typeHint
        dataItem.value = dataItemData.value

        // Add additional properties
        Object
            .entries(dataItemData)
            .filter(([ k, _ ]) => k !== "accessor" && k !== "attributes" && k !== "typeHint" && k !== "value")
            .forEach(([ k, v ]) => dataItem.additionalProperties[k] = v)

        return dataItem
    }

    createFileInfo (fileInfoData: Record<string, unknown>): Partial<ISdtfFileInfo> {
        const fileInfo = new SdtfPartialFileInfo()

        // Set properties of allowed types
        if (typeof fileInfoData.copyright === "string") fileInfo.copyright = fileInfoData.copyright
        if (typeof fileInfoData.generator === "string") fileInfo.generator = fileInfoData.generator
        if (typeof fileInfoData.version === "string") fileInfo.version = fileInfoData.version

        // Add additional properties
        Object
            .entries(fileInfoData)
            .filter(([ k, _ ]) => k !== "copyright" && k !== "generator" && k !== "version")
            .forEach(([ k, v ]) => fileInfo.additionalProperties[k] = v)

        return fileInfo
    }

    createNode (nodeData: Record<string, unknown>): Partial<ISdtfNode> {
        const node = new SdtfPartialNode()

        // Set properties of allowed types
        if (isNumber(nodeData.attributes)) node.attributes = nodeData.attributes
        if (isNumberArray(nodeData.items)) node.items = nodeData.items
        if (typeof nodeData.name === "string") node.name = nodeData.name
        if (isNumberArray(nodeData.nodes)) node.nodes = nodeData.nodes
        if (isNumber(nodeData.typeHint)) node.typeHint = nodeData.typeHint

        // Add additional properties
        Object
            .entries(nodeData)
            .filter(([ k, _ ]) => k !== "attributes" && k !== "items" && k !== "name" && k !== "nodes" && k !== "typeHint")
            .forEach(([ k, v ]) => node.additionalProperties[k] = v)

        return node
    }

    createTypeHint (typeHintData: Record<string, unknown>): Partial<ISdtfTypeHint> {
        const typeHint = new SdtfPartialTypeHint()

        // Set properties of allowed types
        if (typeof typeHintData.name === "string") typeHint.name = typeHintData.name

        // Add additional properties
        Object
            .entries(typeHintData)
            .filter(([ k, _ ]) => k !== "name")
            .forEach(([ k, v ]) => typeHint.additionalProperties[k] = v)

        return typeHint
    }

}
