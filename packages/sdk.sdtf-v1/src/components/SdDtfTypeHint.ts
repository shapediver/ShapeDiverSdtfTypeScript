import { ISdDtfTypeHint, SdDtfTypeHintName } from "@shapediver/sdk.sdtf-core"

export class SdDtfTypeHint implements ISdDtfTypeHint {

    componentId: number = -1;

    [custom: string]: unknown

    constructor (
        public name: SdDtfTypeHintName | string,
    ) {
    }

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this }
        delete json.componentId
        return json
    }

}
