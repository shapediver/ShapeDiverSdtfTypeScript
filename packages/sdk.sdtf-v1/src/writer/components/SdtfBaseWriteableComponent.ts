import { ISdtfBaseWriteableComponent } from "@shapediver/sdk.sdtf-core"
import { createComponentId, userComponentToDataObject } from "../../utils/SdtfUtils"

export abstract class SdtfBaseWriteableComponent implements ISdtfBaseWriteableComponent {

    readonly componentId: string

    constructor () {
        this.componentId = createComponentId()
    }

    toDataObject (): Record<string, unknown> {
        return userComponentToDataObject(this)
    }

}
