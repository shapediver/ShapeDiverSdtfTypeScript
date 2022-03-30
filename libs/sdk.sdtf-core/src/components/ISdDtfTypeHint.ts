import { ISdDtfBaseComponent } from "./ISdDtfBaseComponent"

/** Type hints are used to add information about the type of data items found below a specific node in the tree. */
export interface ISdDtfTypeHint extends ISdDtfBaseComponent {

    /** Holds the sequential index in the sdTF asset structure. */
    componentId: number

    /** Name of the type hint. */
    name: SdDtfTypeHintName | string

    /** Additional properties are allowed. */
    [custom: string]: unknown

}

export enum SdDtfPrimitiveTypeHintName {
    BOOLEAN = "boolean",
    CHAR = "char",
    COLOR = "color",
    DECIMAL = "decimal",
    DOUBLE = "double",
    GUID = "guid",
    IMAGE = "image",
    INT8 = "int8",
    INT16 = "int16",
    INT32 = "int32",
    INT64 = "int64",
    SINGLE = "single",
    STRING = "string",
    UINT8 = "uint8",
    UINT16 = "uint16",
    UINT32 = "uint32",
    UINT64 = "uint64",
}

export enum SdDtfGeometryTypeHintName {
    GEOMETRY_ARC = "geometry.arc",
    GEOMETRY_BOUNDING_BOX = "geometry.boundingbox",
    GEOMETRY_BOX = "geometry.box",
    GEOMETRY_CIRCLE = "geometry.circle",
    GEOMETRY_COMPLEX = "geometry.complex",
    GEOMETRY_CONE = "geometry.cone",
    GEOMETRY_CYLINDER = "geometry.cylinder",
    GEOMETRY_ELLIPSE = "geometry.ellipse",
    GEOMETRY_INTERVAL = "geometry.interval",
    GEOMETRY_INTERVAL2 = "geometry.interval2",
    GEOMETRY_LINE = "geometry.line",
    GEOMETRY_MATRIX = "geometry.matrix",
    GEOMETRY_PLANE = "geometry.plane",
    GEOMETRY_POINT = "geometry.point",
    GEOMETRY_POLYLINE = "geometry.polyline",
    GEOMETRY_RAY = "geometry.ray",
    GEOMETRY_RECTANGLE = "geometry.rectangle",
    GEOMETRY_SPHERE = "geometry.sphere",
    GEOMETRY_TORUS = "geometry.torus",
    GEOMETRY_TRANSFORM = "geometry.transform",
    GEOMETRY_VECTOR = "geometry.vector",
}

export enum SdDtfGrasshopperTypeHintName {
    GRASSHOPPER_PATH = "grasshopper.path",
}

export enum SdDtfRhinoTypeHintName {
    RHINO_ARC_CURVE = "rhino.arccurve",
    RHINO_BEZIER_CURVE = "rhino.beziercurve",
    RHINO_BREP = "rhino.brep",
    RHINO_CURVE = "rhino.curve",
    RHINO_EXTRUSION = "rhino.extrusion",
    RHINO_LINE_CURVE = "rhino.linecurve",
    RHINO_MESH = "rhino.mesh",
    RHINO_NURBS_CURVE = "rhino.nurbscurve",
    RHINO_NURBS_SURFACE = "rhino.nurbssurface",
    RHINO_PLANE_SURFACE = "rhino.planesurface",
    RHINO_POINT = "rhino.point",
    RHINO_POLY_CURVE = "rhino.polycurve",
    RHINO_POLYLINE_CURVE = "rhino.polylinecurve",
}

/** Holds all supported type hints. */
export const SdDtfTypeHintName = {
    ...SdDtfPrimitiveTypeHintName,
    ...SdDtfGeometryTypeHintName,
    ...SdDtfGrasshopperTypeHintName,
    ...SdDtfRhinoTypeHintName,
}
export type SdDtfTypeHintName = typeof SdDtfTypeHintName[keyof typeof SdDtfTypeHintName]
