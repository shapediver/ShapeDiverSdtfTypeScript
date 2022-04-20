import { ISdDtfWriteableAttribute } from "../writer/components/ISdDtfWriteableAttributes"
import { ISdDtfWriteableDataItem } from "../writer/components/ISdDtfWriteableDataItem"

export interface ISdDtfTypeWriter {

    writeComponent (component: ISdDtfWriteableAttribute | ISdDtfWriteableDataItem): void

}
