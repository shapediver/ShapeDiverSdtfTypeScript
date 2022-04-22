import {
    ISdDtfWriteableAttribute,
    SdDtfGrasshopperTypeHintName,
    SdDtfRhinoTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfWriteableComponentFactory } from "@shapediver/sdk.sdtf-v1/src/writer/SdDtfWriteableComponentFactory"
import { RhinoModule } from "rhino3dm"
import { SdDtfRhino3dmSingleton } from "../../src/SdDtfRhino3dmSingleton"
import { SdDtfRhino3dmTypeConfig } from "../../src/SdDtfRhino3dmTypeConfig"
import { SdDtfRhino3dmTypeValidator } from "../../src/SdDtfRhino3dmTypeValidator"
import { SdDtfRhino3dmTypeWriter } from "../../src/SdDtfRhino3dmTypeWriter"

const factory = new SdDtfWriteableComponentFactory()
const writer = new SdDtfRhino3dmTypeWriter(new SdDtfRhino3dmTypeConfig(), factory)

describe("writeComponent", function () {

    let origValidateExternalRepresentationOfComponent: any

    beforeAll(() => {
        origValidateExternalRepresentationOfComponent = SdDtfRhino3dmTypeValidator.prototype.validateExternalRepresentationOfComponent
    })

    afterAll(() => {
        SdDtfRhino3dmTypeValidator.prototype.validateExternalRepresentationOfComponent = origValidateExternalRepresentationOfComponent
    })

    test("unsupported type hint name; should throw", () => {
        expect(() => writer.writeComponent({})).toThrow()
    })

    test("invalid grasshopper component; should throw", () => {
        // @ts-ignore: Mock
        SdDtfRhino3dmTypeValidator.prototype.validateExternalRepresentationOfComponent = jest.fn(() => false)

        const component = factory.createDataItem("value", SdDtfGrasshopperTypeHintName.GRASSHOPPER_PATH)
        expect(() => writer.writeComponent(component)).toThrow()
    })

    test("valid grasshopper component; should remove accessor component", () => {
        // Mock
        SdDtfRhino3dmTypeValidator.prototype.validateExternalRepresentationOfComponent = jest.fn(() => true)

        let component: ISdDtfWriteableAttribute = {
            accessor: factory.createAccessor(),
            typeHint: factory.createTypeHint(SdDtfGrasshopperTypeHintName.GRASSHOPPER_PATH),
            value: "value",
        }

        writer.writeComponent(component)
        expect(component.value).toBeDefined()
        expect(component.accessor).toBeUndefined()
    })

})

describe("postProcessComponents", function () {

    let rhino: RhinoModule

    beforeAll(async () => {
        await SdDtfRhino3dmSingleton.init()
        rhino = SdDtfRhino3dmSingleton.getInstance()
    })

    test("no rhino components; should return", () => {
        const components = [
            factory.createDataItem("value", "string"),
        ]

        writer.postProcessComponents(components)
        expect(components).toStrictEqual(components)
    })

    test.each([
        [ SdDtfRhinoTypeHintName.RHINO_ARC_CURVE, () => new rhino.ArcCurve() ],
        [ SdDtfRhinoTypeHintName.RHINO_BREP, () => new rhino.Brep() ],
        [ SdDtfRhinoTypeHintName.RHINO_CURVE, () => new rhino.NurbsCurve(1, 2) ],
        [ SdDtfRhinoTypeHintName.RHINO_EXTRUSION, () => new rhino.Extrusion() ],
        [ SdDtfRhinoTypeHintName.RHINO_LINE_CURVE, () => new rhino.LineCurve([ 0, 0, 0 ], [ 1, 1, 1 ]) ],
        [ SdDtfRhinoTypeHintName.RHINO_MESH, () => new rhino.Mesh() ],
        [ SdDtfRhinoTypeHintName.RHINO_NURBS_CURVE, () => new rhino.NurbsCurve(1, 2) ],
        [ SdDtfRhinoTypeHintName.RHINO_NURBS_SURFACE, () => rhino.NurbsSurface.create(0, false, 1, 2, 3, 4) ],
        [ SdDtfRhinoTypeHintName.RHINO_PLANE_SURFACE, () => new rhino.PlaneSurface() ],
        [ SdDtfRhinoTypeHintName.RHINO_POINT, () => new rhino.Point([ 1, 2, 3 ]) ],
        [ SdDtfRhinoTypeHintName.RHINO_POLY_CURVE, () => new rhino.PolyCurve() ],
        [ SdDtfRhinoTypeHintName.RHINO_POLYLINE_CURVE, () => new rhino.PolylineCurve() ],
        [ SdDtfRhinoTypeHintName.RHINO_REV_SURFACE, () => new rhino.RevSurface() ],
        [ SdDtfRhinoTypeHintName.RHINO_SUBD, () => new rhino.SubD() ],
        [ SdDtfRhinoTypeHintName.RHINO_SURFACE, () => new rhino.PlaneSurface() ],
    ])("single component of type %s; should store rhino component in single buffer", (type, createComponent) => {
        const components = [ factory.createDataItem(createComponent(), type) ]
        writer.postProcessComponents(components)

        // Value should have been replaced by an accessor
        expect(components.length).toBe(1)
        expect(components[0].accessor).toBeDefined()
        expect(components[0].accessor!.componentId).toBeDefined()
        expect(components[0].accessor!.bufferView).toBeDefined()
        expect(components[0].value).toBeUndefined()
        expect(components[0].typeHint?.name).toBe(type)

        // The buffer view should have a rhino content-type
        expect(components[0].accessor!.bufferView!.contentType).toBe(writer.CONTENT_TYPE_RHINO3DM)
    })

    test("mixed components; should store rhino components in single buffer and link them", () => {
        const components = [
            factory.createDataItem("value", "string"),
            factory.createDataItem(new rhino.Mesh(), SdDtfRhinoTypeHintName.RHINO_MESH),
            factory.createDataItem(new rhino.Point([ 5, 6, 7 ]), SdDtfRhinoTypeHintName.RHINO_POINT),
        ]

        writer.postProcessComponents(components)

        // Value should have been replaced by an accessor
        expect(components.length).toBe(3)
        expect(components[0]).toStrictEqual(components[0])
        expect(components[1].accessor).toBeDefined()
        expect(components[1].accessor!.componentId).toBeDefined()
        expect(components[1].accessor!.bufferView).toBeDefined()
        expect(components[1].value).toBeUndefined()
        expect(components[1].typeHint?.name).toBe(SdDtfRhinoTypeHintName.RHINO_MESH)
        expect(components[2].accessor).toBeDefined()
        expect(components[2].accessor!.componentId).toBeDefined()
        expect(components[2].accessor!.bufferView).toBeDefined()
        expect(components[2].value).toBeUndefined()
        expect(components[2].typeHint?.name).toBe(SdDtfRhinoTypeHintName.RHINO_POINT)

        // Both rhino components should share the same buffer view but not the same accessor
        expect(components[1].accessor !== components[2].accessor).toBeTruthy()
        expect(components[1].accessor!.bufferView === components[2].accessor!.bufferView).toBeTruthy()
    })

})
