import { ISdtfAccessor } from "../../structure/components/ISdtfAccessor"
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from "./ISdtfBaseWriteableComponent"
import { ISdtfWriteableBufferView } from "./ISdtfWriteableBufferView"

/** Representation of a [sdTF accessor](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessor). */
export interface ISdtfWriteableAccessor extends ISdtfBaseWriteableComponent,
    Omit<SdtfWriteableBase<ISdtfAccessor>, "bufferView"> {

    /** The referenced buffer view. */
    bufferView?: ISdtfWriteableBufferView

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
