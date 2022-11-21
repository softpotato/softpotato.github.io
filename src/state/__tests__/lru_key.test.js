/**
 * This file performs multiple tests for ALL
 * children of the LRU Key class.
 */
import CategoryGroup from "../category_group";
import SearchInput from "../search_input";
import {unorderedArrayStringHash, orderedArrayStringHash} from "../utils";

test("category group hash code test", () => {
    const code1 = new CategoryGroup([[],[],[],[],[]], true, [[],[],[],[],[]], false);
    const code2 = new CategoryGroup([["a"],[],[],[],[]], true, [[],[],[],[],[]], false);

    expect(code1.equals(code2)).toBeFalsy();

    // Not a perfect hascode test, but it shoudl generally be able to handle certain cases
    // of this.
    expect(code1.hashCode === code2.hashCode).toBeFalsy();
});

/**
 * Mostly to test basic efficacy of the has functions to see
 * if they are working properly and can hash an unordered and
 * ordered array consistently.
 */
test("basic hash test", () => {

})