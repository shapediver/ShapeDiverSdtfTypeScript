import { ISdDtfAccessor } from "../../structure/components/ISdDtfAccessor"
import { ISdDtfBufferValue } from "../ISdDtfBufferValue"
import { ISdDtfReadableBaseComponent, SdDtfReadableBase } from "./ISdDtfReadableBaseComponent"
import { ISdDtfReadableBufferView } from "./ISdDtfReadableBufferView"

/** Representation of a readable [sdTF accessor](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessors). */
export interface ISdDtfReadableAccessor extends ISdDtfReadableBaseComponent,
    Omit<SdDtfReadableBase<ISdDtfAccessor>, "bufferView"> {

    /** The referenced buffer view. */
    bufferView: ISdDtfReadableBufferView

    /** Returns the content. */
    getContent (): Promise<ISdDtfBufferValue>

}
