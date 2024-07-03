import {
    ISdtfReadableAccessor,
    ISdtfWriteableAccessor,
    sdAssertUnreachable,
    SdtfGrasshopperTypeHintName,
    SdtfRhinoTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { SdtfRhino3dmTypeConfig } from './SdtfRhino3dmTypeConfig';

/** Validates values that are of a type hint supported by this integration. */
export class SdtfRhino3dmTypeValidator {
    constructor(private readonly config: SdtfRhino3dmTypeConfig) {}

    /**
     * Validates the internal representation of the given component type.
     * @throws {@link SdtfError} when the given type is not supported.
     */
    validateInternalRepresentationOfComponent(
        typeHint: string,
        value?: unknown,
        accessor?: ISdtfReadableAccessor | ISdtfWriteableAccessor
    ): boolean {
        // Map the grasshopper component data and return the result
        if (typeHint === SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH) {
            return typeof value === 'string';
        }

        // Map the rhino component data and return the result
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
                return !!accessor && value === undefined;
            default:
                sdAssertUnreachable(rhinoTypeHint);
        }
    }

    /**
     * Validates the external representation of the given component type.
     * By default, all rhino3dm objects must be valid before they can be written to the sdTF buffer.
     * @throws {@link SdtfError} when the given type is not supported.
     */
    validateExternalRepresentationOfComponent(
        typeHint: string,
        value?: unknown,
        accessor?: ISdtfReadableAccessor | ISdtfWriteableAccessor
    ): boolean {
        // Map the grasshopper component data and return the result
        if (typeHint === SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH) {
            return typeof value === 'string';
        }

        // Map the rhino component data and return the result
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
                // Some rhino objects are not written to file when they are invalid.
                // This validation check makes sure that these scenarios do not result in nasty bugs.
                if (this.config.requireValidRhino3dmComponents) {
                    return !accessor && !!value && (<any>value).isValid;
                } else {
                    return !accessor && !!value;
                }
            default:
                sdAssertUnreachable(rhinoTypeHint);
        }
    }
}
