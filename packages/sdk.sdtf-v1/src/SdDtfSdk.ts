import { ISdDtfIntegration, ISdDtfParser } from "@shapediver/sdk.sdtf-core"
import { SdDtfParser } from "./reader/SdDtfParser"

/** Configuration options for the SDK. */
export interface ISdDtfConfig {
    /** List of integrations that should be used after SDK was initialized. */
    integrations?: ISdDtfIntegration[],
}

/** Returns a new instance of the ShapeDiver sdTf SDK. */
export function create (config: ISdDtfConfig): SdDtfSdk {
    return new SdDtfSdk(config)
}

export class SdDtfSdk {

    constructor (private readonly config: ISdDtfConfig) {
    }

    /**
     * Instantiates and returns a new sdTF parser object.
     * The parser reads sdTF data from various sources and returns an asset object, that represents the hierarchy of
     * the sdTF file and provides easy access functionality for embedded values and binary data.
     */
    createParser (): ISdDtfParser {
        return new SdDtfParser((this.config.integrations ?? []).map(i => i.getReader()))
    }

}
