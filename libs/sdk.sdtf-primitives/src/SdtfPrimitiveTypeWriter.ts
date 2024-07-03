import {
    ISdtfTypeWriter,
    ISdtfWriteableAttribute,
    ISdtfWriteableComponentFactory,
    ISdtfWriteableDataItem,
    sdAssertUnreachable,
    SdtfError,
    SdtfPrimitiveTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { SdtfPrimitiveTypeValidator } from './SdtfPrimitiveTypeValidator';

export class SdtfPrimitiveTypeWriter implements ISdtfTypeWriter {
    private readonly validator = new SdtfPrimitiveTypeValidator();

    constructor(private factory: ISdtfWriteableComponentFactory) {}

    writeComponent(component: ISdtfWriteableAttribute | ISdtfWriteableDataItem): void {
        const typeHint = component.typeHint?.name as SdtfPrimitiveTypeHintName;

        switch (typeHint) {
            case SdtfPrimitiveTypeHintName.BOOLEAN:
            case SdtfPrimitiveTypeHintName.CHAR:
            case SdtfPrimitiveTypeHintName.COLOR:
            case SdtfPrimitiveTypeHintName.DECIMAL:
            case SdtfPrimitiveTypeHintName.DOUBLE:
            case SdtfPrimitiveTypeHintName.GUID:
            case SdtfPrimitiveTypeHintName.INT8:
            case SdtfPrimitiveTypeHintName.INT16:
            case SdtfPrimitiveTypeHintName.INT32:
            case SdtfPrimitiveTypeHintName.INT64:
            case SdtfPrimitiveTypeHintName.JSON:
            case SdtfPrimitiveTypeHintName.SINGLE:
            case SdtfPrimitiveTypeHintName.STRING:
            case SdtfPrimitiveTypeHintName.UINT8:
            case SdtfPrimitiveTypeHintName.UINT16:
            case SdtfPrimitiveTypeHintName.UINT32:
            case SdtfPrimitiveTypeHintName.UINT64:
                delete component.accessor; // Stored in JSON content
                break;
            case SdtfPrimitiveTypeHintName.DATA:
            case SdtfPrimitiveTypeHintName.IMAGE:
                delete component.value; // Stored in sdTF buffer
                break;
            default:
                sdAssertUnreachable(typeHint);
        }

        // Make sure that the component consists of valid data
        if (!this.validator.validateComponent(typeHint, component.value, component.accessor)) {
            throw new SdtfError(
                `Cannot write component of type '${typeHint}': Invalid component.`
            );
        }
    }

    postProcessComponents(components: (ISdtfWriteableAttribute | ISdtfWriteableDataItem)[]): void {
        // Nothing to do here
    }
}
