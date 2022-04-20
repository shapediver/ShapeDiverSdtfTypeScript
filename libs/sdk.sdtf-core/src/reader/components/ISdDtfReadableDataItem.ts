import { ISdDtfDataItem } from "../../structure/components/ISdDtfDataItem"
import { ISdDtfBaseReadableComponent, SdDtfReadableBase } from "./ISdDtfBaseReadableComponent"
import { ISdDtfReadableAttributes } from "./ISdDtfReadableAttributes"
import { ISdDtfReadableTypeHint } from "./ISdDtfReadableTypeHint"

/** Representation of a [sdTF data item](https://github.com/shapediver/sdTF/tree/development/specification/1.0#data-items). */
export interface ISdDtfReadableDataItem extends ISdDtfBaseReadableComponent,
    Omit<SdDtfReadableBase<ISdDtfDataItem>, "accessor" | "attributes" | "typeHint" | "value"> {

    /** Referenced attributes of this data item. */
    attributes?: ISdDtfReadableAttributes

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
