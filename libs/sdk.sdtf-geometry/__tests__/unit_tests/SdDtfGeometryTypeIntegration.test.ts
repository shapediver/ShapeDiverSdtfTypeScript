import { SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfGeometryTypeIntegration } from "../../src"

const integration = new SdDtfGeometryTypeIntegration()

describe("isTypeHintSupported", function () {

    test("supported types; should return true", () => {
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_ARC)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_BOX)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_CIRCLE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_COMPLEX)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_CONE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_CYLINDER)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_ELLIPSE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL2)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_LINE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_MATRIX)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_PLANE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_POINT)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_POLYLINE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_RAY)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_RECTANGLE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_SPHERE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_TORUS)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_TRANSFORM)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfGeometryTypeHintName.GEOMETRY_VECTOR)).toBeTruthy()
    })

    test("unsupported type; should return false", () => {
        expect(integration.isTypeHintSupported("foobar")).toBeFalsy()
    })

})
