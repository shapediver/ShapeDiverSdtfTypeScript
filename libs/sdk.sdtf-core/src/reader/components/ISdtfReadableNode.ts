import { ISdtfNode } from '../../structure/components/ISdtfNode';
import { ISdtfReadableAttributes } from './ISdtfReadableAttributes';
import { ISdtfBaseReadableComponent, SdtfReadableBase } from './ISdtfBaseReadableComponent';
import { ISdtfReadableDataItem } from './ISdtfReadableDataItem';
import { ISdtfReadableTypeHint } from './ISdtfReadableTypeHint';

/** Representation of a [sdTF node](https://github.com/shapediver/sdTF/tree/development/specification/1.0#nodes). */
export interface ISdtfReadableNode
    extends ISdtfBaseReadableComponent,
        Omit<SdtfReadableBase<ISdtfNode>, 'attributes' | 'items' | 'nodes' | 'typeHint'> {
    /** Attributes of the node. */
    attributes?: ISdtfReadableAttributes;

    /** Data items of this node, may be empty. */
    items: ISdtfReadableDataItem[];

    /** Children of this node, may be empty. */
    nodes: ISdtfReadableNode[];

    /**
     * The type hint of the referenced accessor or value.
     * __Should__ be specified in case the type hint for all child nodes and items is the same.
     * __Must__ not be specified otherwise.
     */
    typeHint?: ISdtfReadableTypeHint;
}
