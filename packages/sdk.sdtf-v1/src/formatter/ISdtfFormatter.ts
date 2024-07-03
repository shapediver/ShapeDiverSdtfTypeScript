import { ISdtfReadableAsset, ISdtfWriteableAsset } from '@shapediver/sdk.sdtf-core';

/** A simple beautifier that re-formats sdTF components. */
export interface ISdtfFormatter {
    /** Prints the sdTF JSON content for the given readable asset. */
    prettifyReadableAsset(asset: ISdtfReadableAsset): string;

    /** Prints the sdTF JSON content for the given writeable asset. */
    prettifyWriteableAsset(asset: ISdtfWriteableAsset): string;
}
