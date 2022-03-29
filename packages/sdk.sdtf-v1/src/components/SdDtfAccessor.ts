import { ISdDtfAccessor, ISdDtfBufferValue, ISdDtfBufferView } from "@shapediver/sdk.sdtf-core"

export class SdDtfAccessor implements ISdDtfAccessor {

    id?: string

    [custom: string]: unknown

    constructor (
        public bufferView: ISdDtfBufferView,
    ) {
    }

    async getContent (): Promise<ISdDtfBufferValue> {
        return {
            id: this.id,
            data: await this.bufferView.getContent(),
        }
    }

}
