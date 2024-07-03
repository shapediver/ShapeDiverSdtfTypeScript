export interface SdtfGeometryArcType {
    plane: SdtfGeometryPlaneType;

    radius: number;

    angle: number;
}

export interface SdtfGeometryBoundingBoxType {
    min: SdtfGeometryPoint3d;

    max: SdtfGeometryPoint3d;
}

export interface SdtfGeometryBoxType {
    plane: SdtfGeometryPlaneType;

    /**
     * Holds the following data in this order:
     *   * Box: X-min, X-max
     *   * Box: Y-min, Y-max
     *   * Box: Z-min, Z-max
     */
    extents: [[number, number], [number, number], [number, number]];
}

export interface SdtfGeometryCircleType {
    plane: SdtfGeometryPlaneType;

    radius: number;
}

/** Holds the _real_ and _imaginary_ parts of a complex. */
export type SdtfGeometryComplexType = [number, number];

export interface SdtfGeometryConeType {
    plane: SdtfGeometryPlaneType;

    radius: number;

    height: number;
}

export interface SdtfGeometryCylinderType {
    baseCircle: SdtfGeometryCircleType;

    height: number;
}

export interface SdtfGeometryEllipseType {
    plane: SdtfGeometryPlaneType;

    r1: number;

    r2: number;
}

export type SdtfGeometryIntervalType = [number, number];

export interface SdtfGeometryInterval2Type {
    u: SdtfGeometryIntervalType;

    v: SdtfGeometryIntervalType;
}

export type SdtfGeometryLineType = [SdtfGeometryPoint3d, SdtfGeometryPoint3d];

export type SdtfGeometryMatrixType = number[][];

/**
 * Holds the following data in this order:
 *   * Origin
 *   * X-Axis
 *   * Y-Axis
 */
export type SdtfGeometryPlaneType = [
    SdtfGeometryPoint3d,
    SdtfGeometryVector3d,
    SdtfGeometryVector3d,
];

export type SdtfGeometryPointType =
    | SdtfGeometryPoint2d
    | SdtfGeometryPoint3d
    | SdtfGeometryPoint4d;
export type SdtfGeometryPoint2d = [number, number];
export type SdtfGeometryPoint3d = [number, number, number];
export type SdtfGeometryPoint4d = [number, number, number, number];

export type SdtfGeometryPolylineType = SdtfGeometryPoint3d[];

/** Holds the _origin_ and _direction_ of a ray. */
export type SdtfGeometryRayType = [SdtfGeometryPoint3d, SdtfGeometryVector3d];

export interface SdtfGeometryRectangleType {
    plane: SdtfGeometryPlaneType;

    x: SdtfGeometryIntervalType;

    y: SdtfGeometryIntervalType;
}

export interface SdtfGeometrySphereType {
    center: SdtfGeometryPoint3d;

    radius: number;
}

export interface SdtfGeometryTorusType {
    plane: SdtfGeometryPlaneType;

    majorRadius: number;

    minorRadius: number;
}

export type SdtfGeometryTransformType = [
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
];
export type SdtfGeometryTransformListType = SdtfGeometryTransformType[];

export type SdtfGeometryVectorType =
    | SdtfGeometryVector2d
    | SdtfGeometryVector3d
    | SdtfGeometryVector4d;
export type SdtfGeometryVector2d = [number, number];
export type SdtfGeometryVector3d = [number, number, number];
export type SdtfGeometryVector4d = [number, number, number, number];
