import {
    ISdDtfAccessor,
    ISdDtfAttributes,
    ISdDtfBuffer,
    ISdDtfBufferView,
    ISdDtfChunk,
    ISdDtfDataItem,
    ISdDtfFileInfo,
    ISdDtfNode,
    ISdDtfTypeHint,
    SdDtfError,
} from "@shapediver/sdk.sdtf-core"
import { ISdDtfBufferCache } from "../buffer_cache/ISdDtfBufferCache"
import { SdDtfAccessor } from "../components/SdDtfAccessor"
import { SdDtfAttribute, SdDtfAttributes } from "../components/SdDtfAttributes"
import { SdDtfBuffer } from "../components/SdDtfBuffer"
import { SdDtfBufferView } from "../components/SdDtfBufferView"
import { SdDtfDataItem } from "../components/SdDtfDataItem"
import { SdDtfFileInfo } from "../components/SdDtfFileInfo"
import { SdDtfNode } from "../components/SdDtfNode"
import { SdDtfTypeHint } from "../components/SdDtfTypeHint"
import { isDataObject, isNil, isNonEmptyString, isUint, isUintArray } from "../typeGuards"
import { ISdDtfComponentFactory } from "./ISdDtfComponentFactory"

export class SdDtfComponentFactory implements ISdDtfComponentFactory {

    createAccessor (accessorData: Record<string, unknown>, bufferViews: ISdDtfBufferView[]): ISdDtfAccessor {
        // Validate required properties
        if (!isUint(accessorData.bufferView)) throw new SdDtfError("Invalid accessor data: Required property 'bufferView' must be an unsigned integer.")
        if (Number(accessorData.bufferView) >= bufferViews.length) throw new SdDtfError("Invalid accessor data: Buffer view index is out of range.")

        // Instantiate object
        const accessor = new SdDtfAccessor(bufferViews[Number(accessorData.bufferView)])

        // Add additional properties
        Object
            .entries(accessorData)
            .filter(([ k, _ ]) => k !== "bufferView")
            .forEach(([ k, v ]) => accessor[k] = v)

        // Validate optional properties
        if (!isNil(accessorData.id)) {
            if (typeof accessorData.id !== "string") throw new SdDtfError("Invalid accessor data: Optional property 'id' must be a string.")
            accessor.id = accessorData.id
        }

        return accessor
    }

    createAttribute (attributeData: Record<string, unknown>, accessors: ISdDtfAccessor[], typeHints: ISdDtfTypeHint[]): ISdDtfAttributes {
        const attributes = new SdDtfAttributes()

        // Validate and set individual attributes
        Object
            .entries(attributeData)
            .forEach(([ name, data ], i) => {
                if (!isDataObject(data)) throw new SdDtfError(`Invalid attribute at [${ i }]: Item must be an object.`)

                const attribute = new SdDtfAttribute()

                // Value is not validated
                attribute.value = data.value

                // Validate optional properties
                if (!isNil(data.accessor)) {
                    if (!isUint(data.accessor)) throw new SdDtfError("Invalid attribute data: Optional property 'accessor' must be an unsigned integer.")
                    if (Number(data.accessor) >= accessors.length) throw new SdDtfError("Invalid attribute data: Accessor index is out of range.")
                    attribute.accessor = accessors[Number(data.accessor)]
                }
                if (!isNil(data.typeHint)) {
                    if (!isUint(data.typeHint)) throw new SdDtfError("Invalid attribute data: Optional property 'typeHint' must be an unsigned integer.")
                    if (Number(data.typeHint) >= typeHints.length) throw new SdDtfError("Invalid attribute data: Type hint index is out of range.")
                    attribute.typeHint = typeHints[Number(data.typeHint)]
                }

                // No additional properties are allowed
                if (Object.keys(data).filter(name => name !== "accessor" && name !== "typeHint" && name !== "value").length !== 0)
                    throw new SdDtfError("Invalid attribute data: Unspecified properties are not allowed.")

                attributes[name] = attribute
            })

        return attributes
    }

    createBuffer (bufferData: Record<string, unknown>, bufferCache: ISdDtfBufferCache): ISdDtfBuffer {
        // Validate required properties
        if (!isUint(bufferData.byteLength)) throw new SdDtfError("Invalid buffer data: Required property 'byteLength' must be an unsigned integer.")

        // Instantiate object
        const buffer = new SdDtfBuffer(Number(bufferData.byteLength), bufferCache)

        // Add additional properties
        Object
            .entries(bufferData)
            .filter(([ k, _ ]) => k !== "byteLength")
            .forEach(([ k, v ]) => buffer[k] = v)

        // Validate optional properties
        if (!isNil(bufferData.uri)) {
            if (typeof bufferData.uri !== "string") throw new SdDtfError("Invalid buffer data: Optional property 'uri' must be a string.")
            buffer.uri = bufferData.uri
        }

        return buffer
    }

    createBufferView (bufferViewData: Record<string, unknown>, buffers: ISdDtfBuffer[]): ISdDtfBufferView {
        // Validate required properties
        if (!isUint(bufferViewData.buffer)) throw new SdDtfError("Invalid buffer view data: Required property 'buffer' must be an unsigned integer.")
        if (Number(bufferViewData.buffer) >= buffers.length) throw new SdDtfError("Invalid buffer view data: Buffer index is out of range.")
        if (!isUint(bufferViewData.byteLength)) throw new SdDtfError("Invalid buffer view data: Required property 'byteLength' must be an unsigned integer.")
        if (!isUint(bufferViewData.byteOffset)) throw new SdDtfError("Invalid buffer view data: Required property 'byteOffset' must be an unsigned integer.")
        if (!isNonEmptyString(bufferViewData.contentType)) throw new SdDtfError("Invalid buffer view data: Required property 'contentType' must be a non-empty string.")

        // Instantiate object
        const bufferView = new SdDtfBufferView(
            buffers[Number(bufferViewData.buffer)],
            Number(bufferViewData.byteLength),
            Number(bufferViewData.byteOffset),
            bufferViewData.contentType,
        )

        // Add additional properties
        Object
            .entries(bufferViewData)
            .filter(([ k, _ ]) => k !== "buffer" && k !== "byteLength" && k !== "byteOffset" && k !== "contentType")
            .forEach(([ k, v ]) => bufferView[k] = v)

        // Validate optional properties
        if (!isNil(bufferViewData.contentEncoding)) {
            if (typeof bufferViewData.contentEncoding !== "string") throw new SdDtfError("Invalid buffer view data: Optional property 'contentEncoding' must be a string.")
            bufferView.contentEncoding = bufferViewData.contentEncoding
        }
        if (!isNil(bufferViewData.name)) {
            if (typeof bufferViewData.name !== "string") throw new SdDtfError("Invalid buffer view data: Optional property 'name' must be a string.")
            bufferView.name = bufferViewData.name
        }

        return bufferView
    }

    createChunk (chunkData: Record<string, unknown>, attributes: ISdDtfAttributes[], dataItems: ISdDtfDataItem[], nodes: ISdDtfNode[], typeHints: ISdDtfTypeHint[]): ISdDtfChunk {
        // Validate required properties
        if (typeof chunkData.name !== "string") throw new SdDtfError("Invalid chunk data: Required property 'name' must be a string.")

        // Instantiate object
        const chunk = this.createNode(chunkData, attributes, dataItems, typeHints)

        // Validate optional properties
        if (!isNil(chunkData.nodes)) {
            if (!isUintArray(chunkData.nodes)) throw new SdDtfError("Invalid chunk data: Optional property 'nodes' must be an array of unsigned integers.")
            if (chunkData.nodes.some(i => Number(i) >= dataItems.length)) throw new SdDtfError("Invalid chunk data: Node index is out of range.")
            chunkData.nodes.forEach(i => chunk.nodes.push(nodes[Number(i)]))
        }

        return chunk
    }

    createDataItem (dataItemData: Record<string, unknown>, accessors: ISdDtfAccessor[], attributes: ISdDtfAttributes[], typeHints: ISdDtfTypeHint[]): ISdDtfDataItem {
        // Instantiate object
        const dataItem = new SdDtfDataItem()

        // Add additional properties
        Object
            .entries(dataItemData)
            .forEach(([ k, v ]) => dataItem[k] = v)

        // Value is not validated
        dataItem.value = dataItemData.value

        // Validate optional properties
        if (!isNil(dataItemData.accessor)) {
            if (!isUint(dataItemData.accessor)) throw new SdDtfError("Invalid data item data: Optional property 'accessor' must be an unsigned integer.")
            if (Number(dataItemData.accessor) >= accessors.length) throw new SdDtfError("Invalid data item data: Accessor index is out of range.")
            dataItem.accessor = accessors[Number(dataItemData.accessor)]
        }
        if (!isNil(dataItemData.attributes)) {
            if (!isUint(dataItemData.attributes)) throw new SdDtfError("Invalid data item data: Optional property 'attributes' must be an unsigned integer.")
            if (Number(dataItemData.attributes) >= attributes.length) throw new SdDtfError("Invalid data item data: Attributes index is out of range.")
            dataItem.attributes = attributes[Number(dataItemData.attributes)]
        }
        if (!isNil(dataItemData.typeHint)) {
            if (!isUint(dataItemData.typeHint)) throw new SdDtfError("Invalid data item data: Optional property 'typeHint' must be an unsigned integer.")
            if (Number(dataItemData.typeHint) >= typeHints.length) throw new SdDtfError("Invalid data item data: Type hint index is out of range.")
            dataItem.typeHint = typeHints[Number(dataItemData.typeHint)]
        }

        return dataItem
    }

    createFileInfo (fileInfoData: Record<string, unknown>): ISdDtfFileInfo {
        // Validate required properties
        if (!isNonEmptyString(fileInfoData.version)) throw new SdDtfError("Invalid file info data: Required property 'version' must be a non-empty string.")

        // Instantiate object
        const fileInfo = new SdDtfFileInfo(fileInfoData.version)

        // Add additional properties
        Object
            .entries(fileInfoData)
            .filter(([ k, _ ]) => k !== "name")
            .forEach(([ k, v ]) => fileInfo[k] = v)

        // Validate optional properties
        if (!isNil(fileInfoData.copyright)) {
            if (typeof fileInfoData.copyright !== "string") throw new SdDtfError("Invalid file info data: Optional property 'copyright' must be a string.")
            fileInfo.copyright = fileInfoData.copyright
        }
        if (!isNil(fileInfoData.generator)) {
            if (typeof fileInfoData.generator !== "string") throw new SdDtfError("Invalid file info data: Optional property 'generator' must be a string.")
            fileInfo.generator = fileInfoData.generator
        }

        return fileInfo
    }

    createNode (nodeData: Record<string, unknown>, attributes: ISdDtfAttributes[], dataItems: ISdDtfDataItem[], typeHints: ISdDtfTypeHint[]): ISdDtfNode {
        // Instantiate object
        const node = new SdDtfNode()

        // Add additional properties
        Object
            .entries(nodeData)
            .filter(([ k, _ ]) => k !== "items" && k !== "nodes")
            .forEach(([ k, v ]) => node[k] = v)

        // Validate optional properties
        if (!isNil(nodeData.attributes)) {
            if (!isUint(nodeData.attributes)) throw new SdDtfError("Invalid node data: Optional property 'attributes' must be an unsigned integer.")
            if (Number(nodeData.attributes) >= attributes.length) throw new SdDtfError("Invalid node data: Attributes index is out of range.")
            node.attributes = attributes[Number(nodeData.attributes)]
        }
        if (!isNil(nodeData.items)) {
            if (!isUintArray(nodeData.items)) throw new SdDtfError("Invalid node data: Optional property 'items' must be an array of unsigned integers.")
            if (nodeData.items.some(i => Number(i) >= dataItems.length)) throw new SdDtfError("Invalid node data: Data item index is out of range.")
            nodeData.items.forEach(i => node.items.push(dataItems[Number(i)]))
        }
        if (!isNil(nodeData.name)) {
            if (typeof nodeData.name !== "string") throw new SdDtfError("Invalid node data: Optional property 'name' must be a string.")
            node.name = nodeData.name
        }
        if (!isNil(nodeData.typeHint)) {
            if (!isUint(nodeData.typeHint)) throw new SdDtfError("Invalid node data: Optional property 'typeHint' must be an unsigned integer.")
            if (Number(nodeData.typeHint) >= typeHints.length) throw new SdDtfError("Invalid node data: Type hint index is out of range.")
            node.typeHint = typeHints[Number(nodeData.typeHint)]
        }

        return node
    }

    createTypeHint (typeHintData: Record<string, unknown>): ISdDtfTypeHint {
        // Validate required properties
        if (!isNonEmptyString(typeHintData.name)) throw new SdDtfError("Invalid type hint data: Required property 'name' must be a non-empty string.")

        // Instantiate object
        const typeHint = new SdDtfTypeHint(typeHintData.name)

        // Add additional properties
        Object
            .entries(typeHintData)
            .filter(([ k, _ ]) => k !== "name")
            .forEach(([ k, v ]) => typeHint[k] = v)

        return typeHint
    }

    setNodeReferences (nodeData: Record<string, unknown>[], nodes: ISdDtfNode[]): void {
        // Sanity check
        if (nodeData.length !== nodes.length) throw new SdDtfError("Internal parser error: Invalid combination of node data and node instances.")

        nodeData.forEach((data, index) => {
            // Pick the respective node instance for this data item
            const node = nodes[index]

            // Validate optional node property and set references
            if (!isNil(data.nodes)) {
                if (!isUintArray(data.nodes)) throw new SdDtfError("Invalid node data: Optional property 'nodes' must be an array of unsigned integers.")
                if (data.nodes.some(i => Number(i) >= nodes.length)) throw new SdDtfError("Invalid node data: Node index is out of range.")
                if (data.nodes.some(i => i === index)) throw new SdDtfError("Invalid node data: A node cannot reference itself.")
                data.nodes.forEach(i => node.nodes.push(nodes[Number(i)]))
            }
        })
    }

}
