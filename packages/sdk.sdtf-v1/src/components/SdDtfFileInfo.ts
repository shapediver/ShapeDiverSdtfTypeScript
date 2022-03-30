import { ISdDtfFileInfo } from "@shapediver/sdk.sdtf-core"

export class SdDtfFileInfo implements ISdDtfFileInfo {

    copyright?: string
    generator?: string

    [custom: string]: unknown

    constructor (
        public version: string,
    ) {
    }

    toJson (): Record<string, unknown> {
        return { ...this }
    }

}
