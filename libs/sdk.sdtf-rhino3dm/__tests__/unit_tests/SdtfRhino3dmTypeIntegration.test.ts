import { SdtfGrasshopperTypeHintName, SdtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdtfRhino3dmTypeIntegration } from "../../dist"

const integration = new SdtfRhino3dmTypeIntegration()

describe("isTypeHintSupported", function () {

    test.each([
        SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH,
        SdtfRhinoTypeHintName.RHINO_ARC_CURVE,
        SdtfRhinoTypeHintName.RHINO_BREP,
        SdtfRhinoTypeHintName.RHINO_CURVE,
        SdtfRhinoTypeHintName.RHINO_EXTRUSION,
        SdtfRhinoTypeHintName.RHINO_LINE_CURVE,
        SdtfRhinoTypeHintName.RHINO_MESH,
        SdtfRhinoTypeHintName.RHINO_NURBS_CURVE,
        SdtfRhinoTypeHintName.RHINO_NURBS_SURFACE,
        SdtfRhinoTypeHintName.RHINO_PLANE_SURFACE,
        SdtfRhinoTypeHintName.RHINO_POINT,
        SdtfRhinoTypeHintName.RHINO_POLY_CURVE,
        SdtfRhinoTypeHintName.RHINO_POLYLINE_CURVE,
        SdtfRhinoTypeHintName.RHINO_REV_SURFACE,
        SdtfRhinoTypeHintName.RHINO_SUBD,
        SdtfRhinoTypeHintName.RHINO_SURFACE,
    ])("supported type %s; should return true", (type) => {
        expect(integration.isTypeHintSupported(type)).toBeTruthy()
    })

    test("unsupported type; should return false", () => {
        expect(integration.isTypeHintSupported("foobar")).toBeFalsy()
    })

})
