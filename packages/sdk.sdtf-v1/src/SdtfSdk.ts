import { ISdtfIntegration, ISdtfParser, SdtfError } from "@shapediver/sdk.sdtf-core"
import { ISdtfFormatter } from "./formatter/ISdtfFormatter"
import { SdtfFormatter } from "./formatter/SdtfFormatter"
import { SdtfParser } from "./reader/SdtfParser"
import { ISdtfConstructor } from "./writer/ISdtfConstructor"
import { SdtfConstructor } from "./writer/SdtfConstructor"

/** Configuration options for the SDK. */
export interface ISdtfConfig {
    /** List of integrations that should be used after SDK was initialized. */
    integrations?: ISdtfIntegration[],
}

/** Returns a new instance of the ShapeDiver sdTf SDK. */
export async function create (config?: ISdtfConfig): Promise<SdtfSdk> {
    const sdk = new SdtfSdk(config)
    await sdk.init()
    return sdk
}

export class SdtfSdk {

    constructor (private readonly config: ISdtfConfig = {}) {
    }

    /**
     * Instantiates and returns a new sdTF parser object.
     * The parser reads sdTF data from various sources and returns an asset object, that represents the hierarchy of
     * the sdTF file and provides easy access functionality for embedded values and binary data.
     */
    createParser (): ISdtfParser {
        return new SdtfParser(this.config.integrations ?? [])
    }

    /**
     * Instantiates and returns a new sdTF constructor object.
     * The constructor provides functionality to create new sdTF assets.
     */
    createConstructor (): ISdtfConstructor {
        return new SdtfConstructor(this.config.integrations ?? [])
    }

    /** Instantiates and returns a new formatter to convert sdTF components into prettified JSON data. */
    createFormatter (): ISdtfFormatter {
        return new SdtfFormatter(this.config.integrations ?? [])
    }

    /** Initializes all specified sdTF integrations. */
    async init (): Promise<void> {
        const promiseArray: Promise<void>[] = []
        this.config.integrations?.forEach(integration => promiseArray.push(integration.init()))
        const res = await Promise.allSettled(promiseArray)

        res.forEach(promiseRes => {
            if (promiseRes.status === "rejected") {
                const e = promiseRes.reason
                throw new SdtfError(`Could not initialize all integrations: ${ e }`)
            }
        })
    }

}
