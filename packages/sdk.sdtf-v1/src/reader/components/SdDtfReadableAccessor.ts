import { ISdDtfBufferValue, ISdDtfReadableAccessor, ISdDtfReadableBufferView } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseReadableComponent } from "./SdDtfBaseReadableComponent"

export class SdDtfReadableAccessor extends SdDtfBaseReadableComponent implements ISdDtfReadableAccessor {

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
