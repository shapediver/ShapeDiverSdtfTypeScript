import { ISdDtfIntegration, ISdDtfReadableContentComponent } from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "./ISdDtfDataParser"

export class SdDtfDataParser implements ISdDtfDataParser {

    constructor (private readonly integrations: ISdDtfIntegration[]) {
    }

    async parseContent (component: ISdDtfReadableContentComponent): Promise<unknown> {
        // Get the first integration that is supporting the given type hint
        const integration = this.integrations.find(i => i.isTypeHintSupported(component.typeHint?.name ?? ""))

        // When an integration was found, all further steps are done by this integration (validation, mapping, etc)
        if (integration) {
            return integration.getReader().readComponent(component)
        }

        // Fallback behaviour, when no integration was found - return content.
        // According to the sdTF specification, value precedes accessor!
        if (component.value === undefined && !!component.accessor) {
            return component.accessor.getContent()
        } else {
            return component.value
        }
    }

}
