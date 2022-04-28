import { ISdtfWriteableAsset, ISdtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-core"
import { ISdtfWriter } from "./ISdtfWriter"

export interface ISdtfConstructor {

    /** Constructs a new binary sdTF file from the given asset. */
    createBinarySdtf (asset: ISdtfWriteableAsset): ArrayBuffer

    /** Returns a low-level asset factory that allows to build complex sdTF structures. */
    getFactory (): ISdtfWriteableComponentFactory

    /** Returns a high-level asset builder that allows to create simple sdTF structures directly from data. */
    getWriter (): ISdtfWriter

}
