import { ISdDtfAccessor, ISdDtfReader, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"
import { ISdDtfDataParser } from "./ISdDtfDataParser"

export class SdDtfDataParser implements ISdDtfDataParser{

    constructor (private readonly readers: ISdDtfReader[]) {
    }

    async parseContent (value?: unknown, accessor?: ISdDtfAccessor, typeHint?: ISdDtfTypeHint): Promise<unknown> {
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
    parseData (data?: unknown, typeHint?: ISdDtfTypeHint) {
        // No value and no accessor
        if (data === undefined) return data

        // Do not parse when no type hint is given
        if (!typeHint) return data

        // Get the first reader that is supporting the given type hint
        const reader = this.readers.find(r => r.isTypeHintSupported(typeHint.name))

        // Parse the value if a reader was found, otherwise return the unparsed data
        return (reader) ? reader.parseValue(typeHint.name, data) : data
    }
}
