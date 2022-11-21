import LRUKey from "./lru_key";
import { orderedArrayStringHash, unorderedArrayStringHash } from "./utils";
/**
 * This class stores the groupings. 
 * 
 * E.g. the individual tags for maybe a comic reading website. These tags
 * are stored in the format of
 *      tags: [
 *          ["ongoing", "active"],
 *          ["potato"],
 *          ["english"]
 *      ]
 * There is some degree of implied groupings for the first dimension (I'm refering
 * to the top most array) for each entry. The second dimension (I'm referring to the
 * array nested) is more of an unordered set.
 *
 * UPDATE: I've come to realize that you should assume that the arrays are organized
 * in sequence of
 *      1) typeGroups
 *      2) tagGroups
 *      3) programmingLanguageGroups
 *      4) publicationStatusGroups
 *      5) languageGroups
 * This ordering is implied and all string[][] require the first dimension
 * array values to come in this order. If it doesn't this program will break.
 * 
 * This class encapsulates comparison, hasing, and storing grouped values. 
 * 
 * Also, this class is immutable.
 * 
 * Additional Note: This class doesn't have to store the inclustion tags and
 * exclusion tags as 2D arrays. This can be collapsed to a single array
 * since usually tags won't intersect. However, you'll need to also update
 * post_storage.js to also store everything in a single hashmap then. As
 * far as I can think, introducing the 2d arrays introduce more complexity
 * for no reason. 
 */
export default class CategoryGroup extends LRUKey {
    /**
     * 
     * @param {string[][]} inclusionTags - This is a list of tags included in the grouping.
     *                                     We can assume that each value in the array are unique
     *                                     with respect to the first dimension groups.
     * @param {boolean} inclusionAnd 
     * @param {string[][]} exclusionTags 
     * @param {boolean} exclusionAnd 
     */
    constructor(inclusionTags, inclusionAnd, exclusionTags, exclusionAnd) {
        super();

        // Sets the fields
        this.iTags = inclusionTags;
        this.iAnd = inclusionAnd;
        this.eTags = exclusionTags;
        this.eAnd = exclusionAnd;

        // This was more readable a previous version, but it didn't work cause I didn't
        // iterate the array properly, so I changed it to this. This is much more painful now.
        // lol.
        this.hashCode = orderedArrayStringHash(
            [
                this.iTags.map((list) => unorderedArrayStringHash(list)).reduce((acc, next) => {return acc^next}),
                this.iAnd ? "T" : "F",
                this.eTags.map((list) => unorderedArrayStringHash(list)).reduce((acc, next) => {return acc^next}),
                this.eAnd ? "T" : "F"
            ]
        );


        // This might not be the most secure way to hash together a 2D array of strings, but oh well.
    }

    /**
     * 
     * @param {CategoryGroup} otherCategoryGroup 
     */
    equals(otherCategoryGroup) {

        // makes sure other pointer is not null
        if (otherCategoryGroup == null) {
            return false;
        }

        // compares hash codes 
        if (otherCategoryGroup.hashCode !== this.hashCode) {
            return false;
        }

        // compares of both inclusionAnd and exclusionAnd properties are the same
        if ((this.iAnd !== otherCategoryGroup.iAnd) || (this.eAnd !== otherCategoryGroup.eAnd)) {
            return false;
        }

        // Compares the inclusion/exclusion array's sizes are the same
        if (this.iTags.length !== otherCategoryGroup.iTags.length || this.eTags.length !== otherCategoryGroup.eTags.length) {
            return false;
        }

        // Compares inclusion tag's lists
        if (!CategoryGroup.helperCompare2DMatrix(this.iTags, otherCategoryGroup.iTags)) {
            return false;
        }

        // compares exclusion tag's lists
        if (!CategoryGroup.helperCompare2DMatrix(this.eTags, otherCategoryGroup.eTags)) {
            return false;
        }

        // if everything checks out.
        return true;
    }

    /**
     * This is a helper function used to compare 
     * the inclusionTags or exclusionTags arrays.
     * This is used primarily in the compare() function.
     * 
     * This function assumes arr1 and arr2 are arrays of
     * unique values (e.g. no duplicate entries) and that
     * they're unordered. This returns if both arr1 and arr2
     * have the same string values. 
     * 
     * @param {string[][]} arr1 
     * @param {string[][]} arr2 
     */
    static helperCompare2DMatrix(arr1, arr2) {
        const tagGroupMap = new Map(); // maps the tag groups in the array

        // populates the map
        for (let index in arr1) {
            const tagGroup = arr1[index];
            const grpHash = unorderedArrayStringHash(tagGroup);

            // If the hash of the tag group already exists, we 
            // can just append duplicate values in the hash map.
            // otherwise, we just create a new entry in the hash map.
            if (tagGroupMap.has(grpHash)) {
                tagGroupMap.get(grpHash).push(tagGroup);
            } else {
                tagGroupMap.set(grpHash, [tagGroup]);
            }
        }

        // checks the map
        for (let index in arr2) { // other tag group iteration
            const oTagGroup = arr2[index];
            const grpHash = unorderedArrayStringHash(oTagGroup);

            if (!tagGroupMap.has(grpHash)) {
                return false;
            }

            // this iterates through the open map entry. If it finds
            // a matching array to the current other Category Group array,
            // then return true. Otherwise, keep searching.
            let foundArray = false;
            for (let mapEntry in tagGroupMap.get(grpHash)) {
                if (CategoryGroup.compareUnorderedSets(oTagGroup, mapEntry)) {
                    foundArray = true;
                    break;
                }
            }

            if (!foundArray) {
                return false;
            }
        }

        return true;

    }

    /**
     * This is a helper method for comparing if 2 unordered
     * sets contain the same entries. This is used for comparing
     * the 2nd dimension sets in the inclusionTags or exclusionTags
     * arrays.
     * 
     * This function uses a Set to compare the 2, so it's an O(n)
     * memory space complexity and O(n) time complexity.
     * 
     * @param {string[]} arr1 
     * @param {string[]} arr2 
     * @returns 
     */
    static compareUnorderedSets(arr1, arr2) {

        // Quick exit
        if (arr1.length !== arr2.length) {
            return false;
        }

        const hashMap = new Set();

        for (let entry in arr1) {
            hashMap.add(entry);
        }

        for (let entry in arr2) {
            if (!hashMap.has(entry)) {
                return false;
            }
        }

        return true;
    }

    get copy() {
        const iTagsCopy = [];
        const eTagsCopy = [];

        for (let group in this.iTags) {
            iTagsCopy.push([...group]);
        }

        for (let group in this.eTags) {
            eTagsCopy.push([...group]);
        }

        return new CategoryGroup(iTagsCopy, this.inclusionAnd, eTagsCopy, this.exclusionAnd);
    }

}