import {
    ISdDtfAccessor,
    ISdDtfAsset,
    ISdDtfAttribute,
    ISdDtfAttributes,
    ISdDtfBuffer,
    ISdDtfBufferView,
    ISdDtfChunk,
    ISdDtfDataItem,
    ISdDtfFileInfo,
    ISdDtfNode,
    ISdDtfTypeHint,
    isNonEmptyString,
    isUint,
    isUintArray,
    SdDtfError,
} from "@shapediver/sdk.sdtf-core"
import { ISdDtfPartialComponentList } from "../structure/ISdDtfComponentList"
import { ISdDtfComponentValidator } from "./ISdDtfComponentValidator"

export class SdDtfComponentValidator implements ISdDtfComponentValidator {

    constructor (private componentList: ISdDtfPartialComponentList) {
    }

    validateAccessor (accessor: Partial<ISdDtfAccessor>): asserts accessor is ISdDtfAccessor {
        // Validate required properties
        if (!isUint(accessor.bufferView))
            throw new SdDtfError("Invalid accessor: Required property 'bufferView' must be an unsigned integer.")

        // Validate component references
        if (accessor.bufferView >= this.componentList.bufferViews.length)
            throw new SdDtfError("Invalid accessor: Buffer view index is out of range.")
    }

    validateAsset (asset: Partial<ISdDtfAsset>): asserts asset is ISdDtfAsset {
        // Validate required properties
        if (!isUint(asset.fileInfo))
            throw new SdDtfError("Invalid asset: Required property 'fileInfo' must be an unsigned integer.")

        // Validate component references
        if (asset.fileInfo !== 0)    // There can only be one file info object
            throw new SdDtfError("Invalid asset: Type hint index is out of range.")
    }

    validateAttributes (attributes: Partial<ISdDtfAttributes>): asserts attributes is ISdDtfAttributes {
        if (!attributes.entries)
            throw new SdDtfError("Invalid attributes: Required property 'entries' must be a string-keyed object.")

        Object.values(attributes.entries)
            .forEach((attribute: Partial<ISdDtfAttribute>) => {
                // Validate optional properties
                if (attribute.accessor && !isUint(attribute.accessor)) {
                    throw new SdDtfError("Invalid attribute: Optional property 'accessor' must be an unsigned integer.")
                }
                if (attribute.typeHint && !isUint(attribute.typeHint))
                    throw new SdDtfError("Invalid attribute: Optional property 'typeHint' must be an unsigned integer.")

                // Validate component references
                if (attribute.accessor && attribute.accessor >= this.componentList.accessors.length)
                    throw new SdDtfError("Invalid attribute: Accessor index is out of range.")
                if (attribute.typeHint && attribute.typeHint >= this.componentList.typeHints.length)
                    throw new SdDtfError("Invalid attribute: Type hint index is out of range.")
            })
    }

    validateBuffer (buffer: Partial<ISdDtfBuffer>): asserts buffer is ISdDtfBuffer {
        // Validate required properties
        if (!isUint(buffer.byteLength))
            throw new SdDtfError("Invalid buffer: Required property 'byteLength' must be an unsigned integer.")
    }

    validateBufferView (bufferView: Partial<ISdDtfBufferView>): asserts bufferView is ISdDtfBufferView {
        // Validate required properties
        if (!isUint(bufferView.buffer))
            throw new SdDtfError("Invalid buffer view: Required property 'buffer' must be an unsigned integer.")
        if (!isUint(bufferView.byteLength))
            throw new SdDtfError("Invalid buffer view: Required property 'byteLength' must be an unsigned integer.")
        if (!isUint(bufferView.byteOffset))
            throw new SdDtfError("Invalid buffer view: Required property 'byteOffset' must be an unsigned integer.")
        if (!isNonEmptyString(bufferView.contentType))
            throw new SdDtfError("Invalid buffer view: Required property 'contentType' must be a non-empty string.")

        // Validate component references
        if (bufferView.buffer >= this.componentList.buffers.length)
            throw new SdDtfError("Invalid buffer view: Buffer index is out of range.")
    }

    validateChunk (chunk: Partial<ISdDtfChunk>): asserts chunk is ISdDtfChunk {
        try {
            this.validateChunkOrNode(chunk)
        } catch (e) {
            throw new SdDtfError(`Invalid chunk: ${ e.message }`)
        }

        // Validate required properties
        if (typeof chunk.name !== "string")
            throw new SdDtfError("Invalid chunk: Required property 'name' must be a string.")
    }

    validateDataItem (dataItem: Partial<ISdDtfDataItem>): asserts dataItem is ISdDtfDataItem {
        // Validate optional properties
        if (dataItem.accessor && !isUint(dataItem.accessor))
            throw new SdDtfError("Invalid item: Optional property 'accessor' must be an unsigned integer.")
        if (dataItem.attributes && !isUint(dataItem.attributes))
            throw new SdDtfError("Invalid item: Optional property 'attributes' must be an unsigned integer.")
        if (dataItem.typeHint && !isUint(dataItem.typeHint))
            throw new SdDtfError("Invalid item: Optional property 'typeHint' must be an unsigned integer.")

        // Validate component references
        if (dataItem.accessor && dataItem.accessor >= this.componentList.accessors.length)
            throw new SdDtfError("Invalid item: Accessor index is out of range.")
        if (dataItem.attributes && dataItem.attributes >= this.componentList.attributes.length)
            throw new SdDtfError("Invalid item: Attributes index is out of range.")
        if (dataItem.typeHint && dataItem.typeHint >= this.componentList.typeHints.length)
            throw new SdDtfError("Invalid item: Type hint index is out of range.")
    }

    validateFileInfo (fileInfo: Partial<ISdDtfFileInfo>): asserts fileInfo is ISdDtfFileInfo {
        // Validate required properties
        if (!isNonEmptyString(fileInfo.version))
            throw new SdDtfError("Invalid file info: Required property 'version' must be a non-empty string.")
    }

    validateNode (node: Partial<ISdDtfNode>): asserts node is ISdDtfNode {
        try {
            this.validateChunkOrNode(node)
        } catch (e) {
            throw new SdDtfError(`Invalid node: ${ e.message }`)
        }
    }

    validateTypeHint (typeHint: Partial<ISdDtfTypeHint>): asserts typeHint is ISdDtfTypeHint {
        // Validate required properties
        if (!isNonEmptyString(typeHint.name))
            throw new SdDtfError("Invalid type hint: Required property 'name' must be a non-empty string.")
    }

    /**
     * Validates sdTF node objects.
     * Thrown error messages have no prefix text to make them usable for chunk and nodes validation.
     * @private
     * @throws {@link SdDtfError} when the component is invalid.
     */
    validateChunkOrNode (chunkOrNode: Partial<ISdDtfNode>): void {
        // Validate optional properties
        if (chunkOrNode.attributes && !isUint(chunkOrNode.attributes))
            throw new SdDtfError("Optional property 'attributes' must be an unsigned integer.")
        if (!isUintArray(chunkOrNode.items))
            throw new SdDtfError("Required property 'items' must be an array of unsigned integers.")
        if (!isUintArray(chunkOrNode.nodes))
            throw new SdDtfError("Required property 'nodes' must be an array of unsigned integers.")
        if (chunkOrNode.typeHint && !isUint(chunkOrNode.typeHint))
            throw new SdDtfError("Optional property 'typeHint' must be an unsigned integer.")

        // Validate component references
        if (chunkOrNode.attributes && chunkOrNode.attributes >= this.componentList.attributes.length)
            throw new SdDtfError("Attributes index is out of range.")
        chunkOrNode.items.forEach(itemIndex => {
            if (itemIndex >= this.componentList.items.length)
                throw new SdDtfError(`Node index '${ itemIndex }' is out of range.`)
        })
        chunkOrNode.nodes.forEach(nodeIndex => {
            if (nodeIndex >= this.componentList.nodes.length)
                throw new SdDtfError(`Node index '${ nodeIndex }' is out of range.`)
        })
        if (chunkOrNode.typeHint && chunkOrNode.typeHint >= this.componentList.typeHints.length)
            throw new SdDtfError("Type hint index is out of range.")

        // Prevent self-referencing nodes
        if (!chunkOrNode.nodes.every(nodePos => this.componentList.nodes[nodePos].componentId !== chunkOrNode.componentId))
            throw new SdDtfError("Node is referencing itself in the 'nodes' property.")
    }

}
