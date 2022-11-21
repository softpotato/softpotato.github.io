test("dummy", () => {
    expect(1).toBe(1);
});

/**
 * This test checks that the PostStorage class works properly.
 * It doesn't have perfect coverage. I'm mostly using this to
 * check for errors. My code's too broken to easily debug it
 * without creating test cases.
 */

// Dummy Post Data Set
import A from './search_posts/a.json';
import B from './search_posts/b.json';
import C from './search_posts/c.json';
import Empty from './search_posts/empty.json';

import D from './search_posts/d.json';
import E from './search_posts/e.json';
import F from './search_posts/f.json';
import G from './search_posts/g.json';
import H from './search_posts/h.json';
import I from './search_posts/i.json';

// State Component Reference
import PostStorage from "../post_storage";
import SearchInput from "../search_input";

// Data Generation Method
const sortByPool = [
    ["bestMatch", true],
    ["bestMatch", false],
    ["title", true],
    ["title", false],
    ["datePosted", true],
    ["datePosted", false],
    ["lastEdited", true],
    ["lastEdited", false],
    ["error", true]
];

const tagPool = [
    ["tutorial", "project", "tool", "game", "other"],
    ["intro", "advanced", "react.js", "redux", "flux", "konvas", "front end", "back end", "full stack", "data science", "object oriented programming", "fundamentals", "referesher", "guide", "theory", "proof", "keras", "tensorflow", "audio steganography"],
    ["none", "javascript", "c++", "c", "c#", "java", "matlab", "r", "python"],
    ["ongoing", "completed", "not started", "cancelled", "hiatus"],
    ["english", "japanese", "mandarin", "french", "korean", "spanish", "portugese", "klingon", "galactic basic"]
];

// e.g. max = 3 results in 0, 1, and 2.
// citation: https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * This function generates a custom search query.
 */
function generateSearchQuery() {
    const rSortBy = sortByPool[getRandomInt(sortByPool.length)];

    const tags = [[], [], [], [], []];
    tags[0].push(tagPool[0][getRandomInt(tagPool[0].length)]);
    for (let i = 1; i < 3; i++) {
        const currRow = tags[i];

        const numberToGet = getRandomInt(5);
        const currentTagsList = new Set();

        for (let j = 0; j < numberToGet; j++) {
            const currEntry = getRandomInt(currRow.length);

            if (!currentTagsList.has(currentTagsList[currEntry])) {
                currentTagsList.add(currentTagsList[currEntry]);
                currRow.push(currentTagsList[currEntry]);
            }
        }
    }
    tags[3].push(tagPool[3][getRandomInt(tagPool[3].length)]);
    tags[4].push(tagPool[4][getRandomInt(tagPool[4].length)]);

    return new SearchInput("", rSortBy[0], rSortBy[1], tags)
};

/**
 * This function generates a random post.
 */
function generatePost() {

    const tags = [[], [], [], [], []];
    tags[0].push(tagPool[0][getRandomInt(tagPool[0].length)]);
    for (let i = 1; i < 3; i++) {
        const currRow = tags[i];

        const numberToGet = getRandomInt(5);
        const currentTagsList = new Set();

        for (let j = 0; j < numberToGet; j++) {
            const currEntry = getRandomInt(currRow.length);

            if (!currentTagsList.has(currentTagsList[currEntry])) {
                currentTagsList.add(currentTagsList[currEntry]);
                currRow.push(currentTagsList[currEntry]);
            }
        }
    }
    tags[3].push(tagPool[3][getRandomInt(tagPool[3].length)]);
    tags[4].push(tagPool[4][getRandomInt(tagPool[4].length)]);

};

function convertPostJSONToTitleArray(data) {
    const output = [];
    for (let i in data) {
        output.push(data[i]["title"]);
    }
    return output;
}

const allPosts = {
    "1": A,
    "2": B,
    "3": C,
    "4": Empty
};

const pool2 = {
    "1": D,
    "2": E,
    "3": F,
    "4": G,
    "5": H,
    "6": I
}

/**
 * This test verifies that all the tag hash maps are properly set.
 * Note: All tags are converted to lower case values.
 */
test('Post Initialization Tag Initialization coverage check', () => {
    const storage = new PostStorage(allPosts);

    // Makes sure types are properly set
    expect(storage.typeGroups["tutorial"]).toEqual(expect.arrayContaining(["1", "2", "3"]));
    expect(storage.typeGroups["tutorial"]).toEqual(expect.not.arrayContaining(["4"]));
    expect(storage.typeGroups["project"]).toEqual(expect.arrayContaining(["4"]));
    expect(storage.typeGroups["project"]).toEqual(expect.not.arrayContaining(["1", "2", "3"]));

    // Ben lazy

    // Makes sure tags are properly set
    expect(storage.tagGroups["a"]).toEqual(expect.arrayContaining(["1"]));
    expect(storage.tagGroups["test"]).toEqual(expect.arrayContaining(["1", "2", "3"]));
    expect(storage.tagGroups["mankey"]).toEqual(expect.arrayContaining(["1", "3"]));
    expect(storage.tagGroups["b"]).toEqual(expect.arrayContaining(["2"]));
    expect(storage.tagGroups["c"]).toEqual(expect.arrayContaining(["3"]));

    // Checks that programming languages are properly set
    expect(storage.programmingLanguageGroups["a"]).toEqual(expect.arrayContaining(["1"]));
    expect(storage.programmingLanguageGroups["b"]).toEqual(expect.arrayContaining(["2"]));
    expect(storage.programmingLanguageGroups["c"]).toEqual(expect.arrayContaining(["3"]));
    expect(storage.programmingLanguageGroups["javascript"]).toEqual(expect.arrayContaining(["2", "3"]));

    // Checks that publication status is correct
    expect(storage.publicationStatusGroups["hiatus"].length).toEqual(0);
    expect(storage.publicationStatusGroups["cancelled"].length).toEqual(0);
    expect(storage.publicationStatusGroups["not started"].length).toEqual(0);
    expect(storage.publicationStatusGroups["ongoing"]).toEqual(expect.arrayContaining(["1", "2"]));
    expect(storage.publicationStatusGroups["completed"]).toEqual(expect.arrayContaining(["3", "4"]));

    // Makes sure language is properly set
    expect(storage.languageGroups["english"]).toEqual(expect.arrayContaining(["1", "2", "3", "4"]));

});

/**
 * This test verifies that the sort functions won't break if there
 * are no posts to sort.
 */
test('Empty Post Storage Search Query Verification', () => {

    // Initialize storage
    const storage = new PostStorage({});
    expect(storage).toBeDefined();

    // Checks if a bestMatch sort search query works
    let searchQuery = new SearchInput("", "bestMatch", true, [[], [], [], [], []], true, [[], [], [], [], []], false);
    expect(storage.search(searchQuery)).toHaveLength(0);

    // Checks if a title ascending sort search query works
    searchQuery = new SearchInput("", "title", true, [[], [], [], [], []], true, [[], [], [], [], []], false);
    expect(storage.search(searchQuery)).toHaveLength(0);

    // Checks if a title descending sort search query works
    searchQuery = new SearchInput("", "title", false, [[], [], [], [], ["spanish"]], true, [[], [], [], [], []], false);
    expect(storage.search(searchQuery)).toHaveLength(0);

    // Checks if a datePosted ascending search query works
    searchQuery = new SearchInput("", "datePosted", true, [[], [], [], [], []], true, [[], [], [], [], []], false);
    expect(storage.search(searchQuery)).toHaveLength(0);

    // Checks if a datePosted descending search query works
    searchQuery = new SearchInput("", "datePosted", false, [[], [], [], [], []], true, [[], [], [], [], []], false);
    expect(storage.search(searchQuery)).toHaveLength(0);

    // Checks if a lastEdited ascending search query works
    searchQuery = new SearchInput("", "lastEdited", true, [[], [], [], [], []], true, [[], [], [], [], []], false);
    expect(storage.search(searchQuery)).toHaveLength(0);

    // Checks if a lastEdited descending search query works
    searchQuery = new SearchInput("", "lastEdited", false, [[], [], [], [], []], true, [[], [], [], [], []], false);
    expect(storage.search(searchQuery)).toHaveLength(0);

});

test("Best match sort verification", () => {
    const storage = new PostStorage(allPosts);

    // Simple A query
    let searchQuery = new SearchInput("A", "bestMatch", true, [[], [], [], [], ["english"]], true, [[], [], [], [], []], false);
    let output = storage.search(searchQuery);
    expect(output).toHaveLength(2);
    expect(output[0].title).toBe("A");
    expect(output[1].title).toBe("C");

    // Simple 
    searchQuery = new SearchInput("poof", "bestMatch", true, [[], [], [], [], ["english"]], true, [[], [], [], [], []], false);
    output = storage.search(searchQuery);
    expect(output).toHaveLength(3);
    expect(output[0].title).toBe("B");
    expect(output[1].title).toBe("A");
    expect(output[2].title).toBe("C");
});

test("Title Sort Acending Verification", () => {
    const storage = new PostStorage(allPosts);
    const searchQuery = new SearchInput("", "title", true, [[], [], [], [], ["english"]], true, [[], [], [], [], []], false);
    const output = storage.search(searchQuery);
    expect(output).toHaveLength(4);
    expect(output[0].title).toBe("");
    expect(output[1].title).toBe("A");
    expect(output[2].title).toBe("B");
    expect(output[3].title).toBe("C");

});

test("Title Sort Descending Verification", () => {
    const storage = new PostStorage(allPosts);
    const searchQuery = new SearchInput("", "title", false, [[], [], [], [], ["english"]], true, [[], [], [], [], []], false);
    const output = storage.search(searchQuery);
    expect(output).toHaveLength(4);
    expect(output[0].title).toBe("C");
    expect(output[1].title).toBe("B");
    expect(output[2].title).toBe("A");
    expect(output[3].title).toBe("");
});

test("Default Search Output when there are no tag constraints", () => {
    const storage = new PostStorage(allPosts);

    // Should return all posts
    const nothingSearch = new SearchInput("", "bestMatch", false, [[], [], [], [], []], false, [[], [], [], [], []], false);

    const output = storage.search(nothingSearch);
    expect(convertPostJSONToTitleArray(output)).toEqual(expect.arrayContaining(["A", "B", "C", ""]));


});

/**
 * const tagPool = [
    ["tutorial", "project", "tool", "game", "other"],
    ["intro", "advanced", "react.js", "redux", "flux", "konvas", "front end", "back end", "full stack", "data science", "object oriented programming", "fundamentals", "referesher", "guide", "theory", "proof", "keras", "tensorflow", "audio steganography"],
    ["none", "javascript", "c++", "c", "c#", "java", "matlab", "r", "python"],
    ["ongoing", "completed", "not started", "cancelled", "hiatus"],
    ["english", "japanese", "mandarin", "french", "korean", "spanish", "portugese", "klingon", "galactic basic"]
];
 */

/**
 * Tag Notes
 * [
 *      type,
 *      general tags,
 *      programming language,
 *      publication status,
 *      language 
 * ]
 */

test("AND Tag operator testing", () => {
    const storage = new PostStorage(pool2);

    // Programming Language search query
    const search1 = new SearchInput("", "bestMatch", true, [[], [], ["a", "b"], [], []], true, [[], [], [], [], []], false);
    const o1 = storage.search(search1);
    expect(convertPostJSONToTitleArray(o1)).toEqual(expect.arrayContaining(["I", "E"]));

    // Tag Search Query
    const search2 = new SearchInput("", "bestMatch", true, [[], ["d", "e"], [], [], []], true, [[], [], [], [], []], false);
    expect(convertPostJSONToTitleArray(storage.search(search2))).toEqual(expect.arrayContaining(["E"]));
    expect(convertPostJSONToTitleArray(storage.search(search2))).toEqual(expect.not.arrayContaining(["D", "F", "G", "H", "I"]));

    // Status Denial Search Query (should have none)
    const search3 = new SearchInput("", "bestMatch", true, [[], [], [], ["ongoing", "completed"], []], true, [[], [], [], [], []], false);
    expect(convertPostJSONToTitleArray(storage.search(search3))).toEqual(expect.not.arrayContaining(["D", "E", "F", "G", "H", "I"]));

    // Search for "a" programming language and exclusion of "a" programming language
    const search4 = new SearchInput("", "bestMatch", true, [[], [], ["a"], [], []], false, [[], [], ["b"], [], []], false);
    expect(convertPostJSONToTitleArray(storage.search(search4))).toEqual(expect.arrayContaining(["D", "G", "H"]));
    expect(convertPostJSONToTitleArray(storage.search(search4))).toEqual(expect.not.arrayContaining(["E", "F", "I"]));

    // Search for "a" programming language and exclusion of "a" and "b" programming language
    const search5 = new SearchInput("", "bestMatch", true, [[], [], ["a"], [], []], false, [[], [], ["a", "b"], [], []], true);
    expect(convertPostJSONToTitleArray(storage.search(search5))).toEqual(expect.arrayContaining(["D", "G", "H"]));
    expect(convertPostJSONToTitleArray(storage.search(search5))).toEqual(expect.not.arrayContaining(["E", "F", "I"]));

    // Search for "b" programming language and exclusion of "a" or "b" programming language
    const search6 = new SearchInput("", "bestMatch", true, [[], [], ["a"], [], []], false, [[], [], ["a", "b"], [], []], false);
    expect(convertPostJSONToTitleArray(storage.search(search6))).toEqual(expect.not.arrayContaining(["E", "F", "I", "D", "G", "H"]));

});

test("OR Tag operator testing", () => {

});

    // TODO: Write some test cases to verify that the tags
    // will filter the results using ANd and OR. Also, that the
    // AND will at least return a result if nothing is selected or
    // something is selected. 

/**
 * TODO: Write more tests for
 * - all sort function
 * - multiple sequential searches (up to 30)
 * - random pool and search
 */
