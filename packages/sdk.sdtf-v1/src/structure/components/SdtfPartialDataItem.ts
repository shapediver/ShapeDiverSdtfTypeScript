import { ISdtfDataItem } from '@shapediver/sdk.sdtf-core';
import { SdtfBasePartialComponent } from './SdtfBasePartialComponent';

export class SdtfPartialDataItem
    extends SdtfBasePartialComponent
    implements Partial<ISdtfDataItem>
{
    accessor?: number;
    attributes?: number;
    typeHint?: number;
    value?: unknown;

    additionalProperties: Record<string, unknown> = {};

    toJson(): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties };

        if (this.accessor !== undefined) json.accessor = this.accessor;
        else delete json.accessor;

        if (this.attributes !== undefined) json.attributes = this.attributes;
        else delete json.attributes;

        if (this.typeHint !== undefined) json.typeHint = this.typeHint;
        else delete json.typeHint;

        if (this.value !== undefined) json.value = this.value;
        else delete json.value;

        return json;
    }
}
