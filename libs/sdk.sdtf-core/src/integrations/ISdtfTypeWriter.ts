import { ISdtfWriteableAttribute } from "../writer/components/ISdtfWriteableAttributes"
import { ISdtfWriteableDataItem } from "../writer/components/ISdtfWriteableDataItem"

/**
 * The writer is the central component for modifying and mapping content data of your custom integration-type, whenever
 * a new sdTF file is created.
 *
 * Content data is hold by {@link ISdtfWriteableDataItem} and {@link ISdtfWriteableAttribute} components and stored
 * either directly in the _sdTF JSON content_ (`value` property), or in a _sdTF binary buffer_ (`accessor` property).
 * However, in some cases it is necessary to modify the content set by the user before writing it into the sdTF file.
 *
 * For instance:
 * The user instantiates some object and sets it in the `value` property.
 * If we kept it as is, the representation of the JavaScript object would be written into the _sdTF JSON content_.
 * We do not want this.
 * Therefore, we replace the user object by a plane JSON object that holds all important data values.
 * This way, the JSON object is written instead.
 * By implementing the process in reverse order (creating a new object from the JSON object) in the reader of this
 * integration, the user would receive an object instance again.
 */
export interface ISdtfTypeWriter {

    /*
     * Prepares the content of a single component for being written to a new sdTF file.
     * Additionally, the component might be validated to ensure a correct format for the respective type hint.
     *
     * This function is called by the SDK when the user has finished creating the sdTF component structure and wants it
     * to be transformed into a new sdTF file.
     *
     * @throws {@link SdtfError} when the component is invalid or something goes wrong.
     */
    writeComponent (component: ISdtfWriteableAttribute | ISdtfWriteableDataItem): void

    /*
     * Processes multiple components at once and prepares them for writing.
     * Additionally, the components might be validated to ensure a correct format for the respective type hint.
     *
     * This function is called by the SDK when the user has finished creating the sdTF component structure and wants it
     * to be transformed into a new sdTF file, and after all `writeComponent` operations have been completed.
     *
     * @throws {@link SdtfError} when the component is invalid or something goes wrong.
     */
    postProcessComponents (components: (ISdtfWriteableAttribute | ISdtfWriteableDataItem)[]): void

}
