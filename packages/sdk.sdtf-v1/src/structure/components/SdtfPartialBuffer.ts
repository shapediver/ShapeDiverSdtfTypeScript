import { ISdtfBuffer } from '@shapediver/sdk.sdtf-core';
import { SdtfBasePartialComponent } from './SdtfBasePartialComponent';

export class SdtfPartialBuffer extends SdtfBasePartialComponent implements Partial<ISdtfBuffer> {
    byteLength?: number;
    uri?: string;

    additionalProperties: Record<string, unknown> = {};

    toJson(): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this.additionalProperties };

        if (this.byteLength !== undefined) json.byteLength = this.byteLength;
        else delete json.byteLength;

        if (this.uri !== undefined) json.uri = this.uri;
        delete json.uri;

        return json;
    }
}
