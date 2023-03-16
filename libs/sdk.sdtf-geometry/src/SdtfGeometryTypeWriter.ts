import {
    ISdtfTypeWriter,
    ISdtfWriteableAttribute,
    ISdtfWriteableComponentFactory,
    ISdtfWriteableDataItem,
    sdAssertUnreachable,
    SdtfError,
    SdtfGeometryTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdtfGeometryTypeValidator } from "./SdtfGeometryTypeValidator"

export class SdtfGeometryTypeWriter implements ISdtfTypeWriter {

    private readonly validator = new SdtfGeometryTypeValidator()

    constructor (private factory: ISdtfWriteableComponentFactory) {
    }

    writeComponent (component: ISdtfWriteableAttribute | ISdtfWriteableDataItem): void {
        const typeHint = component.typeHint?.name as SdtfGeometryTypeHintName

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
            case SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM_LIST:
            case SdtfGeometryTypeHintName.GEOMETRY_VECTOR:
                delete component.accessor   // Stored in JSON content
                break
            default:
                sdAssertUnreachable(typeHint)
        }

        // Make sure that the component consists of valid data
        if (!this.validator.validateComponent(typeHint, component.value, component.accessor)) {
            throw new SdtfError(`Cannot write component of type '${ typeHint }': Invalid component.`)
        }
    }

    postProcessComponents (components: (ISdtfWriteableAttribute | ISdtfWriteableDataItem)[]): void {
        // Nothing to do here
    }

}
