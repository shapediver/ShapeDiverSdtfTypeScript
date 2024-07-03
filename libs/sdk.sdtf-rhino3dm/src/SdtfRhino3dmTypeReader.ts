import {
    ISdtfReadableAccessor,
    ISdtfReadableContentComponent,
    ISdtfTypeReader,
    sdAssertUnreachable,
    SdtfError,
    SdtfGrasshopperTypeHintName,
    SdtfRhinoTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import * as pako from 'pako';
import { File3dm, File3dmObject } from 'rhino3dm';
import { SdtfRhino3dmSingleton } from './SdtfRhino3dmSingleton';
import { SdtfRhino3dmTypeConfig } from './SdtfRhino3dmTypeConfig';
import { CompressionTypes } from './SdtfRhino3dmTypeIntegration';
import { SdtfRhino3dmTypeValidator } from './SdtfRhino3dmTypeValidator';

export class SdtfRhino3dmTypeReader implements ISdtfTypeReader {
    private readonly validator = new SdtfRhino3dmTypeValidator(this.config);

    constructor(private config: SdtfRhino3dmTypeConfig) {}

    async readComponent(component: ISdtfReadableContentComponent): Promise<unknown> {
        const typeHint = component.typeHint?.name as string;

        // Make sure that the component consists of valid data
        if (
            !this.validator.validateInternalRepresentationOfComponent(
                typeHint,
                component.value,
                component.accessor
            )
        ) {
            throw new SdtfError(`Cannot read value of type '${typeHint}': Invalid component.`);
        }

        if (typeHint === SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH) {
            return component.value; // Nothing to map here
        }

        // Map the component data and return the result
        const rhinoTypeHint = typeHint as SdtfRhinoTypeHintName;
        switch (rhinoTypeHint) {
            case SdtfRhinoTypeHintName.RHINO_ARC_CURVE:
            case SdtfRhinoTypeHintName.RHINO_BREP:
            case SdtfRhinoTypeHintName.RHINO_CURVE:
            case SdtfRhinoTypeHintName.RHINO_EXTRUSION:
            case SdtfRhinoTypeHintName.RHINO_LINE_CURVE:
            case SdtfRhinoTypeHintName.RHINO_MESH:
            case SdtfRhinoTypeHintName.RHINO_NURBS_CURVE:
            case SdtfRhinoTypeHintName.RHINO_NURBS_SURFACE:
            case SdtfRhinoTypeHintName.RHINO_PLANE_SURFACE:
            case SdtfRhinoTypeHintName.RHINO_POINT:
            case SdtfRhinoTypeHintName.RHINO_POLY_CURVE:
            case SdtfRhinoTypeHintName.RHINO_POLYLINE_CURVE:
            case SdtfRhinoTypeHintName.RHINO_REV_SURFACE:
            case SdtfRhinoTypeHintName.RHINO_SUBD:
            case SdtfRhinoTypeHintName.RHINO_SURFACE:
                return this.instantiateRhinoComponent(component.accessor!);
            default:
                sdAssertUnreachable(rhinoTypeHint);
        }
    }

    /**
     * Rhino components are stored in the sdTF buffer as a 3dm file (based on the OpenNURBS file standard).
     * This function loads the data from the buffer and extracts the Rhino object by ID.
     * Additionally, the data is decoded priorly if necessary.
     * @private
     */
    async instantiateRhinoComponent(accessor: ISdtfReadableAccessor): Promise<unknown> {
        const content = await accessor.getContent();

        const data = this.decodeContent(content.data, accessor.bufferView.contentEncoding);

        const rhino = SdtfRhino3dmSingleton.getInstance();

        // @ts-ignore: Create object from byte array - returns null if not successful!
        const file3dm: File3dm = rhino.File3dm.fromByteArray(data);
        if (file3dm === null)
            throw new SdtfError(
                'Invalid Rhino component: Cannot instantiate rhino3dm object from buffer data.'
            );

        // @ts-ignore: Extract the object by ID - returns null if not found!
        const object3dm: File3dmObject = file3dm.objects().findId(content.id);
        if (object3dm === null)
            throw new SdtfError(
                `Invalid Rhino component: Could not find rhino3dm object with ID '${content.id}'.`
            );

        return object3dm.geometry();
    }

    /**
     * Copies the binary data of the data view (deep copy!) and decodes its content if specified.
     * @private
     */
    decodeContent(dv: DataView, encoding?: string): ArrayBuffer {
        const buffer = new Uint8Array(
            dv.buffer.slice(dv.byteOffset, dv.byteOffset + dv.byteLength)
        );

        switch (encoding) {
            case CompressionTypes.GZIP:
                return pako.inflate(buffer);
            default:
                return buffer;
        }
    }
}
