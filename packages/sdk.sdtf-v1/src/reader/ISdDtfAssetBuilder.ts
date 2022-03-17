import { ISdDtfAsset } from "@shapediver/sdk.sdtf-core"

/** Builder to create an sdTF asset object with its corresponding components form a JSON content. */
export interface ISdDtfAssetBuilder {

    /**
     * Creates all sdTF accessor instances.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildAccessor (): this

    /**
     * Creates all sdTF attributes instances.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildAttributes (): this

    /**
     * Creates all sdTF buffer instances.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildBuffer (): this

    /**
     * Creates all sdTF buffer view instances.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildBufferView (): this

    /**
     * Creates all sdTF chunk instances.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildChunks (): this

    /**
     * Creates all sdTF data item instances.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildDataItem (): this

    /**
     * Creates the sdTF file info instance.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildFileInfo (): this

    /**
     * Creates all sdTF node instances.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildNode (): this

    /**
     * Creates all sdTF type hint instances.
     * @throws {@link SdDtfError} when the content data does not correspond to the specification.
     */
    buildTypeHint (): this

    /** Returns the assembled sdTF asset instance. */
    getResult (): ISdDtfAsset

}
