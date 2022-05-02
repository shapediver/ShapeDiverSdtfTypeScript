import { ISdtfReadableContentComponent } from "../reader/ISdtfReadableContentComponent"

/**
 * The reader is the central component for parsing and mapping content data of your custom integration-type.
 *
 * Content data is hold by {@link ISdtfReadableDataItem} and {@link ISdtfReadableAttribute} components and stored
 * either directly in the _sdTF JSON content_ (`value` property), or in a _sdTF binary buffer_ (`accessor` property).
 * By itself, the SDK does not know about any data type hints.
 * It simply returns the data as is (when the data is stored in the binary buffer, it is wrapped by
 * {@link ISdtfBufferValue}).
 * However, in some cases it is necessary to process the stored data before returning it to the user.
 *
 * For instance:
 * Some data values are stored as a JSON object in the sdTF file.
 * The reader parses the JSON object and uses this data to instantiate a new JavaScript object that is returned to
 * the user instead.
 * This way, users can interact directly with a concrete class instance instead of creating one themselves.
 */
export interface ISdtfTypeReader {

    /**
     * Parses and maps the content of the given component and returns the data that should be forwarded to the user.
     *
     * This function is called by the SDK whenever the user requests the content of a sdTF item or attribute component
     * by calling {@link ISdtfReadableDataItem.getContent()} or {@link ISdtfReadableAttribute.getContent()}.
     *
     * @throws {@link SdtfError} when the component is invalid or something goes wrong.
     */
    readComponent (component: ISdtfReadableContentComponent): Promise<unknown>

}
