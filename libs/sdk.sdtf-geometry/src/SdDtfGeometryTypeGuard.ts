import { isDataObject, isNumberArray, SdDtfError } from "@shapediver/sdk.sdtf-core"
import {
    SdDtfGeometryArcType,
    SdDtfGeometryBoundingBoxType,
    SdDtfGeometryBoxType,
    SdDtfGeometryCircleType,
    SdDtfGeometryComplexType,
    SdDtfGeometryConeType,
    SdDtfGeometryCylinderType,
    SdDtfGeometryEllipseType,
    SdDtfGeometryInterval2Type,
    SdDtfGeometryIntervalType,
    SdDtfGeometryLineType,
    SdDtfGeometryMatrixType,
    SdDtfGeometryPlaneType,
    SdDtfGeometryPoint2d,
    SdDtfGeometryPoint3d,
    SdDtfGeometryPoint4d,
    SdDtfGeometryPointType,
    SdDtfGeometryPolylineType,
    SdDtfGeometryRayType,
    SdDtfGeometryRectangleType,
    SdDtfGeometrySphereType,
    SdDtfGeometryTorusType,
    SdDtfGeometryTransformType,
    SdDtfGeometryVector2d,
    SdDtfGeometryVector3d,
    SdDtfGeometryVectorType,
} from "./ISdDtfGeometryTypes"

export class SdDtfGeometryTypeGuard {

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_ARC`. */
    static assertArc (value: unknown): asserts value is SdDtfGeometryArcType {
        if (!this.isArc(value)) throw new SdDtfError("Assertion error: Value is not a geometry arc type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_ARC`. */
    static isArc (value: unknown): value is SdDtfGeometryArcType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.radius === "number" &&
            typeof value.angle === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX`. */
    static assertBoundingBox (value: unknown): asserts value is SdDtfGeometryBoundingBoxType {
        if (!this.isBoundingBox(value)) throw new SdDtfError("Assertion error: Value is not a geometry bounding box type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX`. */
    static isBoundingBox (value: unknown): value is SdDtfGeometryBoundingBoxType {
        return isDataObject(value) &&
            this.isPoint3d(value.min) &&
            this.isPoint3d(value.max)
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_BOX`. */
    static assertBox (value: unknown): asserts value is SdDtfGeometryBoxType {
        if (!this.isBox(value)) throw new SdDtfError("Assertion error: Value is not a geometry box type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_BOX`. */
    static isBox (value: unknown): value is SdDtfGeometryBoxType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            Array.isArray(value.extents) &&
            value.extents.length === 3 &&
            value.extents.every(e => isNumberArray(e) && e.length === 2)
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_CIRCLE`. */
    static assertCircle (value: unknown): asserts value is SdDtfGeometryCircleType {
        if (!this.isCircle(value)) throw new SdDtfError("Assertion error: Value is not a geometry circle type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_CIRCLE`. */
    static isCircle (value: unknown): value is SdDtfGeometryCircleType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.radius === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_COMPLEX`. */
    static assertComplex (value: unknown): asserts value is SdDtfGeometryComplexType {
        if (!this.isComplex(value)) throw new SdDtfError("Assertion error: Value is not a geometry complex type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_COMPLEX`. */
    static isComplex (value: unknown): value is SdDtfGeometryComplexType {
        return isNumberArray(value) && value.length === 2
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_CONE`. */
    static assertCone (value: unknown): asserts value is SdDtfGeometryConeType {
        if (!this.isCone(value)) throw new SdDtfError("Assertion error: Value is not a geometry cone type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_CONE`. */
    static isCone (value: unknown): value is SdDtfGeometryConeType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.radius === "number" &&
            typeof value.height === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_CYLINDER`. */
    static assertCylinder (value: unknown): asserts value is SdDtfGeometryCylinderType {
        if (!this.isCylinder(value)) throw new SdDtfError("Assertion error: Value is not a geometry cylinder type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_CYLINDER`. */
    static isCylinder (value: unknown): value is SdDtfGeometryCylinderType {
        return isDataObject(value) &&
            this.isCircle(value.baseCircle) &&
            typeof value.height === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_ELLIPSE`. */
    static assertEllipse (value: unknown): asserts value is SdDtfGeometryEllipseType {
        if (!this.isEllipse(value)) throw new SdDtfError("Assertion error: Value is not a geometry ellipse type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_ELLIPSE`. */
    static isEllipse (value: unknown): value is SdDtfGeometryEllipseType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.r1 === "number" &&
            typeof value.r2 === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL`. */
    static assertInterval (value: unknown): asserts value is SdDtfGeometryIntervalType {
        if (!this.isInterval(value)) throw new SdDtfError("Assertion error: Value is not a geometry interval type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL`. */
    static isInterval (value: unknown): value is SdDtfGeometryIntervalType {
        return isNumberArray(value) && value.length === 2
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL2`. */
    static assertInterval2 (value: unknown): asserts value is SdDtfGeometryInterval2Type {
        if (!this.isInterval2(value)) throw new SdDtfError("Assertion error: Value is not a geometry interval2 type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL2`. */
    static isInterval2 (value: unknown): value is SdDtfGeometryInterval2Type {
        return isDataObject(value) &&
            this.isInterval(value.u) &&
            this.isInterval(value.v)
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_LINE`. */
    static assertLine (value: unknown): asserts value is SdDtfGeometryLineType {
        if (!this.isLine(value)) throw new SdDtfError("Assertion error: Value is not a geometry line type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_LINE`. */
    static isLine (value: unknown): value is SdDtfGeometryLineType {
        return Array.isArray(value) &&
            value.length === 2 &&
            this.isPoint3d(value[0]) &&
            this.isPoint3d(value[1])
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_MATRIX`. */
    static assertMatrix (value: unknown): asserts value is SdDtfGeometryMatrixType {
        if (!this.isMatrix(value)) throw new SdDtfError("Assertion error: Value is not a geometry matrix type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_MATRIX`. */
    static isMatrix (value: unknown): value is SdDtfGeometryMatrixType {
        if (!Array.isArray(value)) return false

        // All sub-arrays must have the same length with numeric content
        const nItems = value[0].length
        return value.every(v => isNumberArray(v) && v.length === nItems)
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_PLANE`. */
    static assertPlane (value: unknown): asserts value is SdDtfGeometryPlaneType {
        if (!this.isPlane(value)) throw new SdDtfError("Assertion error: Value is not a geometry plane type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_PLANE`. */
    static isPlane (value: unknown): value is SdDtfGeometryPlaneType {
        return Array.isArray(value) &&
            value.length === 3 &&
            this.isPoint3d(value[0]) &&
            this.isVector3d(value[1]) &&
            this.isVector3d(value[2])
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_POINT`. */
    static assertPoint (value: unknown): asserts value is SdDtfGeometryPointType {
        if (!this.isPoint(value)) throw new SdDtfError("Assertion error: Value is not a geometry point type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_POINT` with 2, 3 or 4 elements. */
    static isPoint (value: unknown): value is SdDtfGeometryPointType {
        return isNumberArray(value) && (value.length === 2 || value.length === 3 || value.length === 4)
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_POINT`. */
    static assertPoint2d (value: unknown): asserts value is SdDtfGeometryPoint2d {
        if (!this.isPoint2d(value)) throw new SdDtfError("Assertion error: Value is not a geometry point type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_POINT` with 2 elements. */
    static isPoint2d (value: unknown): value is SdDtfGeometryPoint2d {
        return isNumberArray(value) && value.length === 2
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_POINT`. */
    static assertPoint3d (value: unknown): asserts value is SdDtfGeometryPoint3d {
        if (!this.isPoint3d(value)) throw new SdDtfError("Assertion error: Value is not a geometry point type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_POINT` with 3 elements. */
    static isPoint3d (value: unknown): value is SdDtfGeometryPoint3d {
        return isNumberArray(value) && value.length === 3
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_POINT`. */
    static assertPoint4d (value: unknown): asserts value is SdDtfGeometryPoint4d {
        if (!this.isPoint4d(value)) throw new SdDtfError("Assertion error: Value is not a geometry point type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_POINT` with 4 elements. */
    static isPoint4d (value: unknown): value is SdDtfGeometryPoint4d {
        return isNumberArray(value) && value.length === 4
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_POLYLINE`. */
    static assertPolyline (value: unknown): asserts value is SdDtfGeometryPolylineType {
        if (!this.isPolyline(value)) throw new SdDtfError("Assertion error: Value is not a geometry polyline type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_POLYLINE`. */
    static isPolyline (value: unknown): value is SdDtfGeometryPolylineType {
        return Array.isArray(value) && value.every(v => this.isPoint3d(v))
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_RAY`. */
    static assertRay (value: unknown): asserts value is SdDtfGeometryRayType {
        if (!this.isRay(value)) throw new SdDtfError("Assertion error: Value is not a geometry ray type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_RAY`. */
    static isRay (value: unknown): value is SdDtfGeometryRayType {
        return Array.isArray(value) &&
            value.length === 2 &&
            this.isPoint3d(value[0]) &&
            this.isVector3d(value[1])
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_RECTANGLE`. */
    static assertRectangle (value: unknown): asserts value is SdDtfGeometryRectangleType {
        if (!this.isRectangle(value)) throw new SdDtfError("Assertion error: Value is not a geometry rectangle type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_RECTANGLE`. */
    static isRectangle (value: unknown): value is SdDtfGeometryRectangleType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            this.isInterval(value.x) &&
            this.isInterval(value.y)
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_SPHERE`. */
    static assertSphere (value: unknown): asserts value is SdDtfGeometrySphereType {
        if (!this.isSphere(value)) throw new SdDtfError("Assertion error: Value is not a geometry sphere type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_SPHERE`. */
    static isSphere (value: unknown): value is SdDtfGeometrySphereType {
        return isDataObject(value) &&
            this.isPoint3d(value.center) &&
            typeof value.radius === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_TORUS`. */
    static assertTorus (value: unknown): asserts value is SdDtfGeometryTorusType {
        if (!this.isTorus(value)) throw new SdDtfError("Assertion error: Value is not a geometry torus type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_TORUS`. */
    static isTorus (value: unknown): value is SdDtfGeometryTorusType {
        return isDataObject(value) &&
            this.isPlane(value.plane) &&
            typeof value.majorRadius === "number" &&
            typeof value.minorRadius === "number"
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_TRANSFORM`. */
    static assertTransform (value: unknown): asserts value is SdDtfGeometryTransformType {
        if (!this.isTransform(value)) throw new SdDtfError("Assertion error: Value is not a geometry transform type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_TRANSFORM`. */
    static isTransform (value: unknown): value is SdDtfGeometryTransformType {
        return Array.isArray(value) && value.length === 4 && value.every(v => isNumberArray(v) && v.length === 4)
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_VECTOR`. */
    static assertVector (value: unknown): asserts value is SdDtfGeometryVectorType {
        if (!this.isVector(value)) throw new SdDtfError("Assertion error: Value is not a geometry vector type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_VECTOR` with 2 or 3 elements. */
    static isVector (value: unknown): value is SdDtfGeometryVectorType {
        return isNumberArray(value) && (value.length === 2 || value.length === 3)
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_VECTOR`. */
    static assertVector2d (value: unknown): asserts value is SdDtfGeometryVector2d {
        if (!this.isVector2d(value)) throw new SdDtfError("Assertion error: Value is not a geometry vector type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_VECTOR` with 2 elements. */
    private static isVector2d (value: unknown): value is SdDtfGeometryVector2d {
        return isNumberArray(value) && value.length === 2
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfGeometryTypeHintName.GEOMETRY_VECTOR`. */
    static assertVector3d (value: unknown): asserts value is SdDtfGeometryVector3d {
        if (!this.isVector3d(value)) throw new SdDtfError("Assertion error: Value is not a geometry vector type.")
    }

    /** Returns `true` when the given value is of type `SdDtfGeometryTypeHintName.GEOMETRY_VECTOR` with 3 elements. */
    private static isVector3d (value: unknown): value is SdDtfGeometryVector3d {
        return isNumberArray(value) && value.length === 3
    }

}
