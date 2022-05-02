import { ISdtfReadableContentComponent, ISdtfTypeReader } from "@shapediver/sdk.sdtf-core"

/*
 * The reader is the central component for parsing and mapping content data of your custom integration-type.
 *
 * Content data is hold by `ISdtfReadableDataItem` and `ISdtfReadableAttribute` components and stored either directly in
 * the _sdTF JSON content_ (`value` property), or in a _sdTF binary buffer_ (`accessor` property).
 * By itself, the SDK does not know about any data type hints.
 * It simply returns the data as is (when the data is stored in the binary buffer, it is wrapped by `ISdtfBufferValue`).
 * However, in some cases it is necessary to process the stored data before returning it to the user.
 *
 * For instance:
 * Some data values are stored as a JSON object in the sdTF file.
 * The reader parses the JSON object and uses this data to instantiate a new JavaScript object that is returned to
 * the user instead.
 * This way, users can interact directly with a concrete class instance instead of creating one themselves.
 */
export class SdtfCustomTypeReader implements ISdtfTypeReader {

    /*
     * This function should be used to parse and map the content of the given component and to return the data that
     * should be forwarded to the user.
     * Additionally, the component can be validated to ensure a correct format for the respective type hint.
     *
     * This function is called by the SDK whenever the user requests the content of a sdTF item or attribute component
     * by calling `ISdtfReadableDataItem.getContent()` or `ISdtfReadableAttribute.getContent()`.
     *
     * When something goes wrong, a `SdtfError` with a corresponding message should be thrown.
     */
    async readComponent (component: ISdtfReadableContentComponent): Promise<unknown> {
        /*
         * Note:
         * The component can be manipulated if required.
         * However, only the returned value is forwarded to the user.
         */
        throw new Error("Method not implemented.")
    }

}
