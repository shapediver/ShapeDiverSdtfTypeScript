import { ISdtfAttribute, ISdtfAttributes } from "../../structure/components/ISdtfAttributes"
import { ISdtfBaseReadableComponent, SdtfReadableBase } from "./ISdtfBaseReadableComponent"
import { ISdtfReadableTypeHint } from "./ISdtfReadableTypeHint"

/** Representation of a [sdTF attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes). */
export interface ISdtfReadableAttributes extends ISdtfBaseReadableComponent,
    Omit<SdtfReadableBase<ISdtfAttributes>, "entries"> {

    /** Attributes are stored as dictionaries, mapping an arbitrary number of attribute names to their values. */
    entries: Record<string, ISdtfReadableAttribute>

}

/** The value of a single attributes dictionary key */
export interface ISdtfReadableAttribute extends Omit<ISdtfBaseReadableComponent, "componentId">,
    Omit<ISdtfAttribute, "toJson" | "accessor" | "typeHint" | "value"> {

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdtfReadableTypeHint

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
