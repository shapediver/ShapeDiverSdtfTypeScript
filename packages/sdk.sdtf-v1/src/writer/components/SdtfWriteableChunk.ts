import { ISdtfWriteableChunk } from "@shapediver/sdk.sdtf-core"
import { SdtfWriteableNode } from "./SdtfWriteableNode"

export class SdtfWriteableChunk extends SdtfWriteableNode implements ISdtfWriteableChunk {

    static clone (original: ISdtfWriteableChunk): ISdtfWriteableChunk {
        return SdtfWriteableNode.clone(original)
    }
}
