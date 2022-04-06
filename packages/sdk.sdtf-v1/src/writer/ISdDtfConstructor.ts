import { ISdDtfWriteableAsset } from "@shapediver/sdk.sdtf-core"
import { ISdDtfWriteableComponentFactory } from "./ISdDtfWriteableComponentFactory"
import { ISdDtfWriter } from "./ISdDtfWriter"

export interface ISdDtfConstructor {

    /** Constructs a new binary sdTF file from the given asset. */
    createBinarySdtf (asset: ISdDtfWriteableAsset): ArrayBuffer

    /** Returns a low-level asset factory that allows to build complex sdTF structures. */
    getFactory (): ISdDtfWriteableComponentFactory

    /** Returns a high-level asset builder that allows to create simple sdTF structures directly from data. */
    getWriter (): ISdDtfWriter

}
