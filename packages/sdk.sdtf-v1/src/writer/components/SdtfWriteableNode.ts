import {
    ISdtfWriteableAttributes,
    ISdtfWriteableDataItem,
    ISdtfWriteableNode,
    ISdtfWriteableTypeHint,
} from '@shapediver/sdk.sdtf-core';
import { SdtfBaseWriteableComponent } from './SdtfBaseWriteableComponent';
import { SdtfWriteableAttributes } from './SdtfWriteableAttributes';
import { SdtfWriteableDataItem } from './SdtfWriteableDataItem';
import { SdtfWriteableTypeHint } from './SdtfWriteableTypeHint';

export class SdtfWriteableNode extends SdtfBaseWriteableComponent implements ISdtfWriteableNode {
    attributes?: ISdtfWriteableAttributes;
    items: ISdtfWriteableDataItem[] = [];
    name?: string;
    nodes: ISdtfWriteableNode[] = [];
    typeHint?: ISdtfWriteableTypeHint;

    additionalProperties: Record<string, unknown> = {};

    static clone(original: ISdtfWriteableNode): ISdtfWriteableNode {
        const clone = new SdtfWriteableNode();

        if (original.attributes)
            clone.attributes = SdtfWriteableAttributes.clone(original.attributes);
        clone.items = original.items.map((i) => SdtfWriteableDataItem.clone(i));
        clone.name = original.name;
        clone.nodes = original.nodes.map((n) => this.clone(n));
        if (original.typeHint) clone.typeHint = SdtfWriteableTypeHint.clone(original.typeHint);

        clone.additionalProperties = { ...original.additionalProperties };

        return clone;
    }
}
