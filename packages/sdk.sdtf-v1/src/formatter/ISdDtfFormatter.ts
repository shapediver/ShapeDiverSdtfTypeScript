import { ISdDtfReadableAsset, ISdDtfWriteableAsset } from "@shapediver/sdk.sdtf-core"

/** A simple beautifier that re-formats sdTF components. */
export interface ISdDtfFormatter {

    /** Prints the sdTF JSON content for the given readable asset. */
    prettifyReadableAsset (asset: ISdDtfReadableAsset): string

    /** Prints the sdTF JSON content for the given writeable asset. */
    prettifyWriteableAsset (asset: ISdDtfWriteableAsset): string

}
