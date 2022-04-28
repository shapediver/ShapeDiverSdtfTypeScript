import { ISdtfBaseComponent } from "@shapediver/sdk.sdtf-core"
import { createComponentId } from "../../utils/SdtfUtils"

export abstract class SdtfBasePartialComponent implements ISdtfBaseComponent {

    readonly componentId: string

    constructor () {
        this.componentId = createComponentId()
    }

    abstract toJson (): Record<string, unknown>

}
