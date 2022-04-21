import {
    ISdDtfReadableAccessor,
    ISdDtfWriteableAccessor,
    sdAssertUnreachable,
    SdDtfGeometryTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfGeometryTypeGuard } from "./SdDtfGeometryTypeGuard"

/** Validates values that are of a type hint supported by this integration. */
export class SdDtfGeometryTypeValidator {

    /**
     * Validates the given component of the given type.
     * @throws {@link SdDtfError} when the given type is not supported.
     */
    validateComponent (typeHint: SdDtfGeometryTypeHintName, value?: unknown, accessor?: ISdDtfReadableAccessor | ISdDtfWriteableAccessor): boolean {
        switch (typeHint) {
            case SdDtfGeometryTypeHintName.GEOMETRY_ARC:
                return SdDtfGeometryTypeGuard.isArc(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX:
                return SdDtfGeometryTypeGuard.isBoundingBox(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_BOX:
                return SdDtfGeometryTypeGuard.isBox(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_CIRCLE:
                return SdDtfGeometryTypeGuard.isCircle(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_COMPLEX:
                return SdDtfGeometryTypeGuard.isComplex(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_CONE:
                return SdDtfGeometryTypeGuard.isCone(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_CYLINDER:
                return SdDtfGeometryTypeGuard.isCylinder(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_ELLIPSE:
                return SdDtfGeometryTypeGuard.isEllipse(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL:
                return SdDtfGeometryTypeGuard.isInterval(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL2:
                return SdDtfGeometryTypeGuard.isInterval2(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_LINE:
                return SdDtfGeometryTypeGuard.isLine(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_MATRIX:
                return SdDtfGeometryTypeGuard.isMatrix(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_PLANE:
                return SdDtfGeometryTypeGuard.isPlane(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_POINT:
                return SdDtfGeometryTypeGuard.isPoint(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_POLYLINE:
                return SdDtfGeometryTypeGuard.isPolyline(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_RAY:
                return SdDtfGeometryTypeGuard.isRay(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_RECTANGLE:
                return SdDtfGeometryTypeGuard.isRectangle(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_SPHERE:
                return SdDtfGeometryTypeGuard.isSphere(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_TORUS:
                return SdDtfGeometryTypeGuard.isTorus(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_TRANSFORM:
                return SdDtfGeometryTypeGuard.isTransform(value)
            case SdDtfGeometryTypeHintName.GEOMETRY_VECTOR:
                return SdDtfGeometryTypeGuard.isVector(value)
            default:
                sdAssertUnreachable(typeHint)
        }
    }

}
