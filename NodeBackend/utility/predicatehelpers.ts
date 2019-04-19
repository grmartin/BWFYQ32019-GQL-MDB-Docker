
// Value > Key feels backwards but since its what lodash uses, we might as well follow the defacto standard.
export function spreadPair<T1,T2,R> (kvp: (v:T1, k:T2) => R):
    (x:[T2, T1]) => R {
    return function _tuple_pairSplit(x) { return kvp(x[1], x[0]) };
}
