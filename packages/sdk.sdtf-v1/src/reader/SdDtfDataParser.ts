import {
    ISdDtfBufferValue,
    ISdDtfIntegration,
    ISdDtfReadableAccessor,
    ISdDtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "./ISdDtfDataParser"

export class SdDtfDataParser implements ISdDtfDataParser {

    constructor (private readonly integrations: ISdDtfIntegration[]) {
    }

    async parseContent (value?: unknown, accessor?: ISdDtfReadableAccessor, typeHint?: ISdDtfReadableTypeHint): Promise<unknown> {
        let data = undefined

        // Value precedes accessor
        if (value !== undefined) {
            return this.parseValue(value, typeHint)
        } else if (accessor) {
            return this.parseAccessor(await accessor.getContent(), typeHint)
        }

        return this.parseValue(data, typeHint)
    }

    /**
     * Tries to parse the given value with the specified type.
     * The added sdTF-integrations determine how the value is parsed.
     * @private
     * @throws - When a reader is not able to parse the data.
     */
    parseValue (value: unknown, typeHint?: ISdDtfReadableTypeHint) {
        // Do not parse when no type hint is given
        if (!typeHint) return value

        // Get the first integration that is supporting the given type hint
        const integration = this.integrations.find(i => i.isTypeHintSupported(typeHint.name))

        // Parse the value if an integration was found, otherwise return the unparsed data
        return (integration) ?
            integration.getReader().readValue(typeHint.name, value) :
            value
    }

    /**
     * Tries to parse the given accessor with the specified type.
     * The added sdTF-integrations determine how the accessor is parsed.
     * @private
     * @throws - When a reader is not able to parse the data.
     */
    parseAccessor (data: ISdDtfBufferValue, typeHint?: ISdDtfReadableTypeHint) {
        // Do not parse when no type hint is given
        if (!typeHint) return data

        // Get the first integration that is supporting the given type hint
        const integration = this.integrations.find(i => i.isTypeHintSupported(typeHint.name))

        // Parse the accessor if an integration was found, otherwise return the unparsed data
        return (integration) ?
            integration.getReader().readAccessor(typeHint.name, data) :
            data
    }
}
