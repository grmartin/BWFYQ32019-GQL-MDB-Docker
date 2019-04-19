export function isIterable(obj) {
    return (obj == null) ? false : typeof obj[Symbol.iterator] === 'function';
}

export function spreadable(x){
    return x == null ?
        [] : isIterable(x) ?
            x : [x];
}