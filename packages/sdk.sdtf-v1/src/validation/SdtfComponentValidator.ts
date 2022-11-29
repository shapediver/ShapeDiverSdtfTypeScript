import {
    ISdtfAccessor,
    ISdtfAsset,
    ISdtfAttribute,
    ISdtfAttributes,
    ISdtfBuffer,
    ISdtfBufferView,
    ISdtfChunk,
    ISdtfDataItem,
    ISdtfFileInfo,
    ISdtfNode,
    ISdtfTypeHint,
    isNonEmptyString,
    isUint,
    isUintArray,
    SdtfError,
} from "@shapediver/sdk.sdtf-core"
import { ISdtfPartialComponentList } from "../structure/ISdtfComponentList"
import { ISdtfComponentValidator } from "./ISdtfComponentValidator"

export class SdtfComponentValidator implements ISdtfComponentValidator {

    constructor (private componentList: ISdtfPartialComponentList) {
    }

    validateAccessor (accessor: Partial<ISdtfAccessor>): asserts accessor is ISdtfAccessor {
        // Validate required properties
        if (!isUint(accessor.bufferView))
            throw new SdtfError("Invalid accessor: Required property 'bufferView' must be an unsigned integer.")

        // Validate component references
        if (accessor.bufferView >= this.componentList.bufferViews.length)
            throw new SdtfError("Invalid accessor: Buffer view index is out of range.")
    }

    validateAsset (asset: Partial<ISdtfAsset>): asserts asset is ISdtfAsset {
        // Validate required properties
        if (!isUint(asset.fileInfo))
            throw new SdtfError("Invalid asset: Required property 'fileInfo' must be an unsigned integer.")

        // Validate component references
        if (asset.fileInfo !== 0)    // There can only be one file info object
            throw new SdtfError("Invalid asset: Type hint index is out of range.")
    }

    validateAttributes (attributes: Partial<ISdtfAttributes>): asserts attributes is ISdtfAttributes {
        if (!attributes.entries)
            throw new SdtfError("Invalid attributes: Required property 'entries' must be a string-keyed object.")

        Object.values(attributes.entries)
            .forEach((attribute: Partial<ISdtfAttribute>) => {
                // Validate required properties
                if (!isUint(attribute.typeHint))
                    throw new SdtfError("Invalid attribute: Required property 'typeHint' must be an unsigned integer.")

                // Validate optional properties
                if (attribute.accessor && !isUint(attribute.accessor))
                    throw new SdtfError("Invalid attribute: Optional property 'accessor' must be an unsigned integer.")

                // Validate component references
                if (attribute.accessor && attribute.accessor >= this.componentList.accessors.length)
                    throw new SdtfError("Invalid attribute: Accessor index is out of range.")
                if (attribute.typeHint && attribute.typeHint >= this.componentList.typeHints.length)
                    throw new SdtfError("Invalid attribute: Type hint index is out of range.")
            })
    }

    validateBuffer (buffer: Partial<ISdtfBuffer>): asserts buffer is ISdtfBuffer {
        // Validate required properties
        if (!isUint(buffer.byteLength))
            throw new SdtfError("Invalid buffer: Required property 'byteLength' must be an unsigned integer.")
    }

    validateBufferView (bufferView: Partial<ISdtfBufferView>): asserts bufferView is ISdtfBufferView {
        // Validate required properties
        if (!isUint(bufferView.buffer))
            throw new SdtfError("Invalid buffer view: Required property 'buffer' must be an unsigned integer.")
        if (!isUint(bufferView.byteLength))
            throw new SdtfError("Invalid buffer view: Required property 'byteLength' must be an unsigned integer.")
        if (!isUint(bufferView.byteOffset))
            throw new SdtfError("Invalid buffer view: Required property 'byteOffset' must be an unsigned integer.")
        if (!isNonEmptyString(bufferView.contentType))
            throw new SdtfError("Invalid buffer view: Required property 'contentType' must be a non-empty string.")

        // Validate component references
        if (bufferView.buffer >= this.componentList.buffers.length)
            throw new SdtfError("Invalid buffer view: Buffer index is out of range.")
    }

    validateChunk (chunk: Partial<ISdtfChunk>): asserts chunk is ISdtfChunk {
        try {
            this.validateChunkOrNode(chunk)
        } catch (e) {
            throw new SdtfError(`Invalid chunk: ${ e.message }`)
        }

        // Validate required properties
        if (typeof chunk.name !== "string")
            throw new SdtfError("Invalid chunk: Required property 'name' must be a string.")
    }

    validateDataItem (dataItem: Partial<ISdtfDataItem>): asserts dataItem is ISdtfDataItem {
        // Validate required properties
        if (!isUint(dataItem.typeHint))
            throw new SdtfError("Invalid item: Required property 'typeHint' must be an unsigned integer.")

        // Validate optional properties
        if (dataItem.accessor && !isUint(dataItem.accessor))
            throw new SdtfError("Invalid item: Optional property 'accessor' must be an unsigned integer.")
        if (dataItem.attributes && !isUint(dataItem.attributes))
            throw new SdtfError("Invalid item: Optional property 'attributes' must be an unsigned integer.")

        // Validate component references
        if (dataItem.accessor && dataItem.accessor >= this.componentList.accessors.length)
            throw new SdtfError("Invalid item: Accessor index is out of range.")
        if (dataItem.attributes && dataItem.attributes >= this.componentList.attributes.length)
            throw new SdtfError("Invalid item: Attributes index is out of range.")
        if (dataItem.typeHint && dataItem.typeHint >= this.componentList.typeHints.length)
            throw new SdtfError("Invalid item: Type hint index is out of range.")
    }

    validateFileInfo (fileInfo: Partial<ISdtfFileInfo>): asserts fileInfo is ISdtfFileInfo {
        // Validate required properties
        if (!isNonEmptyString(fileInfo.version))
            throw new SdtfError("Invalid file info: Required property 'version' must be a non-empty string.")
    }

    validateNode (node: Partial<ISdtfNode>): asserts node is ISdtfNode {
        try {
            this.validateChunkOrNode(node)
        } catch (e) {
            throw new SdtfError(`Invalid node: ${ e.message }`)
        }
    }

    validateTypeHint (typeHint: Partial<ISdtfTypeHint>): asserts typeHint is ISdtfTypeHint {
        // Validate required properties
        if (!isNonEmptyString(typeHint.name))
            throw new SdtfError("Invalid type hint: Required property 'name' must be a non-empty string.")
    }

    /**
     * Validates sdTF node objects.
     * Thrown error messages have no prefix text to make them usable for chunk and nodes validation.
     * @private
     * @throws {@link SdtfError} when the component is invalid.
     */
    validateChunkOrNode (chunkOrNode: Partial<ISdtfNode>): void {
        // Validate optional properties
        if (chunkOrNode.attributes && !isUint(chunkOrNode.attributes))
            throw new SdtfError("Optional property 'attributes' must be an unsigned integer.")
        if (!isUintArray(chunkOrNode.items))
            throw new SdtfError("Required property 'items' must be an array of unsigned integers.")
        if (!isUintArray(chunkOrNode.nodes))
            throw new SdtfError("Required property 'nodes' must be an array of unsigned integers.")
        if (chunkOrNode.typeHint && !isUint(chunkOrNode.typeHint))
            throw new SdtfError("Optional property 'typeHint' must be an unsigned integer.")

        // Validate component references
        if (chunkOrNode.attributes && chunkOrNode.attributes >= this.componentList.attributes.length)
            throw new SdtfError("Attributes index is out of range.")
        chunkOrNode.items.forEach(itemIndex => {
            if (itemIndex >= this.componentList.items.length)
                throw new SdtfError(`Node index '${ itemIndex }' is out of range.`)
        })
        chunkOrNode.nodes.forEach(nodeIndex => {
            if (nodeIndex >= this.componentList.nodes.length)
                throw new SdtfError(`Node index '${ nodeIndex }' is out of range.`)
        })
        if (chunkOrNode.typeHint && chunkOrNode.typeHint >= this.componentList.typeHints.length)
            throw new SdtfError("Type hint index is out of range.")

        // Prevent self-referencing nodes
        if (!chunkOrNode.nodes.every(nodePos => this.componentList.nodes[nodePos].componentId !== chunkOrNode.componentId))
            throw new SdtfError("Node is referencing itself in the 'nodes' property.")
    }

}
