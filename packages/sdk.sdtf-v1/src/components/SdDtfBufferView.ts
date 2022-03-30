import { ISdDtfBuffer, ISdDtfBufferView } from "@shapediver/sdk.sdtf-core"

export class SdDtfBufferView implements ISdDtfBufferView {

    componentId: number = -1
    contentEncoding?: string
    name?: string

    [custom: string]: unknown

    constructor (
        public buffer: ISdDtfBuffer,
        public byteLength: number,
        public byteOffset: number,
        public contentType: string,
    ) {
    }

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this }
        delete json.componentId
        json.buffer = this.buffer.componentId
        return json
    }

    async getContent (): Promise<DataView> {
        return this.buffer.getContent(this.byteOffset, this.byteLength)
    }

}
