import { ISdDtfBaseComponent } from "@shapediver/sdk.sdtf-core"
import { createComponentId } from "../../utils/SdDtfUtils"

export abstract class SdDtfBasePartialComponent implements ISdDtfBaseComponent {

    readonly componentId: string

    constructor () {
        this.componentId = createComponentId()
    }

    abstract toJson (): Record<string, unknown>

}
