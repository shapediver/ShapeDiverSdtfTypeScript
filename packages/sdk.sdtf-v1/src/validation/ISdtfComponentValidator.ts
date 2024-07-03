import {
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
} from '@shapediver/sdk.sdtf-core';

/** Validates a partial component and ensures that its content corresponds to the sdTF v1 specification. */
export interface ISdtfComponentValidator {
    /**
     * Validates the partial accessor against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateAccessor(accessor: Partial<ISdtfAccessor>): asserts accessor is ISdtfAccessor;

    /**
     * Validates the partial accessor instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateAsset(asset: Partial<ISdtfAsset>): asserts asset is ISdtfAsset;

    /**
     * Validates the partial attributes instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateAttributes(
        attributes: Partial<ISdtfAttributes>
    ): asserts attributes is ISdtfAttributes;

    /**
     * Validates the partial buffer instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateBuffer(buffer: Partial<ISdtfBuffer>): asserts buffer is ISdtfBuffer;

    /**
     * Validates the partial buffer view instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateBufferView(
        bufferView: Partial<ISdtfBufferView>
    ): asserts bufferView is ISdtfBufferView;

    /**
     * Validates the partial chunk instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateChunk(chunk: Partial<ISdtfChunk>): asserts chunk is ISdtfChunk;

    /**
     * Validates the partial data-item instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateDataItem(dataItem: Partial<ISdtfDataItem>): asserts dataItem is ISdtfDataItem;

    /**
     * Validates the partial file-info instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateFileInfo(fileInfo: Partial<ISdtfFileInfo>): asserts fileInfo is ISdtfFileInfo;

    /**
     * Validates the partial node instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateNode(node: Partial<ISdtfNode>): asserts node is ISdtfNode;

    /**
     * Validates the partial type-hint instance against the sdTF v1 specification.
     * @throws {@link SdtfError}
     */
    validateTypeHint(typeHint: Partial<ISdtfTypeHint>): asserts typeHint is ISdtfTypeHint;
}
