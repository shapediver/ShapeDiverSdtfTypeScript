import {
    ISdDtfReadableAccessor,
    ISdDtfWriteableAccessor,
    sdAssertUnreachable,
    SdDtfGrasshopperTypeHintName,
    SdDtfRhinoTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfRhino3dmTypeConfig } from "./SdDtfRhino3dmTypeConfig"

/** Validates values that are of a type hint supported by this integration. */
export class SdDtfRhino3dmTypeValidator {

    constructor (private readonly config: SdDtfRhino3dmTypeConfig) {
    }

    /**
     * Validates the internal representation of the given component type.
     * @throws {@link SdDtfError} when the given type is not supported.
     */
    validateInternalRepresentationOfComponent (
        typeHint: string,
        value?: unknown,
        accessor?: ISdDtfReadableAccessor | ISdDtfWriteableAccessor,
    ): boolean {
        // Map the grasshopper component data and return the result
        if (typeHint === SdDtfGrasshopperTypeHintName.GRASSHOPPER_PATH) {
            return typeof value === "string"
        }

        // Map the rhino component data and return the result
        const rhinoTypeHint = typeHint as SdDtfRhinoTypeHintName
        switch (rhinoTypeHint) {
            case SdDtfRhinoTypeHintName.RHINO_ARC_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_BREP:
            case SdDtfRhinoTypeHintName.RHINO_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_EXTRUSION:
            case SdDtfRhinoTypeHintName.RHINO_LINE_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_MESH:
            case SdDtfRhinoTypeHintName.RHINO_NURBS_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_NURBS_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_PLANE_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_POINT:
            case SdDtfRhinoTypeHintName.RHINO_POLY_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_POLYLINE_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_REV_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_SUBD:
            case SdDtfRhinoTypeHintName.RHINO_SURFACE:
                return !!accessor && value === undefined
            default:
                sdAssertUnreachable(rhinoTypeHint)
        }
    }

    /**
     * Validates the external representation of the given component type.
     * By default, all rhino3dm objects must be valid before they can be written to the sdTF buffer.
     * @throws {@link SdDtfError} when the given type is not supported.
     */
    validateExternalRepresentationOfComponent (
        typeHint: string,
        value?: unknown,
        accessor?: ISdDtfReadableAccessor | ISdDtfWriteableAccessor,
    ): boolean {
        // Map the grasshopper component data and return the result
        if (typeHint === SdDtfGrasshopperTypeHintName.GRASSHOPPER_PATH) {
            return typeof value === "string"
        }

        // Map the rhino component data and return the result
        const rhinoTypeHint = typeHint as SdDtfRhinoTypeHintName
        switch (rhinoTypeHint) {
            case SdDtfRhinoTypeHintName.RHINO_ARC_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_BREP:
            case SdDtfRhinoTypeHintName.RHINO_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_EXTRUSION:
            case SdDtfRhinoTypeHintName.RHINO_LINE_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_MESH:
            case SdDtfRhinoTypeHintName.RHINO_NURBS_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_NURBS_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_PLANE_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_POINT:
            case SdDtfRhinoTypeHintName.RHINO_POLY_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_POLYLINE_CURVE:
            case SdDtfRhinoTypeHintName.RHINO_REV_SURFACE:
            case SdDtfRhinoTypeHintName.RHINO_SUBD:
            case SdDtfRhinoTypeHintName.RHINO_SURFACE:
                // Some rhino objects are not written to file when they are invalid.
                // This validation check makes sure that these scenarios do not result in nasty bugs.
                if (this.config.requireValidRhino3dmComponents) {
                    return !accessor && !!value && (<any>value).isValid
                } else {
                    return !accessor && !!value
                }
            default:
                sdAssertUnreachable(rhinoTypeHint)
        }
    }

}
