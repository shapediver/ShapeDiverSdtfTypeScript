import { ISdtfTypeHint } from '../../structure/components/ISdtfTypeHint';
import { SdtfTypeHintName } from '../../structure/SdtfShapeDiverTypeHints';
import { ISdtfBaseReadableComponent, SdtfReadableBase } from './ISdtfBaseReadableComponent';

/** Representation of a [sdTF type hint](https://github.com/shapediver/sdTF/tree/development/specification/1.0#type-hints). */
export interface ISdtfReadableTypeHint
    extends ISdtfBaseReadableComponent,
        SdtfReadableBase<ISdtfTypeHint> {
    /** Name of the type hint. */
    name: SdtfTypeHintName | string;
}
