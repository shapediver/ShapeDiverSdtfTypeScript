import { ISdDtfWriteableBuffer, ISdDtfWriteableBufferView } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableBufferView extends SdDtfBaseWriteableComponent implements ISdDtfWriteableBufferView {

    buffer?: ISdDtfWriteableBuffer
    byteLength?: number
    byteOffset?: number
    contentEncoding?: string
    contentType?: string
    name?: string

    additionalProperties: Record<string, unknown> = {}

}
