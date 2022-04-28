import {
    ISdtfReadableContentComponent,
    ISdtfTypeReader,
    sdAssertUnreachable,
    SdtfError,
    SdtfGeometryTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdtfGeometryTypeValidator } from "./SdtfGeometryTypeValidator"

export class SdtfGeometryTypeReader implements ISdtfTypeReader {

    private readonly validator = new SdtfGeometryTypeValidator()

    async readComponent (component: ISdtfReadableContentComponent): Promise<unknown> {
        const typeHint = component.typeHint?.name as SdtfGeometryTypeHintName

        // Make sure that the component consists of valid data
        if (!this.validator.validateComponent(typeHint, component.value, component.accessor)) {
            throw new SdtfError(`Cannot read value of type '${ typeHint }': Invalid component.`)
        }

        // All values of a geometry type are stored inside the JSON content.
        switch (typeHint) {
            case SdtfGeometryTypeHintName.GEOMETRY_ARC:
            case SdtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX:
            case SdtfGeometryTypeHintName.GEOMETRY_BOX:
            case SdtfGeometryTypeHintName.GEOMETRY_CIRCLE:
            case SdtfGeometryTypeHintName.GEOMETRY_COMPLEX:
            case SdtfGeometryTypeHintName.GEOMETRY_CONE:
            case SdtfGeometryTypeHintName.GEOMETRY_CYLINDER:
            case SdtfGeometryTypeHintName.GEOMETRY_ELLIPSE:
            case SdtfGeometryTypeHintName.GEOMETRY_INTERVAL:
            case SdtfGeometryTypeHintName.GEOMETRY_INTERVAL2:
            case SdtfGeometryTypeHintName.GEOMETRY_LINE:
            case SdtfGeometryTypeHintName.GEOMETRY_MATRIX:
            case SdtfGeometryTypeHintName.GEOMETRY_PLANE:
            case SdtfGeometryTypeHintName.GEOMETRY_POINT:
            case SdtfGeometryTypeHintName.GEOMETRY_POLYLINE:
            case SdtfGeometryTypeHintName.GEOMETRY_RAY:
            case SdtfGeometryTypeHintName.GEOMETRY_RECTANGLE:
            case SdtfGeometryTypeHintName.GEOMETRY_SPHERE:
            case SdtfGeometryTypeHintName.GEOMETRY_TORUS:
            case SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM:
            case SdtfGeometryTypeHintName.GEOMETRY_VECTOR:
                return component.value
            default:
                sdAssertUnreachable(typeHint)
        }
    }

}
