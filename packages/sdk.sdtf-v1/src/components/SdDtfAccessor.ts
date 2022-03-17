import { ISdDtfAccessor } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAccessor"
import { ISdDtfBufferView } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfBufferView"

export class SdDtfAccessor implements ISdDtfAccessor {

    id?: string
    [custom: string]: unknown

    constructor (
        public bufferView: ISdDtfBufferView,
    ) {
    }

}
