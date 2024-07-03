import { ISdtfAccessor } from '@shapediver/sdk.sdtf-core';
import { SdtfBasePartialComponent } from './SdtfBasePartialComponent';

export class SdtfPartialAccessor
    extends SdtfBasePartialComponent
    implements Partial<ISdtfAccessor>
{
    bufferView?: number;
    id?: string;

    additionalProperties: Record<string, unknown> = {};

    toJson(): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties };

        if (this.bufferView !== undefined) json.bufferView = this.bufferView;
        else delete json.bufferView;

        if (this.id !== undefined) json.id = this.id;
        else delete json.id;

        return json;
    }
}
