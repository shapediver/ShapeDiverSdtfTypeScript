import { ISdDtfReadableContentComponent } from "@shapediver/sdk.sdtf-core"

/**
 * This is a wrapper around data access used in sdTF items and attributes.
 * Data can either be stored directly in the JSON content (=value) or inside a buffer (=accessor).
 * In general, data can be of any structure and therefore is of type `unknown`.
 * However, data is usually coupled with a concrete type hints to make further processing easier.
 * These type hints might impose a specific structural representation on the data.
 * So data might be stored in a different structure than how they are used by the caller.
 * For instance, a color might be represented by a string, but to improve usability, the color value is returned as an array.
 *
 * The `SdDtfDataParser` class is responsible for parsing data and eventually mapping it into a specific structure
 * depending on the data's concrete type hint.
 */
export interface ISdDtfDataParser {

    /** Parses the given data item with the registered readers. */
    parseContent (component: ISdDtfReadableContentComponent): Promise<unknown>

}
