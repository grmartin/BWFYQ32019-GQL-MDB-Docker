
export type BasicObject = Map<any>;

export type Map<T> = { [index:string] : T };

/**
 * Utilize TypeErasure to imply a Symbol can be a String to allow for use in object indexers.
 *
 * NOTE: TS (as of 3.4) has a 'flaw' (or design decision; depending on which side you take) that disallows direct use
 * of Symbols in Object Indexes. It does however permit strings. So, since it *IS* valid on the Runtime and used
 * frequently, lets lie to the compiler so we can do so as well.
 *
 * @param symbol
 */
export function toIndexSymbol(symbol: symbol | Symbol): string {
    return <string>(<unknown>symbol);
}

// /**
//  * The reverse of {toIndexSymbol}.
//  * @param symbol
//  */
// export function fromIndexSymbol(symbol: string|String): symbol {
//     return <symbol>(<unknown>symbol);
// }
