import {
    ISdtfWriteableAsset,
    ISdtfWriteableAttributes,
    ISdtfWriteableDataItem,
} from '@shapediver/sdk.sdtf-core';

/**
 * Represents a data tree where each branch has a unique path.
 *
 * Representation of [GH_Structure](https://developer.rhino3d.com/api/grasshopper/html/T_Grasshopper_Kernel_Data_GH_Structure_1.htm).
 */
export interface ISdtfGrasshopperStructure {
    /** List of all the data-arrays in this structure. */
    branches: ISdtfWriteableDataItem[][];

    /** List of all the paths in this structure. */
    paths: number[][];
}

/**
 * A builder to create a grasshopper sdTF asset.
 * This sdTF asset includes chunks that are readable by the ShapeDiver Grasshopper input component.
 */
export interface ISdtfGrasshopperSdtfBuilder {
    /**
     * Adds a new chunk that holds grasshopper list data.
     *
     * Requirements:
     * All data items must have the same type hint.
     */
    addChunkForListData(
        parameterId: string,
        list: ISdtfWriteableDataItem[],
        chunkAttributes?: ISdtfWriteableAttributes
    ): void;

    /**
     * Adds a new chunk that holds grasshopper tree data.
     *
     * Requirements:
     *  * All given data items must have the same type hint.
     *  * {@link tree.branches} and {@link tree.paths} must have the same number of elements (first level).
     *  * {@link tree.paths} must hold only integer numbers.
     */
    addChunkForTreeData(
        parameterId: string,
        tree: ISdtfGrasshopperStructure,
        chunkAttributes?: ISdtfWriteableAttributes
    ): void;

    build(): ISdtfWriteableAsset;
}
