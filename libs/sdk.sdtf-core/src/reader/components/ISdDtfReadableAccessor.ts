import { ISdDtfAccessor } from "../../structure/components/ISdDtfAccessor"
import { ISdDtfBufferValue } from "../ISdDtfBufferValue"
import { ISdDtfBaseReadableComponent, SdDtfReadableBase } from "./ISdDtfBaseReadableComponent"
import { ISdDtfReadableBufferView } from "./ISdDtfReadableBufferView"

/** Representation of a readable [sdTF accessor](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessors). */
export interface ISdDtfReadableAccessor extends ISdDtfBaseReadableComponent,
    Omit<SdDtfReadableBase<ISdDtfAccessor>, "bufferView"> {

    /** The referenced buffer view. */
    bufferView: ISdDtfReadableBufferView

    /** Returns the content. */
    getContent (): Promise<ISdDtfBufferValue>

}
