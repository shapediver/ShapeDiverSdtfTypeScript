import {
    ISdDtfIntegration,
    ISdDtfReadableAccessor,
    ISdDtfReadableTypeHint,
    ISdDtfTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "./ISdDtfDataParser"

export class SdDtfDataParser implements ISdDtfDataParser {

    constructor (private readonly integrations: ISdDtfIntegration[]) {
    }

    async parseContent (value?: unknown, accessor?: ISdDtfReadableAccessor, typeHint?: ISdDtfReadableTypeHint): Promise<unknown> {
        let data = undefined

        // Value precedes accessor
        if (value !== undefined) {
            data = value
        } else if (accessor) {
            data = await accessor.getContent()
        }

        return this.parseData(data, typeHint)
    }

    /**
     * Tries to parse the given data with the specified type.
     * The added sdTF-integrations determine how the data is parsed.
     * @private
     * @throws - When a reader is not able to parse the data.
     */
    parseData (data?: unknown, typeHint?: ISdDtfReadableTypeHint) {
        // No value and no accessor
        if (data === undefined) return data

        // Do not parse when no type hint is given
        if (!typeHint) return data

        // TODO apply integrations
        // // Get the first integration that is supporting the given type hint
        // const integration = this.integrations.find(i => i.isTypeHintSupported(typeHint.name))
        //
        // // Parse the value if an integration was found, otherwise return the unparsed data
        // return (integration) ?
        //     integration.getReader().readContent(typeHint.name, data) :
        //     data
        return data
    }
}
