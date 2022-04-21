export interface SdDtfGeometryArcType {

    plane: SdDtfGeometryPlaneType,

    radius: number,

    angle: number,

}

export interface SdDtfGeometryBoundingBoxType {

    min: SdDtfGeometryPoint3d,

    max: SdDtfGeometryPoint3d,

}

export interface SdDtfGeometryBoxType {

    plane: SdDtfGeometryPlaneType,

    /**
     * Holds the following data in this order:
     *   * Box: X-min, X-max
     *   * Box: Y-min, Y-max
     *   * Box: Z-min, Z-max
     */
    extents: [
        [ number, number ],
        [ number, number ],
        [ number, number ],
    ]

}

export interface SdDtfGeometryCircleType {

    plane: SdDtfGeometryPlaneType,

    radius: number,

}

/** Holds the _real_ and _imaginary_ parts of a complex. */
export type SdDtfGeometryComplexType = [ number, number ]

export interface SdDtfGeometryConeType {

    plane: SdDtfGeometryPlaneType,

    radius: number,

    height: number,

}

export interface SdDtfGeometryCylinderType {

    baseCircle: SdDtfGeometryCircleType,

    height: number,

}

export interface SdDtfGeometryEllipseType {

    plane: SdDtfGeometryPlaneType,

    r1: number,

    r2: number,

}

export type SdDtfGeometryIntervalType = [ number, number ]

export interface SdDtfGeometryInterval2Type {

    u: SdDtfGeometryIntervalType,

    v: SdDtfGeometryIntervalType,

}

export type SdDtfGeometryLineType = [ SdDtfGeometryPoint3d, SdDtfGeometryPoint3d ]

export type SdDtfGeometryMatrixType = number[][]

/**
 * Holds the following data in this order:
 *   * Origin
 *   * X-Axis
 *   * Y-Axis
 */
export type SdDtfGeometryPlaneType = [
    SdDtfGeometryPoint3d,
    SdDtfGeometryVector3d,
    SdDtfGeometryVector3d,
]

export type SdDtfGeometryPointType = SdDtfGeometryPoint2d | SdDtfGeometryPoint3d | SdDtfGeometryPoint4d
export type SdDtfGeometryPoint2d = [ number, number ]
export type SdDtfGeometryPoint3d = [ number, number, number ]
export type SdDtfGeometryPoint4d = [ number, number, number, number ]

export type SdDtfGeometryPolylineType = SdDtfGeometryPoint3d[]

/** Holds the _origin_ and _direction_ of a ray. */
export type SdDtfGeometryRayType = [ SdDtfGeometryPoint3d, SdDtfGeometryVector3d ]

export interface SdDtfGeometryRectangleType {

    plane: SdDtfGeometryPlaneType,

    x: SdDtfGeometryIntervalType,

    y: SdDtfGeometryIntervalType,

}

export interface SdDtfGeometrySphereType {

    center: SdDtfGeometryPoint3d,

    radius: number,

}

export interface SdDtfGeometryTorusType {

    plane: SdDtfGeometryPlaneType,

    majorRadius: number,

    minorRadius: number

}

export type SdDtfGeometryTransformType = [
    [ number, number, number, number ],
    [ number, number, number, number ],
    [ number, number, number, number ],
    [ number, number, number, number ],
]

export type SdDtfGeometryVectorType = SdDtfGeometryVector2d | SdDtfGeometryVector3d
export type SdDtfGeometryVector2d = [ number, number ]
export type SdDtfGeometryVector3d = [ number, number, number ]
