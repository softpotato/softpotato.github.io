import CategoryGroup from "./category_group";
import LRUKey from "./lru_key";
import { orderedArrayStringHash } from "./utils";

/**
 * This class is a search input. 
 * This stores a single search result.
 * The values are not meant to be mutated
 * once created. This is more of designed
 * like a package that doesn't change once
 * passed in from the UI. It's also meant
 * to be a key wrapper, since hashes aren't
 * perfect. This stores the original key and
 * hashes of it.
 * 
 * Also, this class is immutable.
 */
export default class SearchInput extends LRUKey {

    /**
     * 
     * @param {string} keyword - the keyword the user searched by.
     * @param {string} sortBy 
     * @param {boolean} ascending 
     * @param {string[][]} inclusionTags 
     * @param {boolean} inclusionAnd 
     * @param {string[][]} exclusionTags 
     * @param {boolean} exclusionAnd 
     */
    constructor(keyword, sortBy, ascending, inclusionTags, inclusionAnd, exclusionTags, exclusionAnd) {
        super();

        // Initializes fields
        this.keyword = keyword;
        this.sortBy = sortBy;
        this.ascending = ascending;

        // Generates the Category Group
        this.categoryGroup = new CategoryGroup(inclusionTags, inclusionAnd, exclusionTags, exclusionAnd);

        // Generates the hash code
        this.hashCode = orderedArrayStringHash([this.keyword, this.sortBy, this.ascending ? "T" : "F", this.categoryGroup.hashCode]);
    }

    equals(otherSearchInput) {
        if (otherSearchInput == null) {
            console.error("null comparison");
            return false;
        }

        // compare hash code
        if (this.hashCode !== otherSearchInput.hashCode) {
            return false;
        }

        // compare keyword
        if (this.keyword !== otherSearchInput.keyword) {
            return false;
        }

        // compare sortBy
        if (this.sortBy !== otherSearchInput.sortBy) {
            return false;
        }

        // compare ascending
        if (this.ascending !== otherSearchInput.ascending) {
            return false;
        }

        // compare groupings
        return this.categoryGroup.equals(otherSearchInput.categoryGroupCopy);

    }

    /**
     * This function takes an object will the same
     * fields as a SearchInput, but adds the methods
     * to prototype. 
     * 
     * The purpose of this is because when we pass
     * these classes through the web worker. We lose
     * all functions. This function restores those 
     * function values and allows us to use it like 
     * a class instead of a collection of values.
     * 
     * @param {Object} reference
     */
    static addMethodsToDummy(reference) {
        return new SearchInput(
            reference.keyword,
            reference.sortBy,
            reference.ascending,
            reference.categoryGroup.iTags,
            reference.categoryGroup.iAnd,
            reference.categoryGroup.eTags,
            reference.categoryGroup.eAnd
        );
    }

}