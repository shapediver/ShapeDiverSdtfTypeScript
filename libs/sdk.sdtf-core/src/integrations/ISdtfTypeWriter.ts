import { ISdtfWriteableAttribute } from "../writer/components/ISdtfWriteableAttributes"
import { ISdtfWriteableDataItem } from "../writer/components/ISdtfWriteableDataItem"

export interface ISdtfTypeWriter {

    writeComponent (component: ISdtfWriteableAttribute | ISdtfWriteableDataItem): void

    postProcessComponents (components: (ISdtfWriteableAttribute | ISdtfWriteableDataItem)[]): void

}
