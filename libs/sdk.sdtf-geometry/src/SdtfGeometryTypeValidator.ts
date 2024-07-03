import {
    ISdtfReadableAccessor,
    ISdtfWriteableAccessor,
    sdAssertUnreachable,
    SdtfGeometryTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { SdtfGeometryTypeGuard } from './SdtfGeometryTypeGuard';

/** Validates values that are of a type hint supported by this integration. */
export class SdtfGeometryTypeValidator {
    /**
     * Validates the given component of the given type.
     * @throws {@link SdtfError} when the given type is not supported.
     */
    validateComponent(
        typeHint: SdtfGeometryTypeHintName,
        value?: unknown,
        accessor?: ISdtfReadableAccessor | ISdtfWriteableAccessor
    ): boolean {
        switch (typeHint) {
            case SdtfGeometryTypeHintName.GEOMETRY_ARC:
                return SdtfGeometryTypeGuard.isArc(value);
            case SdtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX:
                return SdtfGeometryTypeGuard.isBoundingBox(value);
            case SdtfGeometryTypeHintName.GEOMETRY_BOX:
                return SdtfGeometryTypeGuard.isBox(value);
            case SdtfGeometryTypeHintName.GEOMETRY_CIRCLE:
                return SdtfGeometryTypeGuard.isCircle(value);
            case SdtfGeometryTypeHintName.GEOMETRY_COMPLEX:
                return SdtfGeometryTypeGuard.isComplex(value);
            case SdtfGeometryTypeHintName.GEOMETRY_CONE:
                return SdtfGeometryTypeGuard.isCone(value);
            case SdtfGeometryTypeHintName.GEOMETRY_CYLINDER:
                return SdtfGeometryTypeGuard.isCylinder(value);
            case SdtfGeometryTypeHintName.GEOMETRY_ELLIPSE:
                return SdtfGeometryTypeGuard.isEllipse(value);
            case SdtfGeometryTypeHintName.GEOMETRY_INTERVAL:
                return SdtfGeometryTypeGuard.isInterval(value);
            case SdtfGeometryTypeHintName.GEOMETRY_INTERVAL2:
                return SdtfGeometryTypeGuard.isInterval2(value);
            case SdtfGeometryTypeHintName.GEOMETRY_LINE:
                return SdtfGeometryTypeGuard.isLine(value);
            case SdtfGeometryTypeHintName.GEOMETRY_MATRIX:
                return SdtfGeometryTypeGuard.isMatrix(value);
            case SdtfGeometryTypeHintName.GEOMETRY_PLANE:
                return SdtfGeometryTypeGuard.isPlane(value);
            case SdtfGeometryTypeHintName.GEOMETRY_POINT:
                return SdtfGeometryTypeGuard.isPoint(value);
            case SdtfGeometryTypeHintName.GEOMETRY_POINT2D:
                return SdtfGeometryTypeGuard.isPoint2d(value);
            case SdtfGeometryTypeHintName.GEOMETRY_POINT3D:
                return SdtfGeometryTypeGuard.isPoint3d(value);
            case SdtfGeometryTypeHintName.GEOMETRY_POINT4D:
                return SdtfGeometryTypeGuard.isPoint4d(value);
            case SdtfGeometryTypeHintName.GEOMETRY_POLYLINE:
                return SdtfGeometryTypeGuard.isPolyline(value);
            case SdtfGeometryTypeHintName.GEOMETRY_RAY:
                return SdtfGeometryTypeGuard.isRay(value);
            case SdtfGeometryTypeHintName.GEOMETRY_RECTANGLE:
                return SdtfGeometryTypeGuard.isRectangle(value);
            case SdtfGeometryTypeHintName.GEOMETRY_SPHERE:
                return SdtfGeometryTypeGuard.isSphere(value);
            case SdtfGeometryTypeHintName.GEOMETRY_TORUS:
                return SdtfGeometryTypeGuard.isTorus(value);
            case SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM:
                return SdtfGeometryTypeGuard.isTransform(value);
            case SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM_LIST:
                return SdtfGeometryTypeGuard.isTransformList(value);
            case SdtfGeometryTypeHintName.GEOMETRY_VECTOR:
                return SdtfGeometryTypeGuard.isVector(value);
            case SdtfGeometryTypeHintName.GEOMETRY_VECTOR2D:
                return SdtfGeometryTypeGuard.isVector2d(value);
            case SdtfGeometryTypeHintName.GEOMETRY_VECTOR3D:
                return SdtfGeometryTypeGuard.isVector3d(value);
            case SdtfGeometryTypeHintName.GEOMETRY_VECTOR4D:
                return SdtfGeometryTypeGuard.isVector4d(value);
            default:
                sdAssertUnreachable(typeHint);
        }
    }
}
