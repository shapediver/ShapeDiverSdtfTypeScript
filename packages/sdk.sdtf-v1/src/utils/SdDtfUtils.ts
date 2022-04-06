import { isDataObject } from "@shapediver/sdk.sdtf-core"

/** Helper function to convert a readable or writable component into a basic JSON object that holds all relevant data. */
export function userComponentToDataObject (o: object): Record<string, unknown> {
    const additionalProperties = Object.keys(o).filter(prop => prop === "additionalProperties")
    const dataObject: Record<string, unknown> = (isDataObject(additionalProperties)) ? additionalProperties : {}
    Object.entries(o)
        .filter(([ key, _ ]) => key !== "componentId" && key !== "additionalProperties")
        .forEach(([ key, value ]) => dataObject[key] = value)
    return dataObject
}
