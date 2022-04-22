import { ISdDtfIntegration, ISdDtfParser, SdDtfError } from "@shapediver/sdk.sdtf-core"
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
export async function create (config?: ISdDtfConfig): Promise<SdDtfSdk> {
    const sdk = new SdDtfSdk(config)
    await sdk.init()
    return sdk
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
        return new SdDtfConstructor(this.config.integrations ?? [])
    }

    /** Instantiates and returns a new formatter to convert sdTF components into prettified JSON data. */
    createFormatter (): ISdDtfFormatter {
        return new SdDtfFormatter(this.config.integrations ?? [])
    }

    /** Initializes all specified sdTF integrations. */
    async init (): Promise<void> {
        const promiseArray: Promise<void>[] = []
        this.config.integrations?.forEach(integration => promiseArray.push(integration.init()))
        const res = await Promise.allSettled(promiseArray)

        res.forEach(promiseRes => {
            if (promiseRes.status === "rejected") {
                const e = promiseRes.reason
                throw new SdDtfError(`Could not initialize all integrations: ${ e }`)
            }
        })
    }

}
