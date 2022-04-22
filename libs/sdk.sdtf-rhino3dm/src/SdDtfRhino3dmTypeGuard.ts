import { SdDtfError } from "@shapediver/sdk.sdtf-core"
import {
    ArcCurve,
    Brep,
    Curve,
    Extrusion,
    LineCurve,
    Mesh,
    NurbsCurve,
    NurbsSurface,
    PlaneSurface,
    Point,
    PolyCurve,
    PolylineCurve,
    RevSurface,
    SubD,
    Surface,
} from "rhino3dm"
import { SdDtfRhino3dmSingleton } from "./SdDtfRhino3dmSingleton"

export class SdDtfRhino3dmTypeGuard {

    /** Runtime check that raises an error when the given value is not of type `SdDtfGrasshopperTypeHintName.GRASSHOPPER_PATH`. */
    static assertGrasshopperPath (value: unknown): asserts value is string {
        if (!this.isGrasshopperPath(value)) throw new SdDtfError("Assertion error: Value is not a Grasshopper path.")
    }

    /** Returns `true` when the given value is of type `SdDtfGrasshopperTypeHintName.GRASSHOPPER_PATH`. */
    static isGrasshopperPath (value: unknown): value is string {
        return typeof value === "string"
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_ARC_CURVE`. */
    static assertArcCurve (value: unknown): asserts value is ArcCurve {
        if (!this.isArcCurve(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm arc-curve type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_ARC_CURVE`. */
    static isArcCurve (value: unknown): value is ArcCurve {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().ArcCurve
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_BREP`. */
    static assertBrep (value: unknown): asserts value is Brep {
        if (!this.isBrep(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm brep type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_BREP`. */
    static isBrep (value: unknown): value is Brep {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().Brep
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_CURVE`. */
    static assertCurve (value: unknown): asserts value is Curve {
        if (!this.isCurve(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm curve type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_CURVE`. */
    static isCurve (value: unknown): value is Curve {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().Curve
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_EXTRUSION`. */
    static assertExtrusion (value: unknown): asserts value is Extrusion {
        if (!this.isExtrusion(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm extrusion type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_EXTRUSION`. */
    static isExtrusion (value: unknown): value is Extrusion {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().Extrusion
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_LINE_CURVE`. */
    static assertLineCurve (value: unknown): asserts value is LineCurve {
        if (!this.isLineCurve(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm line-curve type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_LINE_CURVE`. */
    static isLineCurve (value: unknown): value is LineCurve {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().LineCurve
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_MESH`. */
    static assertMesh (value: unknown): asserts value is Mesh {
        if (!this.isMesh(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm mesh type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_MESH`. */
    static isMesh (value: unknown): value is Mesh {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().Mesh
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_NURBS_CURVE`. */
    static assertNurbsCurve (value: unknown): asserts value is NurbsCurve {
        if (!this.isNurbsCurve(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm nurbs-curve type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_NURBS_CURVE`. */
    static isNurbsCurve (value: unknown): value is NurbsCurve {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().NurbsCurve
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_NURBS_SURFACE`. */
    static assertNurbsSurface (value: unknown): asserts value is NurbsSurface {
        if (!this.isNurbsSurface(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm nurbs-surface type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_NURBS_SURFACE`. */
    static isNurbsSurface (value: unknown): value is NurbsSurface {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().NurbsSurface
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_PLANE_SURFACE`. */
    static assertPlaneSurface (value: unknown): asserts value is PlaneSurface {
        if (!this.isPlaneSurface(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm plane-surface type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_PLANE_SURFACE`. */
    static isPlaneSurface (value: unknown): value is PlaneSurface {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().PlaneSurface
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_POINT`. */
    static assertPoint (value: unknown): asserts value is Point {
        if (!this.isPoint(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm point type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_POINT`. */
    static isPoint (value: unknown): value is Point {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().Point
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_POLY_CURVE`. */
    static assertPolyCurve (value: unknown): asserts value is PolyCurve {
        if (!this.isPolyCurve(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm poly-curve type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_POLY_CURVE`. */
    static isPolyCurve (value: unknown): value is PolyCurve {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().PolyCurve
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_POLYLINE_CURVE`. */
    static assertPolylineCurve (value: unknown): asserts value is PolylineCurve {
        if (!this.isPolylineCurve(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm polyline-curve type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_POLYLINE_CURVE`. */
    static isPolylineCurve (value: unknown): value is PolylineCurve {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().PolylineCurve
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_REV_SURFACE`. */
    static assertRevSurface (value: unknown): asserts value is RevSurface {
        if (!this.isRevSurface(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm rev-surface type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_REV_SURFACE`. */
    static isRevSurface (value: unknown): value is RevSurface {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().RevSurface
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_SUBD`. */
    static assertSubD (value: unknown): asserts value is SubD {
        if (!this.isSubD(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm subD type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_SUBD`. */
    static isSubD (value: unknown): value is SubD {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().SubD
    }

    /** Runtime check that raises an error when the given value is not of type `SdDtfRhinoTypeHintName.RHINO_SURFACE`. */
    static assertSurface (value: unknown): asserts value is Surface {
        if (!this.isSurface(value)) throw new SdDtfError("Assertion error: Value is not a rhino3dm surface type.")
    }

    /** Returns `true` when the given value is of type `SdDtfRhinoTypeHintName.RHINO_SURFACE`. */
    static isSurface (value: unknown): value is Surface {
        return value instanceof SdDtfRhino3dmSingleton.getInstance().Surface
    }

}
