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
} from "@shapediver/sdk.sdtf-core"

/**
 * Creates instances of individual sdTF components.
 * Replaces ID-references between components with object references.
 */
export interface ISdDtfComponentFactory {

    /**
     * Validates the given data object, instantiates a new sdTF accessor object and links references to other sdTF
     * components.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createAccessor (accessorData: Record<string, unknown>, bufferViews: ISdDtfBufferView[]): ISdDtfAccessor

    /**
     * Validates the given data object, instantiates a new sdTF attribute object and links references to other sdTF
     * components.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createAttribute (attributeData: Record<string, unknown>, accessors: ISdDtfAccessor[], typeHints: ISdDtfTypeHint[]): ISdDtfAttributes

    /**
     * Validates the given data object and instantiates a new sdTF buffer object.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createBuffer (bufferData: Record<string, unknown>): ISdDtfBuffer

    /**
     * Validates the given data object, instantiates a new sdTF buffer view object and links references to other sdTF
     * components.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createBufferView (bufferViewData: Record<string, unknown>, buffers: ISdDtfBuffer[]): ISdDtfBufferView

    /**
     * Validates the given data object, instantiates a new sdTF chunk object and links references to other sdTF
     * components.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createChunk (chunkData: Record<string, unknown>, attributes: ISdDtfAttributes[], dataItems: ISdDtfDataItem[], nodes: ISdDtfNode[], typeHints: ISdDtfTypeHint[]): ISdDtfChunk

    /**
     * Validates the given data object, instantiates a new sdTF data item object and links references to other sdTF
     * components.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createDataItem (dataItemData: Record<string, unknown>, accessors: ISdDtfAccessor[], attributes: ISdDtfAttributes[], typeHints: ISdDtfTypeHint[]): ISdDtfDataItem

    /**
     * Validates the given data object and instantiates a new sdTF file info object.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createFileInfo (fileInfoData: Record<string, unknown>): ISdDtfFileInfo

    /**
     * Validates the given data object, instantiates a new sdTF accessor object and links references to other sdTF
     * components.
     *
     * WARNING:
     * Nodes referencing other nodes are not processed here!
     * Run {@link setNodeReferences}(...) afterwards to solve this issue.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createNode (nodeData: Record<string, unknown>, attributes: ISdDtfAttributes[], dataItems: ISdDtfDataItem[], typeHints: ISdDtfTypeHint[]): ISdDtfNode

    /**
     * Validates the given data object and instantiates a new sdTF type hint object.
     * @throws {@link SdDtfError} when validation fails or references could not get linked.
     */
    createTypeHint (typeHintData: Record<string, unknown>): ISdDtfTypeHint

    /**
     * Links references between node components.
     *
     * Assumes {@link createNode}(...) has been executed for each `nodeData` item.
     * @throws {@link SdDtfError} when the `nodeData` and `nodes` have not the same number of items.
     */
    setNodeReferences(nodeData: Record<string, unknown>[], nodes: ISdDtfNode[]): void

}
