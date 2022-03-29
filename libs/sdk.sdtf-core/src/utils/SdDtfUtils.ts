import { SdDtfError } from "../SdDtfError"

/**
 * Function to indicate unreachable paths to the TypeScript compiler.
 * @throws {@link SdDtfError}
 */
export function sdAssertUnreachable (_: never): never {
    throw new SdDtfError("Reached unreachable block.")
}

/** Creates a new type for a string enum that enables to iterate through its keys */
export function enumKeys<O extends object, K extends keyof O = keyof O> (o: O): K[] {
    return Object
        .keys(o)
        .filter(k => Number.isNaN(+k)) as K[]
}

/** Returns all values of the given enum */
export function enumValues (o: object): (string | number)[] {
    return enumKeys(o).map(k => o[k])
}
