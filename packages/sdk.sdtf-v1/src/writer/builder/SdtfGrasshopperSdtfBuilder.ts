import {
    ISdtfWriteableAsset,
    ISdtfWriteableAttributes,
    ISdtfWriteableComponentFactory,
    ISdtfWriteableDataItem,
    isIntArray,
    SdtfError,
} from "@shapediver/sdk.sdtf-core"
import { ISdtfGrasshopperSdtfBuilder, ISdtfGrasshopperStructure } from "./ISdtfGrasshopperSdtfBuilder"

export class SdtfGrasshopperSdtfBuilder implements ISdtfGrasshopperSdtfBuilder {

    private readonly asset: ISdtfWriteableAsset

    constructor (private readonly factory: ISdtfWriteableComponentFactory) {
        this.asset = factory.createAsset()
    }

    addChunkForListData (
        parameterId: string,
        list: ISdtfWriteableDataItem[],
        chunkAttributes?: ISdtfWriteableAttributes,
    ): void {
        this.addChunkForTreeData(
            parameterId,
            { branches: [ list ], paths: [ [ 0 ] ] },
            chunkAttributes,
        )
    }

    addChunkForTreeData (
        parameterId: string,
        tree: ISdtfGrasshopperStructure,
        chunkAttributes?: ISdtfWriteableAttributes,
    ): void {
        const chunk = this.factory.createChunk(parameterId)
        this.asset.chunks.push(chunk)

        // Add chunk attributes if given
        if (chunkAttributes) chunk.attributes = chunkAttributes

        // Validate grasshopper structure - `branches` and `paths` must have the same number of elements (first array level).
        if (tree.branches.length !== tree.paths.length)
            throw new SdtfError("Invalid tree parameter: 'branches' and 'paths' of the grasshopper structure must have the same number of elements.")

        // Validate grasshopper structure - The numbers in `paths` must all be integers.
        if (!tree.paths.every(path => isIntArray(path)))
            throw new SdtfError("Invalid tree parameter: 'paths' of the grasshopper structure must only consist of integer values.")

        // Validate grasshopper structure - All data items must contain a type hint.
        if (!tree.branches.every(branch => branch.every(item => !!item.typeHint?.name)))
            throw new SdtfError("Invalid tree parameter: All data items in 'tree.branches' must contain a type hint.")

        let typeHint: string | undefined

        // Create nodes according to the given grasshopper tree structure
        for (let i = 0; i < tree.branches.length; i++) {
            const branch = tree.branches[i], path = tree.paths[i]

            const node = this.factory.createNode()
            // The numbers in path represent the name of the node
            node.name = "[" + path.join(",") + "]"

            // The branch holds all data of the node
            branch.forEach(item => {
                // The first data item sets the required type hint
                if (!typeHint) typeHint = item.typeHint!.name

                // Validate grasshopper structure - All data items must have the same type hint.
                if (typeHint !== item.typeHint!.name)
                    throw new SdtfError("Invalid tree parameter: All data items in 'tree.branches' must have the same type hint.")

                // Add item to node
                node.items.push(item)
            })


            chunk.nodes.push(node)
        }
    }

    build (): ISdtfWriteableAsset {
        return this.asset
    }

}
