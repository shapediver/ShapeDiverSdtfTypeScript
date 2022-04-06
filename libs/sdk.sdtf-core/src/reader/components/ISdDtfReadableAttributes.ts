import { ISdDtfAttribute, ISdDtfAttributes } from "../../structure/components/ISdDtfAttributes"
import { ISdDtfReadableAccessor } from "./ISdDtfReadableAccessor"
import { ISdDtfBaseReadableComponent, SdDtfReadableBase } from "./ISdDtfBaseReadableComponent"
import { ISdDtfReadableTypeHint } from "./ISdDtfReadableTypeHint"

/** Representation of a [sdTF attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes). */
export interface ISdDtfReadableAttributes extends ISdDtfBaseReadableComponent,
    Omit<SdDtfReadableBase<ISdDtfAttributes>, "entries"> {

    /** Attributes are stored as dictionaries, mapping an arbitrary number of attribute names to their values. */
    entries: Record<string, ISdDtfReadableAttribute>

}

/** The value of a single attributes dictionary key */
export interface ISdDtfReadableAttribute extends Omit<ISdDtfBaseReadableComponent, "componentId">,
    Omit<ISdDtfAttribute, "toJson" | "accessor" | "typeHint"> {

    /** Referenced accessor to binary data. */
    accessor?: ISdDtfReadableAccessor

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdDtfReadableTypeHint

    /**
     * Returns the data content.
     *
     * When the data is embedded via {@link value}, the value is returned directly.
     * However, when the data is linked via {@link accessor}, the respective buffer is loaded into memory and the
     * corresponding value is extracted and returned.
     *
     * When both, {@link value} and {@link accessor}, are defined than {@link value} precedes.
     */
    getContent (): Promise<unknown>

}
