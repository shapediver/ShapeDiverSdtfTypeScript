import { ISdDtfWriteableBuffer } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableBuffer extends SdDtfBaseWriteableComponent implements ISdDtfWriteableBuffer {

    data?: ArrayBuffer
    uri?: string

    additionalProperties: Record<string, unknown> = {}

}
