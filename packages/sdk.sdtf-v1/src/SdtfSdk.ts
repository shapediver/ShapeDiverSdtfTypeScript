import { ISdtfParser, SdtfError } from "@shapediver/sdk.sdtf-core"
import { ISdtfFormatter } from "./formatter/ISdtfFormatter"
import { SdtfFormatter } from "./formatter/SdtfFormatter"
import { SdtfParser } from "./reader/SdtfParser"
import { SdtfConfig } from "./SdtfConfig"
import { ISdtfConstructor } from "./writer/ISdtfConstructor"
import { SdtfConstructor } from "./writer/SdtfConstructor"

/** Partial definition of the sdk's config object. */
export type ISdtfConfig = Partial<SdtfConfig>

/** Returns a new instance of the ShapeDiver sdTf SDK. */
export async function create (config?: ISdtfConfig): Promise<SdtfSdk> {
    const sdk = new SdtfSdk(config)
    await sdk.init()
    return sdk
}

export class SdtfSdk {

    private readonly config: SdtfConfig

    constructor (config?: ISdtfConfig) {
        this.config = new SdtfConfig(config)
    }

    /**
     * Instantiates and returns a new sdTF parser object.
     * The parser reads sdTF data from various sources and returns an asset object, that represents the hierarchy of
     * the sdTF file and provides easy access functionality for embedded values and binary data.
     */
    createParser (): ISdtfParser {
        return new SdtfParser(this.config)
    }

    /**
     * Instantiates and returns a new sdTF constructor object.
     * The constructor provides functionality to create new sdTF assets.
     */
    createConstructor (): ISdtfConstructor {
        return new SdtfConstructor(this.config.integrations)
    }

    /** Instantiates and returns a new formatter to convert sdTF components into prettified JSON data. */
    createFormatter (): ISdtfFormatter {
        return new SdtfFormatter(this.config.integrations)
    }

    /** Initializes all specified sdTF integrations. */
    async init (): Promise<void> {
        const promiseArray: Promise<void>[] = []
        this.config.integrations.forEach(integration => promiseArray.push(integration.init()))
        const res = await Promise.allSettled(promiseArray)

        res.forEach(promiseRes => {
            if (promiseRes.status === "rejected") {
                const e = promiseRes.reason
                throw new SdtfError(`Could not initialize all integrations: ${ e }`)
            }
        })
    }

}
