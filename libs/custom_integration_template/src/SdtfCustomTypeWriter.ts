import {
    ISdtfTypeWriter,
    ISdtfWriteableAttribute,
    ISdtfWriteableComponentFactory,
    ISdtfWriteableDataItem,
} from "@shapediver/sdk.sdtf-core"

/*
 * The writer is the central component for modifying and mapping content data of your custom integration-type, whenever
 * a new sdTF file is created.
 *
 * Content data is hold by `ISdtfWriteableDataItem` and `ISdtfWriteableAttribute` components and stored either directly
 * in the _sdTF JSON content_ (`value` property), or in a _sdTF binary buffer_ (`accessor` property).
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
export class SdtfCustomTypeWriter implements ISdtfTypeWriter {

    // The given factory enables your integration to instantiate new sdTF components if needed.
    constructor (private factory: ISdtfWriteableComponentFactory) {
    }

    /*
     * This function should be used to prepare the content of a single component for being written to a new sdTF file.
     * Additionally, the component can be validated to ensure a correct format for the respective type hint.
     *
     * This function is called by the SDK when the user has finished creating the sdTF component structure and wants it
     * to be transformed into a new sdTF file.
     *
     * When something goes wrong, a `SdtfError` with a corresponding message should be thrown.
     */
    writeComponent (component: ISdtfWriteableAttribute | ISdtfWriteableDataItem): void {
        throw new Error("Method not implemented.")
    }

    /*
     * This function allows to process multiple components at once, which is useful if components should get merged, etc.
     * Additionally, the components can be validated to ensure a correct format for the respective type hint.
     *
     * This function is called by the SDK when the user has finished creating the sdTF component structure and wants it
     * to be transformed into a new sdTF file, and after all `writeComponent` operations have been completed.
     *
     * When something goes wrong, a `SdtfError` with a corresponding message should be thrown.
     */
    postProcessComponents (components: (ISdtfWriteableAttribute | ISdtfWriteableDataItem)[]): void {
        throw new Error("Method not implemented.")
    }

}
