import { ISdDtfChunk } from "@shapediver/sdk.sdtf-core"
import { SdDtfNode } from "./SdDtfNode"

export class SdDtfChunk extends SdDtfNode implements ISdDtfChunk {

    componentId: number = -1

    constructor (
        name: string,
    ) {
        super()

        this.name = name    // Every chunk must have a name
    }

    toJson (): Record<string, unknown> {
        const json = super.toJson()
        json.name = this.name
        return json
    }
}
