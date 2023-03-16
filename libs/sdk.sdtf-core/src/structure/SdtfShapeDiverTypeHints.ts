export enum SdtfPrimitiveTypeHintName {
    BOOLEAN = "boolean",
    CHAR = "char",
    COLOR = "color",
    DATA = "data",
    DECIMAL = "decimal",
    DOUBLE = "double",
    GUID = "guid",
    IMAGE = "image",
    INT8 = "int8",
    INT16 = "int16",
    INT32 = "int32",
    INT64 = "int64",
    JSON = "json",
    SINGLE = "single",  // single-precision floating point
    STRING = "string",
    UINT8 = "uint8",
    UINT16 = "uint16",
    UINT32 = "uint32",
    UINT64 = "uint64",
}

export enum SdtfGeometryTypeHintName {
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
    GEOMETRY_POINT2D = "geometry.point2d",
    GEOMETRY_POINT3D = "geometry.point3d",
    GEOMETRY_POINT4D = "geometry.point4d",
    GEOMETRY_POLYLINE = "geometry.polyline",
    GEOMETRY_RAY = "geometry.ray",
    GEOMETRY_RECTANGLE = "geometry.rectangle",
    GEOMETRY_SPHERE = "geometry.sphere",
    GEOMETRY_TORUS = "geometry.torus",
    GEOMETRY_TRANSFORM = "geometry.transform",
    GEOMETRY_TRANSFORM_LIST = "geometry.transformlist",
    GEOMETRY_VECTOR = "geometry.vector",
    GEOMETRY_VECTOR2D = "geometry.vector2d",
    GEOMETRY_VECTOR3D = "geometry.vector3d",
    GEOMETRY_VECTOR4D = "geometry.vector4d",
}

export enum SdtfGrasshopperTypeHintName {
    GRASSHOPPER_PATH = "grasshopper.path",
}

export enum SdtfRhinoTypeHintName {
    RHINO_ARC_CURVE = "rhino.arccurve",
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
    RHINO_REV_SURFACE = "rhino.revsurface",
    RHINO_SUBD = "rhino.subd",
    RHINO_SURFACE = "rhino.surface",
}

/** Holds all supported type hints. */
export const SdtfTypeHintName = {
    ...SdtfPrimitiveTypeHintName,
    ...SdtfGeometryTypeHintName,
    ...SdtfGrasshopperTypeHintName,
    ...SdtfRhinoTypeHintName,
}
export type SdtfTypeHintName = typeof SdtfTypeHintName[keyof typeof SdtfTypeHintName]
