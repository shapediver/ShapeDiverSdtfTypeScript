import { ISdtfWriteableBuffer } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableBuffer extends SdtfBaseWriteableComponent implements ISdtfWriteableBuffer {

    byteLength?: number
    data?: ArrayBuffer
    uri?: string

    additionalProperties: Record<string, unknown> = {}

}
