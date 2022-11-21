import LRUCache from "./lru_cache";

/**
 * These functions are mutators. They don't
 * return anything. They just mutate the passed
 * in array. 
 * 
 * It assumes x is an array.
 * 
 * It assumes ascending is boolean.
 */
const sortFunctions = {
    "bestMatch": function (x, ascending = true, keyword = "potato") {

        // Some error we need to worry about. Sort best by keyword
        // doesn't work if there is no keyword. We need this function
        // to have a default functionality if there is no keyword
        // passed in. (e.g. keyword = ""). You can't sort this at all
        // so we'll do it by title. 

        if (keyword !== "") {
            x.sort(function (a, b) {
                // This function sucks. This iterates through the whole
                // post to hopefully find matching key words.

                // So we'll need to traverse the post content. The content is
                // a nested tree stored in the "pages" field. It can take on
                // the following structure
                //
                //  pages: [
                //      {
                //          content: "string to parse",
                //          sections: [
                //              {
                //                  content: "content stuff or image file name",
                //                  alt-text: "alternate image text"
                //              },
                //              {
                //                  content: "drop down list",
                //                  sections: [
                //                      {
                //                          content: "this is nested"    
                //                      }, ...
                //                  ]
                //              },
                //              {
                //                  sections: [
                //                      {
                //                          content: "code here"
                //                      },...
                //                  ]
                //              }
                //          ]
                //      },
                //      ...
                //  ]
                //
                // The content can be nested an infinite amount of times, but in general
                // unless some wacko decides to put a drop down in a drop down in a drop down,
                // normal case should be safe to assume depth of 3 at most for most posts.
                // 
                // - The pages object is the root element containing all nested children.
                // - The sections field are optional fields that are guaranteed on the
                //      first depth of the pages object. On first depth, sections contains
                //      the primary elements displayed. On second or later depths, they
                //      contain object type specific content that is dependent on the rendered type.
                //      not all objects within the first depth can guarantee sections content.
                // - content field is OPTIONAL and the only field that the regex search should be performed on.

                // Can optimize to cache these expensive operations.
                const aHit = sortFunctions.stringHitCount(keyword, a);
                const bHit = sortFunctions.stringHitCount(keyword, b);

                return bHit - aHit;


            });
            return x;

        } else { // if no valid keyword posted in, sort by date uploaded.
            // copy pased code from the "datePosted" function for default behavior
            x.sort(function (a, b) {
                const dateA = Date.parse(a.created);
                const dateB = Date.parse(b.created);

                if (dateA < dateB) {
                    return -1 * (ascending ? 1 : -1);
                } else if (dateB < dateA) {
                    return 1 * (ascending ? 1 : -1);
                } else {
                    return 0;
                }
            });

            return x;
        }
    },
    "title": function (x, ascending = true, keyword = "potato") {
        x.sort(function (a, b) {
            return a.title.localeCompare(b.title) * (ascending ? 1 : -1);
        });

        return x;
    },
    "datePosted": function (x, ascending = true, keyword = "potato") {
        x.sort(function (a, b) {
            const dateA = Date.parse(a.created);
            const dateB = Date.parse(b.created);

            if (dateA < dateB) {
                return -1 * (ascending ? 1 : -1);
            } else if (dateB < dateA) {
                return 1 * (ascending ? 1 : -1);
            } else {
                return 0;
            }
        });

        return x;
    },
    "lastEdited": function (x, ascending = true, keyword = "potato") {
        x.sort(function (a, b) {
            const dateA = Date.parse(a.updated);
            const dateB = Date.parse(b.updated);

            if (dateA < dateB) {
                return -1 * (ascending ? 1 : -1);
            } else if (dateB < dateA) {
                return 1 * (ascending ? 1 : -1);
            } else {
                return 0;
            }
        });

        return x;
    },
    stringHitCount: function (searchStr, postObject) {

        /**
         * This function uses a regex expression to iterate through
         * and search for matching cases.
         */
        const regexExpression = new RegExp(searchStr.replace(/ +/g, "|"), "gi");
        let hit = 0;

        // check the title and description of the post
        hit += ((postObject["title"] || "").match(regexExpression) || []).length;

        hit += ((postObject["description"] || "").match(regexExpression) || []).length;

        // Iterate through all post pages
        for (let index in postObject.pages) {
            const postElement = postObject.pages[index];
            // need to recursively DFS check if any hits
            hit += this.dfsCheckContent(regexExpression, postElement);
        }

        return hit;

    },
    dfsCheckContent(regexExp, postElement) {
        if (postElement == null) {
            return 0;
        }

        let count = 0;

        if (Object.hasOwn(postElement, 'content')) {
            count += ((postElement['content'] || "").match(regexExp) || []).length;
        }

        if (Object.hasOwn(postElement, 'sections')) {
            for (let nestedPostEl in postElement['sections']) {
                count += this.dfsCheckContent(regexExp, nestedPostEl);
            }
        }

        return count;
    }
};


/**
 * This class manages storing, organizing, and caching
 * search information given a pool of all available posts.
 * This class assumes a pool of unfiltered posts will be 
 * given to it on initialization. 
 * 
 * This class is intended to be stored in the web worker
 * and used mostly for generating queries. 
 * 
 * Groupings
 *      type - the main focus of the 
 *          tutorial
 *          project
 *          tool
 *          game
 *          other
 *          * should be generated through content
 *      tags - these are more general descriptors for the content
 *          intro
 *          advanced
 *          React.js
 *          Redux
 *          Flux
 *          Konvas
 *          Front End
 *          Back End
 *          Full Stack
 *          Data Science
 *          Object Oriented Programming
 *          Fundamentals
 *          Refresher
 *          video game guide
 *          theory
 *          proof
 *          * can be anything, but maybe APIs used might be helpful
 *          * also should be generated by the given content
 *      programming language - the programming language used in the post
 *          none
 *          JavaScript
 *          Python
 *          C++
 *          C
 *          C#
 *          Java
 *          * should also be generated by the given content
 *      publication status
 *          ongoing
 *          completed
 *          not started
 *          cancelled
 *          hiatus
 *      language
 *          English
 *          Japanese
 *          Chinese
 *          French
 *          * I can only read/write in English. I guess I'm doing Duolingo in Japanese and
 *            I did French in middle/high school. However, I sucked at it so probably won't
 *            translate my posts to other languages.
 * 
 */
export default class PostStorage {

    /**
     * This function takes in a single Object. This
     * object contains objects within it each keyed 
     * through a key value starting from 1. 
     * 
     * @param {Object} jsonObjects - posts to be stored and sorted.
     */
    constructor(jsonObjects) {

        this.unfilteredPosts = jsonObjects; // store Objects reference in class

        // Grouping
        //  The following are JavaScript objects. I use objects since these don't
        //  change all too frequently. Also, I read a post on when to use Map vs Object.
        //  I use objects since this is a high read low mutation situation after initialization.
        //  https://stackoverflow.com/questions/66931535/javascript-object-vs-map-set-key-lookup-performance#:~:text=Use%20Maps%20for%20dictionaries%20with%20lots%20of%20different%2C,caching%2C%20hidden%20classes%20with%20fixed%20memory%20layout%20etc.%29
        this.typeGroups = Object.create(null); // we don't need any of these extra properties offered by 
        this.tagGroups = Object.create(null);   // prototype
        this.programmingLanguageGroups = Object.create(null);
        this.publicationStatusGroups = Object.create(null);
        this.languageGroups = Object.create(null);

        // Initializes default fields that need to be in there.
        this.typeGroups["tutorial"] = [];
        this.typeGroups["project"] = [];
        this.typeGroups["tool"] = [];
        this.typeGroups["other"] = [];
        this.publicationStatusGroups["completed"] = [];
        this.publicationStatusGroups["ongoing"] = [];
        this.publicationStatusGroups["not started"] = [];
        this.publicationStatusGroups["cancelled"] = [];
        this.publicationStatusGroups["hiatus"] = [];
        this.languageGroups["english"] = [];

        // This function iterates through and creates groupings.
        for (let key in jsonObjects) {
            const obj = jsonObjects[key];   // get object reference

            // Registers it with typeGroups
            const ty_lc = obj.type.toLowerCase(); // converts to lower case
            if (ty_lc in this.typeGroups) {
                this.typeGroups[ty_lc].push(key);
            } else {
                this.typeGroups[ty_lc] = [key];
            }

            // Registers it with tagGroups
            for (let index in obj.tags) {
                const t_lc = obj.tags[index].toLowerCase(); // lowercase converted

                if (t_lc in this.tagGroups) {
                    this.tagGroups[t_lc].push(key);
                } else {
                    this.tagGroups[t_lc] = [key];
                }
            }

            // Registers it with programmingLanguageGroups
            for (let index in obj.programming_languages) {
                const pl_lc = obj.programming_languages[index].toLowerCase(); // lowercase converted

                if (pl_lc in this.programmingLanguageGroups) {
                    this.programmingLanguageGroups[pl_lc].push(key);
                } else {
                    this.programmingLanguageGroups[pl_lc] = [key];
                }
            }

            // Registers it with publicationStatusGroup
            const s_lc = obj.status.toLowerCase();
            if (s_lc in this.publicationStatusGroups) {
                this.publicationStatusGroups[s_lc].push(key);
            } else {
                this.publicationStatusGroups[s_lc] = [key];
            }

            // Registers it with languageGroups
            const lg_lc = obj.language.toLowerCase();
            if (lg_lc in this.languageGroups) {
                this.languageGroups[lg_lc].push(key);
            } else {
                this.languageGroups[lg_lc] = [key];
            }

        }

        // Sorts and organizes the data
        //  definitely not efficient, but if we have
        //  this run by a web agent. We can have this
        //  process run in the background.
        //
        //  In general though, you want this process running
        //  on the server at probably consistent intervals to
        //  keep all data up to date. This is a heafty operation,
        //  but it should keep the amount of in search processing
        //  to a minimum.
        for (let key in this.typeGroups) {
            this.typeGroups[key].sort();
        }

        for (let key in this.tagGroups) {
            this.tagGroups[key].sort();
        }

        for (let key in this.programmingLanguageGroups) {
            this.programmingLanguageGroups[key].sort();
        }

        for (let key in this.publicationStatusGroups) {
            this.publicationStatusGroups[key].sort();
        }

        for (let key in this.languageGroups) {
            this.languageGroups[key].sort();
        }

        // Prepares Caching Bins
        this.intersectionCache = new LRUCache(20); // stores merged union of sorted data sets.

        /**
         * Caching information post note
         * 
         * There is only 1 cache in this storage, since message passing between
         * web workers is expensive. I'm caching completed search results external
         * to this class. Only intermediate value information gets cached here.
         */

    }

    /**
     * This function returns a 2D array of string values
     * storing all the tags in the current dataset. This 
     * is used for generating the tag listings for the
     * advanced search in the advanced search page.
     * This should be called right after initialization
     * since I can't return a value in the constructor,
     * this is meant to be passed back immediately through
     * the web worker. The values in the arrays are copied
     * to avoid destroying the groups upon message back.
     * 
     * @returns {string[][]} tagArray
     */
    getTags() {


        return [
            [...Object.keys(this.typeGroups)],
            [...Object.keys(this.tagGroups)],
            [...Object.keys(this.programmingLanguageGroups)],
            [...Object.keys(this.publicationStatusGroups)],
            [...Object.keys(this.languageGroups)]
        ];
    }

    /**
     * This function checks the cache for a pre-generated search data. There are
     * 2 caches that it checks, before generating the data from scratch. It then
     * returns the completed search result as an array for rendering.
     * 
     * @param {SearchInput} searchObject - This object contains all search parameters
     *                                      passed in by the user. This parameter
     *                                      REQUIRES a SearchInput object. The web worker
     *                                      needs to convert back the passed in values to
     *                                      work properly.
     */
    search(searchObject) {

        /**
         * WARNING: Terrible coding practices ahead.
         * 
         * Okay, so I admit I did something completely devoid of logic.
         * I decided to use an array to store the intersected data, but I
         * thought. WOW, JavaScripts lets me store whatever I want in the
         * array, unlike Java. So I decided to mutate the array. Turns out,
         * I also cached the mutated array and now it's fucking everything
         * up. Several tests later, and I finally come back to this abomindation
         * of code. 
         * 
         * FML.
         */

        // Part 1 - Check intersection cache for partially completed result
        let intersectedData = this.intersectionCache.retrieve(searchObject.categoryGroup);

        // If no merged data set is found, then generate it and store it in LRU Cache
        if (intersectedData == null) {

            intersectedData = this.generateIntersectionData(searchObject.categoryGroup);
            this.intersectionCache.insert(searchObject.categoryGroup, [...intersectedData]);
        } else {
            intersectedData = [...intersectedData]; // due to error mentioned above
        }

        // Part 2 - Convert Key Dataset to posts
        //  The previous steps generated an array of key values for the posts,
        //  but we'll need to store the posts based on the metadata information.

        // This iteration replaces all previous entries with the raw object information.
        for (let i = 0; i < intersectedData.length; i++) {
            intersectedData[i] = this.unfilteredPosts[intersectedData[i]];
        }

        // Part 3 - Sorting

        // Sorting is probably gonna be a crap fest. There are 5 sort methods
        // and we'll need to do them both ways, so 10 different sort methods.
        // They are as follows
        //      1) Most matches (given the keyword, which post has the most matches)
        //      2) title (sorted by title order)
        //      3) date posted (when the original post was made)
        //      4) last edited (when the post was last edited, if at all)
        //      5) author (nvm, we're not doing this. Only if you had a server full of posts, maybe. But not here.)

        // So we're given a string that says the sort order we'll use. We could use
        // a switch, but that is O(n) worst cast time complexity to find the right
        // formula. We might as well use a hash map in this case as well, since this
        // is a functional programming language (e.g. functions are first class citizens).
        // we can store a function as a lambda function and call it in the hash map.
        // Actually, you'd do this in Python. Since this is JavaScript, we can just
        // have the string call directly a function stored in an object (which is
        // also a hashMap... I think...)

        // If a valid search method was passed in
        if (Object.hasOwn(sortFunctions, searchObject.sortBy)) {
            sortFunctions[searchObject.sortBy](intersectedData, searchObject.ascending, searchObject.keyword);

        } else { // Invalid search results in default behavior of sort by date posted
            console.error("Invalid sort function passed in. Default sort by title.");
            sortFunctions["datePosted"](intersectedData, searchObject.ascending, searchObject.keyword);
        }

        // Part 4 - Filtering
        // I am stumped. 
        // Okay, so keywords the user enters into the search bar are NOT necessary for most sorts.
        // sort by date and sort by title don't require the keywords, they filter the output
        // for it. 
        // Sort by best match requires the keywords, so the keyword is used.

        // In general, if this had a server client, then it's generally not a good idea to
        // send the user extra post data. However, users might change their keyword search
        // so the UI would handle that instead of the server, so it might be better to
        // send a little more extra data the UI handles instead. Although, I guess this
        // is a static webpage, so I don't really need to worry about this type of interaction.
        // However, sorting and filtering are expensive. Sorting is O(n log(n)), but with
        // sort by best match. It's probably O((nm) log (nm)) where m is the max size of
        // a post, since we'll need to parse the posts using regex expressions. This
        // might make searching on this static webpage REALLY REALLY slow. I was thinking
        // that it might be best to cache the result inbetween the Sort and Filter stages
        // (step 3 and step 4), but then that requires a new intermediate class and I'll
        // need a way to handle sort by best match independent of this implementation.
        // The reason for that is because search_input.js hashes the key value on initialization
        // alongside the search keywords the user input. But, if I wanted to cache the
        // result inbetween the 2 steps, then I'll need to alter either the class structure
        // of data alterations or expectations and do something like the category_group.js
        // where I hash that set of data separately. 

        // My brain is burnt. I'm just going to filter this output and cache the result.
        // RIP. poor foresight has resulted in this. Hopefully typing in the search
        // bar won't result in too much of a lag spike.

        // This operation is O(nm), where n is the number of posts and m is the max
        // size of a post or whatever the regex time to parse a post is. Honestly
        // not sure how efficient regex expressions are so I call them m. However,
        // maybe it's a little too excessive to parse the whole post. Maybe I can
        // create a system for a better cache inbetween search and result?

        // Fuck, gotta stop overthinking this. I've been here for 5-7 hours just
        // pondering on this. Gosh darn it. Time flies when you're sick.

        let filteredDisplayList = []; // This array is the one sent to the UI

        // simple iteration filter.
        if (searchObject.keyword !== "") {
            for (let index in intersectedData) {
                const post = intersectedData[index];
                if (sortFunctions.stringHitCount(searchObject.keyword, post) >= 1) {
                    filteredDisplayList.push(post);
                }
            }
        } else {
            filteredDisplayList = intersectedData;
        }

        // output
        return filteredDisplayList;

    }

    /**
     * This function sums together the length of all the 2nd 
     * dimension of the array. E.g.
     *  [
     *      ["1","2","3"],
     *      ["4","5","6"]
     *  ]
     * would return 6.
     * 
     * This is used for checking if there is a tag
     * constraint passed in the search input. If there
     * isn't, then it returns everything.
     * 
     * An alternative write might be to use either the
     * reduce function, but you'd have to mash all arrays
     * together then take it's length. 
     * 
     * @param {string[][]} array 
     */
    helperGet2dArrayLength(array) {
        let len = 0;
        for (let row = 0; row < array.length; row++) {
            for (let column = 0; column < array[row].length; column++) {
                len++;
            }
        }
        return len;
    }

    /**
     * This function generates the intersection tag data.
     * 
     * UPDATE
     * Okay, so the name sucks. I confused this with another
     * function. So this function does NOT generate ONLY
     * intersection in the search queries. It handles both
     * the Intersection and Union of the data sets. It's
     * mostly responsible for mashing the 2 together.
     * 
     * DEBUGGING
     * So to add more detail on what the fuck I was writing
     * when I made this. It's a helper function that mashes
     * together all the tags in the inclusion and exclusion
     * data set and creates a single list.
     * 
     * @param {CategoryGroup} tagSelections - This object contains tags the user selected.
     */
    generateIntersectionData(tagSelections) {
        // Part 1 - Generate Inclusion Data

        // The tags we have in tagSelections are only the key names of
        // the actual sorted and grouped entry values. We need to convert
        // these keys to arrays of post keys.

        // Random Note:
        //      I'm not sure if is more efficient to generate a 2d array o
        //      entries to merge, then merge them. Or to just iterate over
        //      using a hashset and add them. The issue though is the AND
        //      operation, since it requires it to be in both data sets. It
        //      would be more difficult since we would need to keep a running
        //      list of tags that have been touched or not per layer. Maybe
        //      a hashset of index values that only increment if the previous
        //      hit occured and we can just iterate through for only the ones
        //      with the final index value sum. 

        // This array is used to store each array of keys
        let entriesToMerge = [];

        // Iterate through the typeGroup keys
        for (let index in tagSelections.iTags[0]) {
            const typeTag = tagSelections.iTags[0][index];

            // add to entries ONLY if it exists 
            if (typeTag in this.typeGroups) {
                entriesToMerge.push(this.typeGroups[typeTag]);
            }
        }

        // Iterate through the tags that are explicitly for tagging data
        // (apologies for the confusing name. Brain can't handle naming things.)
        for (let index in tagSelections.iTags[1]) {
            const tagTag = tagSelections.iTags[1][index];
            if (tagTag in this.tagGroups) {
                entriesToMerge.push(this.tagGroups[tagTag]);
            }
        }

        // Iterate through programming languages
        for (let index in tagSelections.iTags[2]) {
            const pgTag = tagSelections.iTags[2][index];
            if (pgTag in this.programmingLanguageGroups) {
                entriesToMerge.push(this.programmingLanguageGroups[pgTag]);
            }
        }

        // Iterate through publication status
        for (let index in tagSelections.iTags[3]) {
            const psTag = tagSelections.iTags[3][index];
            if (psTag in this.publicationStatusGroups) {
                entriesToMerge.push(this.publicationStatusGroups[psTag]);
            }
        }

        // Iterate through languages group
        for (let index in tagSelections.iTags[4]) {
            const lgTag = tagSelections.iTags[4][index];
            if (lgTag in this.languageGroups) {
                entriesToMerge.push(this.languageGroups[lgTag]);
            }
        }

        // performs the merge operation between the converted data
        let inclusionDataset = null;

        // If it has no tag constraints, then add the whole tag pool in
        if (this.helperGet2dArrayLength(tagSelections.iTags) === 0) {
            inclusionDataset = Object.keys(this.unfilteredPosts);

            // If it is an intersection tag constraint
        } else if (tagSelections.iAnd) {
            inclusionDataset = this.generateIntersection(entriesToMerge);

            // If it is a union tag constraint
        } else {
            inclusionDataset = this.generateUnion(entriesToMerge);
        }

        // Part 2 - Generates the exclude data
        entriesToMerge = [];    // reusing this, cause might as well.

        // Iterate through the typeGroup keys
        for (let index in tagSelections.eTags[0]) {
            const typeTag = tagSelections.eTags[0][index];
            if (typeTag in this.typeGroups) {
                entriesToMerge.push(this.typeGroups[typeTag]);
            }
        }

        // Iterate through the tags that are explicitly for tagging data
        // NO APOLOGIES!
        for (let index in tagSelections.eTags[1]) {
            const tagTag = tagSelections.eTags[1][index];
            if (tagTag in this.tagGroups) {
                entriesToMerge.push(this.tagGroups[tagTag]);
            }
        }

        // Iterate through programming languages
        for (let index in tagSelections.eTags[2]) {
            const pgTag = tagSelections.eTags[2][index];
            if (pgTag in this.programmingLanguageGroups) {
                entriesToMerge.push(this.programmingLanguageGroups[pgTag]);
            }
        }

        // Iterate through publication status
        for (let index in tagSelections.eTags[3]) {
            const psTag = tagSelections.eTags[3][index];
            if (psTag in this.publicationStatusGroups) {
                entriesToMerge.push(this.publicationStatusGroups[psTag]);
            }
        }

        // Iterate through languages group
        for (let index in tagSelections.eTags[4]) {
            const lgTag = tagSelections.eTags[4][index];
            if (lgTag in this.languageGroups) {
                entriesToMerge.push(this.languageGroups[lgTag]);
            }
        }

        // performs the merge operation between the converted data
        let exclusionDataset = null;

        if (tagSelections.eAnd) {
            exclusionDataset = this.generateIntersection(entriesToMerge);
        } else {
            exclusionDataset = this.generateUnion(entriesToMerge);
        }

        // Part 3 - Filter out excluded data from included data
        // Note: we can assume that the 2 data sets are alphanumerically
        // sorted, since the merge preserved sort order. We can simply
        // iterate through the 2 lists and only insert the ones in
        // the inclusion list that aren't found in exclusion list.
        const outputList = [];

        let incI = 0;
        let excI = 0;
        while (incI < inclusionDataset.length && excI < exclusionDataset.length) {

            if (inclusionDataset[incI].localeCompare(exclusionDataset[excI]) === -1) { // umatched inclusion tag, insert
                outputList.push(inclusionDataset[incI]);
                incI++;

            } else if (inclusionDataset[incI].localeCompare(exclusionDataset[excI]) === 1) { // unmatched exclusion tag
                excI++;

            } else { // matching entry, so ignore inclusion data set entry and increment both
                incI++;
                excI++;

            }

        }
        // flush inclusion entries if any remain
        while (incI < inclusionDataset.length) {
            outputList.push(inclusionDataset[incI]);
            incI++;
        }

        return outputList;
    }

    /**
     * This function iterates through both
     * string arrays and performs a union (or)
     * operation between the 2.
     * 
     * I was figuring out how to use reduce, but then
     * I found this post.
     * https://medium.com/swlh/javascript-reduce-with-examples-570f1b51e854
     * although I sorted by data to avoid having to use a hash set. This
     * works as well as an alternative code.
     * 
     * Note: we can assume that the lists in each string have unique tags.
     * E.g. they appear only once, so we don't need to worry about duplicates.
     * 
     * 
     * @param {string[][]} tagList 
     */
    generateUnion(tagList) {
        if (tagList.length === 0) {
            return tagList;
        }

        return tagList.reduce((prev, curr) => {
            const output = [];
            let i = 0;
            let j = 0;

            while (i < prev.length && j < curr.length) {


                if (prev[i].localeCompare(curr[j]) === -1) { // prev comes before curr
                    output.push(prev[i]);
                    i++;

                } else if (prev[i].localeCompare(curr[j]) === 1) { // curr comes before prev
                    output.push(curr[j])
                    j++;

                } else { // same entry found
                    output.push(curr[i]);
                    i++;
                    j++;

                }
            }

            while (i < prev.length) {
                output.push(prev[i]);
                i++;
            }

            while (j < prev.length) {
                output.push(curr[j])
                j++;
            }

            return output;
        });
        // Medium version
        //return tagList.reduce((prev, curr) => [...new Set(first.concat(second))]);
    }

    generateIntersection(tagList) {
        if (tagList.length === 0) {
            return [];
        }

        return tagList.reduce((prev, curr) => {
            const output = [];
            let i = 0;
            let j = 0;

            while (i < prev.length && j < curr.length) {

                if (prev[i].localeCompare(curr[j]) === -1) { // prev comes before curr
                    i++;

                } else if (prev[i].localeCompare(curr[j]) === 1) { // curr comes before prev
                    j++;

                } else { // same entry found
                    output.push(prev[i]);
                    i += 1;
                    j += 1;

                }
            }

            return output;
        })
    }

}