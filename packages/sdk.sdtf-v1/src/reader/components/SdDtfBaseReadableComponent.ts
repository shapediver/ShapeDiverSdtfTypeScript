import { ISdDtfBaseReadableComponent } from "@shapediver/sdk.sdtf-core"
import { createComponentId, userComponentToDataObject } from "../../utils/SdDtfUtils"

export abstract class SdDtfBaseReadableComponent implements ISdDtfBaseReadableComponent {

    readonly componentId: string

    constructor () {
        this.componentId = createComponentId()
    }

    toDataObject (): Record<string, unknown> {
        return userComponentToDataObject(this)
    }

}
