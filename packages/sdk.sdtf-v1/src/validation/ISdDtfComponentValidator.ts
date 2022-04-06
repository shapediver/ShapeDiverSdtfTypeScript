import {
    ISdDtfAccessor,
    ISdDtfAsset,
    ISdDtfAttributes,
    ISdDtfBuffer,
    ISdDtfBufferView,
    ISdDtfChunk,
    ISdDtfDataItem,
    ISdDtfFileInfo,
    ISdDtfNode,
    ISdDtfTypeHint,
} from "@shapediver/sdk.sdtf-core"

/** Validates a partial component and ensures that its content corresponds to the sdTF v1 specification. */
export interface ISdDtfComponentValidator {

    /**
     * Validates the partial accessor against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateAccessor (accessor: Partial<ISdDtfAccessor>): asserts accessor is ISdDtfAccessor

    /**
     * Validates the partial accessor instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateAsset (asset: Partial<ISdDtfAsset>): asserts asset is ISdDtfAsset

    /**
     * Validates the partial attributes instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateAttributes (attributes: Partial<ISdDtfAttributes>): asserts attributes is ISdDtfAttributes

    /**
     * Validates the partial buffer instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateBuffer (buffer: Partial<ISdDtfBuffer>): asserts buffer is ISdDtfBuffer

    /**
     * Validates the partial buffer view instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateBufferView (bufferView: Partial<ISdDtfBufferView>): asserts bufferView is ISdDtfBufferView

    /**
     * Validates the partial chunk instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateChunk (chunk: Partial<ISdDtfChunk>): asserts chunk is ISdDtfChunk

    /**
     * Validates the partial data-item instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateDataItem (dataItem: Partial<ISdDtfDataItem>): asserts dataItem is ISdDtfDataItem

    /**
     * Validates the partial file-info instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateFileInfo (fileInfo: Partial<ISdDtfFileInfo>): asserts fileInfo is ISdDtfFileInfo

    /**
     * Validates the partial node instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateNode (node: Partial<ISdDtfNode>): asserts node is ISdDtfNode

    /**
     * Validates the partial type-hint instance against the sdTF v1 specification.
     * @throws {@link SdDtfError}
     */
    validateTypeHint (typeHint: Partial<ISdDtfTypeHint>): asserts typeHint is ISdDtfTypeHint

}
