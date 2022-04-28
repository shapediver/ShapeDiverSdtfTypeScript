import { ISdtfAccessor } from "../../structure/components/ISdtfAccessor"
import { ISdtfBufferValue } from "../ISdtfBufferValue"
import { ISdtfBaseReadableComponent, SdtfReadableBase } from "./ISdtfBaseReadableComponent"
import { ISdtfReadableBufferView } from "./ISdtfReadableBufferView"

/** Representation of a readable [sdTF accessor](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessors). */
export interface ISdtfReadableAccessor extends ISdtfBaseReadableComponent,
    Omit<SdtfReadableBase<ISdtfAccessor>, "bufferView"> {

    /** The referenced buffer view. */
    bufferView: ISdtfReadableBufferView

    /** Returns the content. */
    getContent (): Promise<ISdtfBufferValue>

}
