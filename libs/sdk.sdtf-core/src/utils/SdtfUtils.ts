import { SdtfError } from "../SdtfError"

/**
 * Function to indicate unreachable paths to the TypeScript compiler.
 * @throws {@link SdtfError}
 */
export function sdAssertUnreachable (_: never): never {
    throw new SdtfError("Reached unreachable block.")
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

/**
 * Tries to deep copy the given value.
 * Returns the original value if the used Node.js or Browser version does not support `structuredClone`.
 */
export function tryDeepCopy<T> (original: T): T {
    try {
        return structuredClone(original)
    } catch (e) {
        return original
    }
}
