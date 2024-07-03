import {
    ISdtfReadableAttributes,
    ISdtfReadableDataItem,
    ISdtfReadableNode,
    ISdtfReadableTypeHint,
} from '@shapediver/sdk.sdtf-core';
import { SdtfBaseReadableComponent } from './SdtfBaseReadableComponent';

export class SdtfReadableNode extends SdtfBaseReadableComponent implements ISdtfReadableNode {
    attributes?: ISdtfReadableAttributes;
    items: ISdtfReadableDataItem[] = [];
    name?: string;
    nodes: ISdtfReadableNode[] = [];
    typeHint?: ISdtfReadableTypeHint;

    additionalProperties: Record<string, unknown> = {};
}
