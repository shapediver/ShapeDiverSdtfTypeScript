import { ISdDtfChunk } from "@shapediver/sdk.sdtf-core"
import { SdDtfNode } from "./SdDtfNode"

export class SdDtfChunk extends SdDtfNode implements ISdDtfChunk {

    constructor (
        name: string,
    ) {
        super()

        this.name = name    // Every chunk must have a name
    }
}