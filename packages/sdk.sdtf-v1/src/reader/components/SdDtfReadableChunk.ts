import { ISdDtfReadableChunk } from "@shapediver/sdk.sdtf-core"
import { SdDtfReadableNode } from "./SdDtfReadableNode"

export class SdDtfReadableChunk extends SdDtfReadableNode implements ISdDtfReadableChunk {

    name: string

    constructor (
        name: string,
    ) {
        super()
        this.name = name
    }

}
