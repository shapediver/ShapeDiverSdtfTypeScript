import { ISdtfBufferValue, ISdtfReadableAccessor, ISdtfReadableBufferView } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseReadableComponent } from "./SdtfBaseReadableComponent"

export class SdtfReadableAccessor extends SdtfBaseReadableComponent implements ISdtfReadableAccessor {

    id?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public bufferView: ISdtfReadableBufferView,
    ) {
        super()
    }

    async getContent (): Promise<ISdtfBufferValue> {
        return {
            id: this.id,
            data: await this.bufferView.getContent(),
        }
    }

}
