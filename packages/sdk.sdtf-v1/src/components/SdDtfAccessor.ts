import { ISdDtfAccessor, ISdDtfBufferView } from "@shapediver/sdk.sdtf-core"

export class SdDtfAccessor implements ISdDtfAccessor {

    id?: string
    [custom: string]: unknown

    constructor (
        public bufferView: ISdDtfBufferView,
    ) {
    }

    async getContent (): Promise<{ id?: string, data: DataView }> {
        return {
            id: this.id,
            data: await this.bufferView.getContent()
        }
    }

}
