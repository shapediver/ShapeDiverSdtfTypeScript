import { ISdDtfIntegration, ISdDtfParser } from "@shapediver/sdk.sdtf-core"
import { ISdDtfFormatter } from "./formatter/ISdDtfFormatter"
import { SdDtfFormatter } from "./formatter/SdDtfFormatter"
import { SdDtfParser } from "./reader/SdDtfParser"
import { ISdDtfConstructor } from "./writer/ISdDtfConstructor"
import { SdDtfConstructor } from "./writer/SdDtfConstructor"

/** Configuration options for the SDK. */
export interface ISdDtfConfig {
    /** List of integrations that should be used after SDK was initialized. */
    integrations?: ISdDtfIntegration[],
}

/** Returns a new instance of the ShapeDiver sdTf SDK. */
export function create (config?: ISdDtfConfig): SdDtfSdk {
    return new SdDtfSdk(config)
}

export class SdDtfSdk {

    constructor (private readonly config: ISdDtfConfig = {}) {
    }

    /**
     * Instantiates and returns a new sdTF parser object.
     * The parser reads sdTF data from various sources and returns an asset object, that represents the hierarchy of
     * the sdTF file and provides easy access functionality for embedded values and binary data.
     */
    createParser (): ISdDtfParser {
        return new SdDtfParser(this.config.integrations ?? [])
    }

    /**
     * Instantiates and returns a new sdTF constructor object.
     * The constructor provides functionality to create new sdTF assets.
     */
    createConstructor (): ISdDtfConstructor {
        return new SdDtfConstructor()
    }

    /** Instantiates and returns a new formatter to convert sdTF components into prettified JSON data. */
    createFormatter (): ISdDtfFormatter {
        return new SdDtfFormatter()
    }

}
