import { ISdtfIntegration } from '@shapediver/sdk.sdtf-core';
import { SdtfGeometryTypeIntegration } from '@shapediver/sdk.sdtf-geometry';
import { SdtfPrimitiveTypeIntegration } from '@shapediver/sdk.sdtf-primitives';

/**
 * Configuration options for an SDK instance.
 * The user is can override every setting during creation of the SDK.
 */
export class SdtfConfig {
    /**
     * List of integrations that should be used after SDK was initialized.
     *
     * Default: [ {@link SdtfPrimitiveTypeIntegration}, {@link SdtfGeometryTypeIntegration} ].
     */
    integrations: ISdtfIntegration[] = [
        new SdtfPrimitiveTypeIntegration(),
        new SdtfGeometryTypeIntegration(),
    ];

    /**
     * The JSON Web Token (JWT) to authorization HTTP calls.
     *
     * ShapeDiver models can be configured so that all interactions with them require a JSON Web Token (JWT) for
     * authorization. In this case, a `401` HTTP status is returned when no `authToken` has been specified.
     */
    authToken?: string;

    constructor(config?: Partial<SdtfConfig>) {
        if (config?.integrations !== undefined) this.integrations = config.integrations;

        this.authToken = config?.authToken;
    }
}
