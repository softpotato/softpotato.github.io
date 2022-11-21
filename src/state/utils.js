/**
 * Source: https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
 * 
 * This code comes from bryc. At least he said anyone can use it on stack overflow
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * 
 * Anyways, this is a string hash function. There is no special reason I decided to use this
 * hash function. It just seemed convenient. Given our application, we don't need a 
 * cryptographic hash function, so security doesn't matter. Mostly just need a hash
 * function focused on speed and some degree of collision resiliance. If you don't
 * want to use this hash function, you can use MD5 instead. I'm not too sure how
 * fast it is, but it's a fair hash function to use in this situation.
 * 
 * I'm not too sure why I put this in a separate file. there is no reason to do so, but oh well.
 * I think it might be that this hash function isn't really a post storage function, but
 * it's only use is in there. I'll keep it here for now in case I might use this for something
 * else.
 * 
 * @param {string} str 
 * @param {number} seed 
 * @returns 
 */
export const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * Required: cyr53. You can replace this with any other string hash function like MD5.
 * 
 * This function generates a string hash for all entries of the array, then performs
 * a bitwise XOR operation between all entries to return a final concatenated result.
 * 
 * This function is useful in unordered data that still needs the same hash value.
 * 
 * based off of this: https://jameshfisher.com/2018/01/09/how-to-hash-multiple-values/
 */
export const unorderedArrayStringHash = function (array) {
    let code = 0;
    for (let index in array) {
        const tag = array[index];
        code = code ^ cyrb53(tag);
    }
    return code;
}

/**
 * Required: cyr53. You can replace this with any other string hash function like MD5.
 * 
 * This function serializes the array into a string, then uses the string hash function
 * to generate a hash value. 
 * 
 * This function is useful for data where order matters. Also, to generally prevent
 * collisions between ordered data.
 */
export const orderedArrayStringHash = function (array) {
    const serializedArray = JSON.stringify(array);
    return cyrb53(serializedArray);
}

/**
 * I copied this from StackOverflow from https://stackoverflow.com/a/52657929
 * 
 * The intention of this function is to create an asynchronous lock till
 * a condition is satisfied.
 * 
 * @param {*} conditionFunction 
 * @returns 
 */
export const until = function (conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}