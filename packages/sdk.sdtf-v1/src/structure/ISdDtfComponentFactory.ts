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

/**
 * Creates instances of individual sdTF components.
 * The given data is analyzed for each component property and the respective data is only set when the TypeScript type
 * matches; otherwise the property is left `unknown`.
 * However, further validation must be executed later on to ensure correct values corresponding the sdTF specification.
 */
export interface ISdDtfComponentFactory {

    // @formatter:off
    readonly propertyNameAccessors: string
    readonly propertyNameAttributes: string
    readonly propertyNameBufferViews: string
    readonly propertyNameBuffers: string
    readonly propertyNameChunks: string
    readonly propertyNameDataItems: string
    readonly propertyNameFileInfo: string
    readonly propertyNameNodes: string
    readonly propertyNameTypeHints: string
    // @formatter:on

    /** Instantiates a new sdTF accessor object and sets the given data when the respective types are correct. */
    createAccessor (accessorData: Record<string, unknown>): Partial<ISdDtfAccessor>

    /** Instantiates a new sdTF asset object and sets the given data when the respective types are correct. */
    createAsset (assetData: Record<string, unknown>): Partial<ISdDtfAsset>

    /** Instantiates a new sdTF attributes object and sets the given data when the respective types are correct. */
    createAttributes (attributesData: Record<string, unknown>): Partial<ISdDtfAttributes>

    /** Instantiates a new sdTF buffer object and sets the given data when the respective types are correct. */
    createBuffer (bufferData: Record<string, unknown>): Partial<ISdDtfBuffer>

    /** Instantiates a new sdTF buffer view object and sets the given data when the respective types are correct. */
    createBufferView (bufferViewData: Record<string, unknown>): Partial<ISdDtfBufferView>

    /** Instantiates a new sdTF chunk object and sets the given data when the respective types are correct. */
    createChunk (chunkData: Record<string, unknown>): Partial<ISdDtfChunk>

    /** Instantiates a new sdTF data item object and sets the given data when the respective types are correct. */
    createDataItem (dataItemData: Record<string, unknown>): Partial<ISdDtfDataItem>

    /** Instantiates a new sdTF file info object and sets the given data when the respective types are correct. */
    createFileInfo (fileInfoData: Record<string, unknown>): Partial<ISdDtfFileInfo>

    /** Instantiates a new sdTF node object and sets the given data when the respective types are correct. */
    createNode (nodeData: Record<string, unknown>): Partial<ISdDtfNode>

    /** Instantiates a new sdTF type hint object and sets the given data when the respective types are correct. */
    createTypeHint (typeHintData: Record<string, unknown>): Partial<ISdDtfTypeHint>

}
