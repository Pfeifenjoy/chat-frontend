
/**
 * Transform an object to an array.
 */
export function objectToArray(object) {
    let result = [];
    for(let id in object) {
        result.push(object[id]);
    }
    return result;
}


/**
 * Transform an array to an object by a given key.
 */
export function arrayToObject(array, key="id") {
    let object = {};
    for(let item of array) {
        object[item[key]] = item;
    }
    return object;
}

/**
 * Get an item of an array by a given search value.
 */
export function arrayGet(array, value, key="id") {
    return array.find(item => item[key] === value);
}
