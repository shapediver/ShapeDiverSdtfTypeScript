import { SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfGeometryTypeIntegration } from "../../src"

const integration = new SdDtfGeometryTypeIntegration()

describe("isTypeHintSupported", function () {

    test.each([
        SdDtfGeometryTypeHintName.GEOMETRY_ARC,
        SdDtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX,
        SdDtfGeometryTypeHintName.GEOMETRY_BOX,
        SdDtfGeometryTypeHintName.GEOMETRY_CIRCLE,
        SdDtfGeometryTypeHintName.GEOMETRY_COMPLEX,
        SdDtfGeometryTypeHintName.GEOMETRY_CONE,
        SdDtfGeometryTypeHintName.GEOMETRY_CYLINDER,
        SdDtfGeometryTypeHintName.GEOMETRY_ELLIPSE,
        SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL,
        SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL2,
        SdDtfGeometryTypeHintName.GEOMETRY_LINE,
        SdDtfGeometryTypeHintName.GEOMETRY_MATRIX,
        SdDtfGeometryTypeHintName.GEOMETRY_PLANE,
        SdDtfGeometryTypeHintName.GEOMETRY_POINT,
        SdDtfGeometryTypeHintName.GEOMETRY_POLYLINE,
        SdDtfGeometryTypeHintName.GEOMETRY_RAY,
        SdDtfGeometryTypeHintName.GEOMETRY_RECTANGLE,
        SdDtfGeometryTypeHintName.GEOMETRY_SPHERE,
        SdDtfGeometryTypeHintName.GEOMETRY_TORUS,
        SdDtfGeometryTypeHintName.GEOMETRY_TRANSFORM,
        SdDtfGeometryTypeHintName.GEOMETRY_VECTOR,
    ])("supported type %s; should return true", (type) => {
        expect(integration.isTypeHintSupported(type)).toBeTruthy()
    })

    test("unsupported type; should return false", () => {
        expect(integration.isTypeHintSupported("foobar")).toBeFalsy()
    })

})
