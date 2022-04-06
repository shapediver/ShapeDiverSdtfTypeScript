import { ISdDtfReadableBaseComponent } from "@shapediver/sdk.sdtf-core"
import { userComponentToDataObject } from "../../utils/SdDtfUtils"

export abstract class SdDtfReadableBaseComponent implements ISdDtfReadableBaseComponent {

    readonly componentId: string

    constructor () {
        this.componentId = Math.random().toString(36).substring(2, 9)
    }

    toDataObject (): Record<string, unknown> {
        return userComponentToDataObject(this)
    }

}
