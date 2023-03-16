import { SdtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdtfGeometryTypeIntegration } from "../../src"

const integration = new SdtfGeometryTypeIntegration()

describe("isTypeHintSupported", function () {

    test.each([
        SdtfGeometryTypeHintName.GEOMETRY_ARC,
        SdtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX,
        SdtfGeometryTypeHintName.GEOMETRY_BOX,
        SdtfGeometryTypeHintName.GEOMETRY_CIRCLE,
        SdtfGeometryTypeHintName.GEOMETRY_COMPLEX,
        SdtfGeometryTypeHintName.GEOMETRY_CONE,
        SdtfGeometryTypeHintName.GEOMETRY_CYLINDER,
        SdtfGeometryTypeHintName.GEOMETRY_ELLIPSE,
        SdtfGeometryTypeHintName.GEOMETRY_INTERVAL,
        SdtfGeometryTypeHintName.GEOMETRY_INTERVAL2,
        SdtfGeometryTypeHintName.GEOMETRY_LINE,
        SdtfGeometryTypeHintName.GEOMETRY_MATRIX,
        SdtfGeometryTypeHintName.GEOMETRY_PLANE,
        SdtfGeometryTypeHintName.GEOMETRY_POINT,
        SdtfGeometryTypeHintName.GEOMETRY_POLYLINE,
        SdtfGeometryTypeHintName.GEOMETRY_RAY,
        SdtfGeometryTypeHintName.GEOMETRY_RECTANGLE,
        SdtfGeometryTypeHintName.GEOMETRY_SPHERE,
        SdtfGeometryTypeHintName.GEOMETRY_TORUS,
        SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM,
        SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM_LIST,
        SdtfGeometryTypeHintName.GEOMETRY_VECTOR,
    ])("supported type %s; should return true", (type) => {
        expect(integration.isTypeHintSupported(type)).toBeTruthy()
    })

    test("unsupported type; should return false", () => {
        expect(integration.isTypeHintSupported("foobar")).toBeFalsy()
    })

})
