import { ISdDtfFileInfo } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfFileInfo"

export class SdDtfFileInfo implements ISdDtfFileInfo {

    copyright?: string
    generator?: string
    [custom: string]: unknown

    constructor (
        public version: string,
    ) {
    }

}
