import { ISdtfIntegration, ISdtfReadableContentComponent } from '@shapediver/sdk.sdtf-core';
import { ISdtfDataParser } from './ISdtfDataParser';

export class SdtfDataParser implements ISdtfDataParser {
    constructor(private readonly integrations: ISdtfIntegration[]) {}

    async parseContent(component: ISdtfReadableContentComponent): Promise<unknown> {
        // Get the first integration that is supporting the given type hint
        const integration = this.integrations.find((i) =>
            i.isTypeHintSupported(component.typeHint?.name ?? '')
        );

        // When an integration was found, all further steps are done by this integration (validation, mapping, etc)
        if (integration) {
            return integration.getReader().readComponent(component);
        }

        // Fallback behaviour, when no integration was found - return content.
        // According to the sdTF specification, value precedes accessor!
        if (component.value === undefined && !!component.accessor) {
            return component.accessor.getContent();
        } else {
            return component.value;
        }
    }
}
