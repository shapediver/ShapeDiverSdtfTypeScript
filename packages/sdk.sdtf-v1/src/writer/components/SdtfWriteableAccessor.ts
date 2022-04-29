import { ISdtfWriteableAccessor, ISdtfWriteableBufferView } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"
import { SdtfWriteableBufferView } from "./SdtfWriteableBufferView"

export class SdtfWriteableAccessor extends SdtfBaseWriteableComponent implements ISdtfWriteableAccessor {

    bufferView?: ISdtfWriteableBufferView
    id?: string

    additionalProperties: Record<string, unknown> = {}

    static clone (original: ISdtfWriteableAccessor): ISdtfWriteableAccessor {
        const clone = new SdtfWriteableAccessor()

        if (original.bufferView) clone.bufferView = SdtfWriteableBufferView.clone(original.bufferView)
        clone.id = original.id

        clone.additionalProperties = { ...original.additionalProperties }

        return clone
    }

}
