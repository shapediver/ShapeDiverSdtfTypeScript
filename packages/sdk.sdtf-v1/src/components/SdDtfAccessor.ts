import { ISdDtfAccessor, ISdDtfBufferValue, ISdDtfBufferView } from "@shapediver/sdk.sdtf-core"

export class SdDtfAccessor implements ISdDtfAccessor {

    componentId: number = -1
    id?: string

    [custom: string]: unknown

    constructor (
        public bufferView: ISdDtfBufferView,
    ) {
    }

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this }
        delete json.componentId
        json.bufferView = this.bufferView.componentId
        return json
    }

    async getContent (): Promise<ISdDtfBufferValue> {
        return {
            id: this.id,
            data: await this.bufferView.getContent(),
        }
    }

}
