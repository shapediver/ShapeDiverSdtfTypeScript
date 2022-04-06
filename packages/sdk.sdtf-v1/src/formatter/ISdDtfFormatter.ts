import { ISdDtfReadableAsset } from "@shapediver/sdk.sdtf-core"

/** A simple beautifier that re-formats sdTF components. */
export interface ISdDtfFormatter {

    /** Simplifies the asset structure by removing all references. */
    prettifyAsset (asset: ISdDtfReadableAsset): string

}
