import {
    ISdDtfReadableContentComponent,
    ISdDtfTypeReader,
    sdAssertUnreachable,
    SdDtfError,
    SdDtfGeometryTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfGeometryTypeValidator } from "./SdDtfGeometryTypeValidator"

export class SdDtfGeometryTypeReader implements ISdDtfTypeReader {

    private readonly validator = new SdDtfGeometryTypeValidator()

    async readComponent (component: ISdDtfReadableContentComponent): Promise<unknown> {
        const typeHint = component.typeHint?.name as SdDtfGeometryTypeHintName

        // Make sure that the component consists of valid data
        if (!this.validator.validateComponent(typeHint, component.value, component.accessor)) {
            throw new SdDtfError(`Cannot read value of type '${ typeHint }': Invalid component.`)
        }

        // All values of a geometry type are stored inside the JSON content.
        switch (typeHint) {
            case SdDtfGeometryTypeHintName.GEOMETRY_ARC:
            case SdDtfGeometryTypeHintName.GEOMETRY_BOUNDING_BOX:
            case SdDtfGeometryTypeHintName.GEOMETRY_BOX:
            case SdDtfGeometryTypeHintName.GEOMETRY_CIRCLE:
            case SdDtfGeometryTypeHintName.GEOMETRY_COMPLEX:
            case SdDtfGeometryTypeHintName.GEOMETRY_CONE:
            case SdDtfGeometryTypeHintName.GEOMETRY_CYLINDER:
            case SdDtfGeometryTypeHintName.GEOMETRY_ELLIPSE:
            case SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL:
            case SdDtfGeometryTypeHintName.GEOMETRY_INTERVAL2:
            case SdDtfGeometryTypeHintName.GEOMETRY_LINE:
            case SdDtfGeometryTypeHintName.GEOMETRY_MATRIX:
            case SdDtfGeometryTypeHintName.GEOMETRY_PLANE:
            case SdDtfGeometryTypeHintName.GEOMETRY_POINT:
            case SdDtfGeometryTypeHintName.GEOMETRY_POLYLINE:
            case SdDtfGeometryTypeHintName.GEOMETRY_RAY:
            case SdDtfGeometryTypeHintName.GEOMETRY_RECTANGLE:
            case SdDtfGeometryTypeHintName.GEOMETRY_SPHERE:
            case SdDtfGeometryTypeHintName.GEOMETRY_TORUS:
            case SdDtfGeometryTypeHintName.GEOMETRY_TRANSFORM:
            case SdDtfGeometryTypeHintName.GEOMETRY_VECTOR:
                return component.value
            default:
                sdAssertUnreachable(typeHint)
        }
    }

}
