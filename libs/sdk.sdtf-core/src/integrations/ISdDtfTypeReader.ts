import { ISdDtfReadableAttribute } from "../reader/components/ISdDtfReadableAttributes"
import { ISdDtfReadableDataItem } from "../reader/components/ISdDtfReadableDataItem"
import { ISdDtfReadableContentComponent } from "../reader/ISdDtfReadableContentComponent"

/** The reader is the central component for parsing and mapping data with a specific integration-type. */
export interface ISdDtfTypeReader {

    /**
     * Parses and maps the accessor-content of the given type and returns the result.
     *
     * Content data is hold by {@link ISdDtfReadableDataItem} and {@link ISdDtfReadableAttribute} components and stored
     * either directly in the sdTF _JSON content_ (`value` property), or in a _sdTF binary buffer_ (`accessor` property).
     * This function parses content data of the given component and, optionally, maps the content from an internal
     * representation into an external one.
     *
     * Example:
     * Some data values are stored as a JSON object in the sdTF file.
     * The reader parses the JSON object and uses this data to instantiate a new JavaScript object that is returned to
     * the user instead.
     *
     * @throws {@link SdDtfError} when the given type is not supported.
     */
    readComponent (component: ISdDtfReadableContentComponent): Promise<unknown>

}
