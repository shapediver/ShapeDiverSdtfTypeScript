import { ISdtfReadableAccessor } from './components/ISdtfReadableAccessor';
import { ISdtfReadableTypeHint } from './components/ISdtfReadableTypeHint';

export interface ISdtfReadableContentComponent {
    /** Referenced accessor to binary data. */
    accessor?: ISdtfReadableAccessor;

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdtfReadableTypeHint;

    /** Embedded representation of the data item. */
    value?: unknown;
}
