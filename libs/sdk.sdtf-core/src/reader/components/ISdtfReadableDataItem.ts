import { ISdtfDataItem } from '../../structure/components/ISdtfDataItem';
import { ISdtfBaseReadableComponent, SdtfReadableBase } from './ISdtfBaseReadableComponent';
import { ISdtfReadableAttributes } from './ISdtfReadableAttributes';
import { ISdtfReadableTypeHint } from './ISdtfReadableTypeHint';

/** Representation of a [sdTF data item](https://github.com/shapediver/sdTF/tree/development/specification/1.0#data-items). */
export interface ISdtfReadableDataItem
    extends ISdtfBaseReadableComponent,
        Omit<SdtfReadableBase<ISdtfDataItem>, 'accessor' | 'attributes' | 'typeHint' | 'value'> {
    /** Referenced attributes of this data item. */
    attributes?: ISdtfReadableAttributes;

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdtfReadableTypeHint;

    /**
     * Returns the data content.
     *
     * When the data is embedded via {@link value}, the value is returned directly.
     * However, when the data is linked via {@link accessor}, the respective buffer is loaded into memory and the
     * corresponding value is extracted and returned.
     *
     * When both, {@link value} and {@link accessor}, are defined than {@link value} precedes.
     */
    getContent(): Promise<unknown>;
}
