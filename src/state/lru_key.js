/**
 * This is an abstract class used
 * to specify what values are required
 * to be able to use an object as a key
 * to pass it into the LRU Cache.
 */
export default class LRUKey{
    constructor() {
        this.hashCode = 1;
    }

    equals(other) {
        if (other == null) {
            return false;
        }

        return this.hashCode === other.hashCode;
    }
}