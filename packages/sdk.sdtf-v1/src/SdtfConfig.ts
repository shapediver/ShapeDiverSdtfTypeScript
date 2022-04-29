import { ISdtfIntegration } from "@shapediver/sdk.sdtf-core"
import { SdtfGeometryTypeIntegration } from "@shapediver/sdk.sdtf-geometry"
import { SdtfPrimitiveTypeIntegration } from "@shapediver/sdk.sdtf-primitives"

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
    ]

    constructor (config?: Partial<SdtfConfig>) {
        if (config?.integrations !== undefined)
            this.integrations = config.integrations
    }

}
