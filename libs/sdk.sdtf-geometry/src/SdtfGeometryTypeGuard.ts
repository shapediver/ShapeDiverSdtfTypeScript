import { isDataObject, isNumberArray, SdtfError } from "@shapediver/sdk.sdtf-core"
import {
    SdtfGeometryArcType,
    SdtfGeometryBoundingBoxType,
    SdtfGeometryBoxType,
    SdtfGeometryCircleType,
    SdtfGeometryComplexType,
    SdtfGeometryConeType,
    SdtfGeometryCylinderType,
    SdtfGeometryEllipseType,
    SdtfGeometryInterval2Type,
    SdtfGeometryIntervalType,
    SdtfGeometryLineType,
    SdtfGeometryMatrixType,
    SdtfGeometryPlaneType,
    SdtfGeometryPoint2d,
    SdtfGeometryPoint3d,
    SdtfGeometryPoint4d,
    SdtfGeometryPointType,
    SdtfGeometryPolylineType,
    SdtfGeometryRayType,
    SdtfGeometryRectangleType,
    SdtfGeometrySphereType,
    SdtfGeometryTorusType,
    SdtfGeometryTransformType,
    SdtfGeometryVector2d,
    SdtfGeometryVector3d,
    SdtfGeometryVectorType,
} from "./ISdtfGeometryTypes"

export class SdtfGeometryTypeGuard {

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_ARC`. */
    static assertArc (value: unknown): asserts value is SdtfGeometryArcType {
        if (!this.isArc(value)) throw new SdtfError("Assertion error: Value is not a geometry arc type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_ARC`. */
    static isArc (value: unknown): value is SdtfGeometryArcType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.radius === "number" &&
            typeof value.angle === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX`. */
    static assertBoundingBox (value: unknown): asserts value is SdtfGeometryBoundingBoxType {
        if (!this.isBoundingBox(value)) throw new SdtfError("Assertion error: Value is not a geometry bounding box type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX`. */
    static isBoundingBox (value: unknown): value is SdtfGeometryBoundingBoxType {
        return isDataObject(value) &&
            this.isPoint3d(value.min) &&
            this.isPoint3d(value.max)
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_BOX`. */
    static assertBox (value: unknown): asserts value is SdtfGeometryBoxType {
        if (!this.isBox(value)) throw new SdtfError("Assertion error: Value is not a geometry box type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_BOX`. */
    static isBox (value: unknown): value is SdtfGeometryBoxType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            Array.isArray(value.extents) &&
            value.extents.length === 3 &&
            value.extents.every(e => isNumberArray(e) && e.length === 2)
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_CIRCLE`. */
    static assertCircle (value: unknown): asserts value is SdtfGeometryCircleType {
        if (!this.isCircle(value)) throw new SdtfError("Assertion error: Value is not a geometry circle type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_CIRCLE`. */
    static isCircle (value: unknown): value is SdtfGeometryCircleType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.radius === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_COMPLEX`. */
    static assertComplex (value: unknown): asserts value is SdtfGeometryComplexType {
        if (!this.isComplex(value)) throw new SdtfError("Assertion error: Value is not a geometry complex type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_COMPLEX`. */
    static isComplex (value: unknown): value is SdtfGeometryComplexType {
        return isNumberArray(value) && value.length === 2
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_CONE`. */
    static assertCone (value: unknown): asserts value is SdtfGeometryConeType {
        if (!this.isCone(value)) throw new SdtfError("Assertion error: Value is not a geometry cone type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_CONE`. */
    static isCone (value: unknown): value is SdtfGeometryConeType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.radius === "number" &&
            typeof value.height === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_CYLINDER`. */
    static assertCylinder (value: unknown): asserts value is SdtfGeometryCylinderType {
        if (!this.isCylinder(value)) throw new SdtfError("Assertion error: Value is not a geometry cylinder type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_CYLINDER`. */
    static isCylinder (value: unknown): value is SdtfGeometryCylinderType {
        return isDataObject(value) &&
            this.isCircle(value.baseCircle) &&
            typeof value.height === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_ELLIPSE`. */
    static assertEllipse (value: unknown): asserts value is SdtfGeometryEllipseType {
        if (!this.isEllipse(value)) throw new SdtfError("Assertion error: Value is not a geometry ellipse type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_ELLIPSE`. */
    static isEllipse (value: unknown): value is SdtfGeometryEllipseType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.r1 === "number" &&
            typeof value.r2 === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_INTERVAL`. */
    static assertInterval (value: unknown): asserts value is SdtfGeometryIntervalType {
        if (!this.isInterval(value)) throw new SdtfError("Assertion error: Value is not a geometry interval type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_INTERVAL`. */
    static isInterval (value: unknown): value is SdtfGeometryIntervalType {
        return isNumberArray(value) && value.length === 2
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_INTERVAL2`. */
    static assertInterval2 (value: unknown): asserts value is SdtfGeometryInterval2Type {
        if (!this.isInterval2(value)) throw new SdtfError("Assertion error: Value is not a geometry interval2 type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_INTERVAL2`. */
    static isInterval2 (value: unknown): value is SdtfGeometryInterval2Type {
        return isDataObject(value) &&
            this.isInterval(value.u) &&
            this.isInterval(value.v)
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_LINE`. */
    static assertLine (value: unknown): asserts value is SdtfGeometryLineType {
        if (!this.isLine(value)) throw new SdtfError("Assertion error: Value is not a geometry line type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_LINE`. */
    static isLine (value: unknown): value is SdtfGeometryLineType {
        return Array.isArray(value) &&
            value.length === 2 &&
            this.isPoint3d(value[0]) &&
            this.isPoint3d(value[1])
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_MATRIX`. */
    static assertMatrix (value: unknown): asserts value is SdtfGeometryMatrixType {
        if (!this.isMatrix(value)) throw new SdtfError("Assertion error: Value is not a geometry matrix type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_MATRIX`. */
    static isMatrix (value: unknown): value is SdtfGeometryMatrixType {
        if (!Array.isArray(value)) return false

        // All sub-arrays must have the same length with numeric content
        const nItems = value[0].length
        return value.every(v => isNumberArray(v) && v.length === nItems)
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_PLANE`. */
    static assertPlane (value: unknown): asserts value is SdtfGeometryPlaneType {
        if (!this.isPlane(value)) throw new SdtfError("Assertion error: Value is not a geometry plane type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_PLANE`. */
    static isPlane (value: unknown): value is SdtfGeometryPlaneType {
        return Array.isArray(value) &&
            value.length === 3 &&
            this.isPoint3d(value[0]) &&
            this.isVector3d(value[1]) &&
            this.isVector3d(value[2])
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_POINT`. */
    static assertPoint (value: unknown): asserts value is SdtfGeometryPointType {
        if (!this.isPoint(value)) throw new SdtfError("Assertion error: Value is not a geometry point type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_POINT` with 2, 3 or 4 elements. */
    static isPoint (value: unknown): value is SdtfGeometryPointType {
        return isNumberArray(value) && (value.length === 2 || value.length === 3 || value.length === 4)
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_POINT`. */
    static assertPoint2d (value: unknown): asserts value is SdtfGeometryPoint2d {
        if (!this.isPoint2d(value)) throw new SdtfError("Assertion error: Value is not a geometry point type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_POINT` with 2 elements. */
    static isPoint2d (value: unknown): value is SdtfGeometryPoint2d {
        return isNumberArray(value) && value.length === 2
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_POINT`. */
    static assertPoint3d (value: unknown): asserts value is SdtfGeometryPoint3d {
        if (!this.isPoint3d(value)) throw new SdtfError("Assertion error: Value is not a geometry point type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_POINT` with 3 elements. */
    static isPoint3d (value: unknown): value is SdtfGeometryPoint3d {
        return isNumberArray(value) && value.length === 3
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_POINT`. */
    static assertPoint4d (value: unknown): asserts value is SdtfGeometryPoint4d {
        if (!this.isPoint4d(value)) throw new SdtfError("Assertion error: Value is not a geometry point type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_POINT` with 4 elements. */
    static isPoint4d (value: unknown): value is SdtfGeometryPoint4d {
        return isNumberArray(value) && value.length === 4
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_POLYLINE`. */
    static assertPolyline (value: unknown): asserts value is SdtfGeometryPolylineType {
        if (!this.isPolyline(value)) throw new SdtfError("Assertion error: Value is not a geometry polyline type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_POLYLINE`. */
    static isPolyline (value: unknown): value is SdtfGeometryPolylineType {
        return Array.isArray(value) && value.every(v => this.isPoint3d(v))
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_RAY`. */
    static assertRay (value: unknown): asserts value is SdtfGeometryRayType {
        if (!this.isRay(value)) throw new SdtfError("Assertion error: Value is not a geometry ray type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_RAY`. */
    static isRay (value: unknown): value is SdtfGeometryRayType {
        return Array.isArray(value) &&
            value.length === 2 &&
            this.isPoint3d(value[0]) &&
            this.isVector3d(value[1])
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_RECTANGLE`. */
    static assertRectangle (value: unknown): asserts value is SdtfGeometryRectangleType {
        if (!this.isRectangle(value)) throw new SdtfError("Assertion error: Value is not a geometry rectangle type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_RECTANGLE`. */
    static isRectangle (value: unknown): value is SdtfGeometryRectangleType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            this.isInterval(value.x) &&
            this.isInterval(value.y)
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_SPHERE`. */
    static assertSphere (value: unknown): asserts value is SdtfGeometrySphereType {
        if (!this.isSphere(value)) throw new SdtfError("Assertion error: Value is not a geometry sphere type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_SPHERE`. */
    static isSphere (value: unknown): value is SdtfGeometrySphereType {
        return isDataObject(value) &&
            this.isPoint3d(value.center) &&
            typeof value.radius === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_TORUS`. */
    static assertTorus (value: unknown): asserts value is SdtfGeometryTorusType {
        if (!this.isTorus(value)) throw new SdtfError("Assertion error: Value is not a geometry torus type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_TORUS`. */
    static isTorus (value: unknown): value is SdtfGeometryTorusType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.majorRadius === "number" &&
            typeof value.minorRadius === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM`. */
    static assertTransform (value: unknown): asserts value is SdtfGeometryTransformType {
        if (!this.isTransform(value)) throw new SdtfError("Assertion error: Value is not a geometry transform type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM`. */
    static isTransform (value: unknown): value is SdtfGeometryTransformType {
        return Array.isArray(value) && value.length === 4 && value.every(v => isNumberArray(v) && v.length === 4)
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_VECTOR`. */
    static assertVector (value: unknown): asserts value is SdtfGeometryVectorType {
        if (!this.isVector(value)) throw new SdtfError("Assertion error: Value is not a geometry vector type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_VECTOR` with 2 or 3 elements. */
    static isVector (value: unknown): value is SdtfGeometryVectorType {
        return isNumberArray(value) && (value.length === 2 || value.length === 3)
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_VECTOR`. */
    static assertVector2d (value: unknown): asserts value is SdtfGeometryVector2d {
        if (!this.isVector2d(value)) throw new SdtfError("Assertion error: Value is not a geometry vector type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_VECTOR` with 2 elements. */
    private static isVector2d (value: unknown): value is SdtfGeometryVector2d {
        return isNumberArray(value) && value.length === 2
    }

    /** Runtime check that raises an error when the given value is not of type `SdtfGeometryTypeHintName.GEOMETRY_VECTOR`. */
    static assertVector3d (value: unknown): asserts value is SdtfGeometryVector3d {
        if (!this.isVector3d(value)) throw new SdtfError("Assertion error: Value is not a geometry vector type.")
    }

    /** Returns `true` when the given value is of type `SdtfGeometryTypeHintName.GEOMETRY_VECTOR` with 3 elements. */
    private static isVector3d (value: unknown): value is SdtfGeometryVector3d {
        return isNumberArray(value) && value.length === 3
    }

}
