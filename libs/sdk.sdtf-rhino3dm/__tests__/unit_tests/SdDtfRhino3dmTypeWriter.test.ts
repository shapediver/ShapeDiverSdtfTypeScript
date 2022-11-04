import { ISdtfWriteableAttribute, SdtfGrasshopperTypeHintName, SdtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdtfWriteableComponentFactory } from "../../../../packages/sdk.sdtf-v1/src/writer/SdtfWriteableComponentFactory"
import { RhinoModule } from "rhino3dm"
import { SdtfRhino3dmSingleton } from "../../src/SdtfRhino3dmSingleton"
import { SdtfRhino3dmTypeConfig } from "../../src/SdtfRhino3dmTypeConfig"
import { SdtfRhino3dmTypeValidator } from "../../src/SdtfRhino3dmTypeValidator"
import { SdtfRhino3dmTypeWriter } from "../../src/SdtfRhino3dmTypeWriter"

const factory = new SdtfWriteableComponentFactory()
const writer = new SdtfRhino3dmTypeWriter(new SdtfRhino3dmTypeConfig(), factory)

describe("writeComponent", function () {

    let origValidateExternalRepresentationOfComponent: any

    beforeAll(() => {
        origValidateExternalRepresentationOfComponent = SdtfRhino3dmTypeValidator.prototype.validateExternalRepresentationOfComponent
    })

    afterAll(() => {
        SdtfRhino3dmTypeValidator.prototype.validateExternalRepresentationOfComponent = origValidateExternalRepresentationOfComponent
    })

    test("unsupported type hint name; should throw", () => {
        expect(() => writer.writeComponent({})).toThrow()
    })

    test("invalid grasshopper component; should throw", () => {
        // @ts-ignore: Mock
        SdtfRhino3dmTypeValidator.prototype.validateExternalRepresentationOfComponent = jest.fn(() => false)

        const component = factory.createDataItem("value", SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH)
        expect(() => writer.writeComponent(component)).toThrow()
    })

    test("valid grasshopper component; should remove accessor component", () => {
        // Mock
        SdtfRhino3dmTypeValidator.prototype.validateExternalRepresentationOfComponent = jest.fn(() => true)

        let component: ISdtfWriteableAttribute = {
            accessor: factory.createAccessor(),
            typeHint: factory.createTypeHint(SdtfGrasshopperTypeHintName.GRASSHOPPER_PATH),
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
        await SdtfRhino3dmSingleton.init()
        rhino = SdtfRhino3dmSingleton.getInstance()
    })

    test("no rhino components; should return", () => {
        const components = [
            factory.createDataItem("value", "string"),
        ]

        writer.postProcessComponents(components)
        expect(components).toStrictEqual(components)
    })

    test.each([
        [ SdtfRhinoTypeHintName.RHINO_ARC_CURVE, () => new rhino.ArcCurve() ],
        [ SdtfRhinoTypeHintName.RHINO_BREP, () => new rhino.Brep() ],
        [ SdtfRhinoTypeHintName.RHINO_CURVE, () => new rhino.NurbsCurve(1, 2) ],
        [ SdtfRhinoTypeHintName.RHINO_EXTRUSION, () => new rhino.Extrusion() ],
        [ SdtfRhinoTypeHintName.RHINO_LINE_CURVE, () => new rhino.LineCurve([ 0, 0, 0 ], [ 1, 1, 1 ]) ],
        [ SdtfRhinoTypeHintName.RHINO_MESH, () => new rhino.Mesh() ],
        [ SdtfRhinoTypeHintName.RHINO_NURBS_CURVE, () => new rhino.NurbsCurve(1, 2) ],
        [ SdtfRhinoTypeHintName.RHINO_NURBS_SURFACE, () => rhino.NurbsSurface.create(0, false, 1, 2, 3, 4) ],
        [ SdtfRhinoTypeHintName.RHINO_PLANE_SURFACE, () => new rhino.PlaneSurface() ],
        [ SdtfRhinoTypeHintName.RHINO_POINT, () => new rhino.Point([ 1, 2, 3 ]) ],
        [ SdtfRhinoTypeHintName.RHINO_POLY_CURVE, () => new rhino.PolyCurve() ],
        [ SdtfRhinoTypeHintName.RHINO_POLYLINE_CURVE, () => new rhino.PolylineCurve() ],
        [ SdtfRhinoTypeHintName.RHINO_REV_SURFACE, () => new rhino.RevSurface() ],
        [ SdtfRhinoTypeHintName.RHINO_SUBD, () => new rhino.SubD() ],
        [ SdtfRhinoTypeHintName.RHINO_SURFACE, () => new rhino.PlaneSurface() ],
    ])("single component of type %s; should store rhino component in single buffer", (type, createComponent) => {
        const components = [ factory.createDataItem(createComponent() as any, type) ]
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
            factory.createDataItem(new rhino.Mesh(), SdtfRhinoTypeHintName.RHINO_MESH),
            factory.createDataItem(new rhino.Point([ 5, 6, 7 ]), SdtfRhinoTypeHintName.RHINO_POINT),
        ]

        writer.postProcessComponents(components)

        // Value should have been replaced by an accessor
        expect(components.length).toBe(3)
        expect(components[0]).toStrictEqual(components[0])
        expect(components[1].accessor).toBeDefined()
        expect(components[1].accessor!.componentId).toBeDefined()
        expect(components[1].accessor!.bufferView).toBeDefined()
        expect(components[1].value).toBeUndefined()
        expect(components[1].typeHint?.name).toBe(SdtfRhinoTypeHintName.RHINO_MESH)
        expect(components[2].accessor).toBeDefined()
        expect(components[2].accessor!.componentId).toBeDefined()
        expect(components[2].accessor!.bufferView).toBeDefined()
        expect(components[2].value).toBeUndefined()
        expect(components[2].typeHint?.name).toBe(SdtfRhinoTypeHintName.RHINO_POINT)

        // Both rhino components should share the same buffer view but not the same accessor
        expect(components[1].accessor !== components[2].accessor).toBeTruthy()
        expect(components[1].accessor!.bufferView === components[2].accessor!.bufferView).toBeTruthy()
    })

})
