import { ISdtfTypeHint } from '@shapediver/sdk.sdtf-core';
import { SdtfBasePartialComponent } from './SdtfBasePartialComponent';

export class SdtfPartialTypeHint
    extends SdtfBasePartialComponent
    implements Partial<ISdtfTypeHint>
{
    name?: string;

    additionalProperties: Record<string, unknown> = {};

    toJson(): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties };

        if (this.name !== undefined) json.name = this.name;
        else delete json.name;

        return json;
    }
}
