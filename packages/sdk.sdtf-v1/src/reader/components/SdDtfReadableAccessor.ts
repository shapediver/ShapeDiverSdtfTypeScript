import { ISdDtfBufferValue, ISdDtfReadableAccessor, ISdDtfReadableBufferView } from "@shapediver/sdk.sdtf-core"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableAccessor extends SdDtfReadableBaseComponent implements ISdDtfReadableAccessor {

    id?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public bufferView: ISdDtfReadableBufferView,
    ) {
        super()
    }

    async getContent (): Promise<ISdDtfBufferValue> {
        return {
            id: this.id,
            data: await this.bufferView.getContent(),
        }
    }

}
