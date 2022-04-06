import { ISdDtfBaseComponent } from "@shapediver/sdk.sdtf-core"

export abstract class SdDtfBasePartialComponent implements ISdDtfBaseComponent {

    readonly componentId: string

    constructor () {
        this.componentId = Math.random().toString(36).substring(2, 9)
    }

    abstract toJson (): Record<string, unknown>

}
