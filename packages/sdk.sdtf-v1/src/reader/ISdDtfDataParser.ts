import { ISdDtfAccessor, ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core"

/**
 * This is a wrapper around sdTF data items.
 * Data items can either be stored directly in the JSON content (=value) or inside a buffer (=accessor).
 * In general, a data item can be of any structure and therefore is of type `unknown`.
 * However, they are often coupled with type hints to make further processing easier.
 * These type hints impose language dependent structural requirements on the data item.
 * For instance, a data item with type hint `string` cannot be represented by a `DataView` object.
 * Additionally, data items might be stored in a different structure than how they are used by the caller.
 * For instance, a color might be represented by a string, but to improve usability, the color value is returned as an array.
 * The `SdDtfDataParser` class is responsible for parsing the data item, validating its content and mapping it in a user-friendly format.
 */
export interface ISdDtfDataParser {

    /** Parses the given data item with the registered readers. */
    parseContent (value?: unknown, accessor?: ISdDtfAccessor, typeHint?: ISdDtfTypeHint): Promise<unknown>

}
