import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TagScroll from './tag_scroll';
import PostResults from './post_results';
import { useEffect, useState } from 'react';
import Tag, { TAGSTATES } from './ui_state/tag';
import SearchInput from './state/search_input';
import AdvancedTagMenu from './advanced_tag_menu';
import ButtonGroup from '@mui/material/ButtonGroup';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import IconButton from '@mui/material/IconButton';


/**
 * Layout enum for setting the
 * layout of the posts.
 */
export const LAYOUT = {
    GRID: "grid",
    COMPRESSED: "compressed"
};

/**
 * This component is responsible for rendering
 * the main content of a section. This includes
 * a search bar to parse the text, a sort by
 * button to alter how the data is sorted,
 * and horizontal scroll of tags to filter some
 * of the information. The tag scroll is not
 * intended to be advanced in any way and
 * should be kept to a minimum. 
 * 
 * Note: The reason for the minimal design for
 * tags is because we have an advanced search
 * page. This has a much more indepth search 
 * ability.
 * 
 * OTHER NOTES
 *      tag string[][] format
 *          [
 *              [type],
 *              [generalTags],
 *              [programmingLanguage],
 *              [publicationStatus],
 *              [language]
 *          ]
 *      The tags have to be 5 arrays in this
 *      order, otherwise nothing will get retrieved.
 * 
 *      How state for tags is stored
 *          Tags are first converted from a string[][] to
 *          Tag[][] where Tag is a wrapper class enabling
 *          state setting (for convenience) and a doubly
 *          linked list pointer.
 * 
 *          We'll maintain the included and excluded lists
 *          in the doubly linked list pointers. This is
 *          useful for rendering and we can simply store
 *          and pass down the head of these linked lists
 *          for rendering. However, to trigger state changes
 *          we'll need to have insertions insert ONLY in
 *          the heads and removals either copy the head or
 *          insert/remove a dummy head every iteration.
 * 
 *          For conversion for search input, we'll need to
 *          iterate over the tags and create the arrays
 *          corresponding to the included and excluded 
 *          matrixes.
 * 
 *          For updating key storage, the row and column
 *          index position would have to be passed down
 *          to each entry.
 * 
 *      Alternate version for tag storage
 *          Tags would have been stored in their original
 *          string[][] form. There would have been a set()
 *          storing the included and excluded keys for each
 *          row. 
 * 
 *          The rendering would have to convert each
 *          set into 1 array, then be mashed together.
 *  
 *          The render would also do the same thing, but
 *          keep them in their separate respective array 
 *          ordering.
 * 
 *          In order to render the tags in the modal 
 *          menu, both the tags and the array of sets
 *          would need to be passed down and each
 *          entry would have to check their state
 *          and remove it when necessary.
 * 
 *          Updating tag start would require the index
 *          position of the row and name of the tag.
 * 
 *      Author Opinion
 *          The alternate version requires an O(3n)
 *          memory to store all tags. The first is O(n)
 *          but each n contains a few other additional
 *          state information. Also, while checking if
 *          a key is in the set is O(1), hashing is in my
 *          opinion, an expensive O(1) operation. Also,
 *          for triggering a state update in the alternate,
 *          it requires an O(m*n) space reallocation, since
 *          in order to cause an update of an array. You
 *          need to update the array reference to a new
 *          array instead of just altering it in React.
 * 
 * Search Throttling
 *      Obviously, we shouldn't query the search pool
 *      every change in the search bar. This is an expensive
 *      operation, but I'm not too sure how to throttle this.
 *      So I searched it up and stack overflow has a solution.
 *      https://stackoverflow.com/questions/72074617/react-start-searching-when-the-user-stops-typing
 * 
 *      Yeah, I'm copying from this. 
 * 
 * SUPER DUPER IMPORTANT NOTE THAT I HOPE I DON'T FORGET FOR THE LOVE OF DOGS (I don't believe in god)
 *      tags must have the default language that the user specifies. Tags can change when the user
 *      changes language. It's okay if this causes the tags to reset the tags list. 
 * 
 * PARAMETERS
 * @param {string} pageID - A unique string value used to generate unique key value for DOM elements.
 * @param {string[][]} tags - A 2d array of tag names. This needs to be converted to a more useable format.
 * @param {BlogStateManager} searchInterface - This object acts as an intermediary between the search state and the UI.
 *                                             call the search function here to search for a given input.
 * @param {string[]} enforcedTags - A list of tags to include by default. This list needs to be converted into
 *                                  a hashmap and used by the the component in convertTags() whenever you want
 *                                  to reinitialize the default search tag state of the page. It should only
 *                                  set to default search state under the conditions.
 *                                      1) initialization
 *                                      2) language change - enforcedTags will change if it happens
 *                                  Also, the enforced tags list can'y specify exclusion. It only lists inclusion.
 */
export default function SectionBody({ pageID, tags, searchInterface, enforcedTags, modalName, sectionNames, inclusionAndOrLabel, exclusionAndOrLabel }) {
    const sectionID = pageID + "-section_body";

    /**
     * This function converts back the Tag[][] into a string[][].
     * This is intended for the search function, since it expects
     * a string array instead of a Tag array.
     * 
     * @param {Tag[][]} tagArr 
     * @param {string} condition 
     * @returns {string[][]}
     */
    const convertTagsToSearch = (tagArr, condition) => {
        const output = [];
        for (let row in tagArr) {
            const tempRow = [];
            for (let column in tagArr[row]) {
                if (tagArr[row][column].state === condition) {
                    tempRow.push(tagArr[row][column].name);
                }
            }
            output.push(tempRow);
        }
        return output;
    }

    // array of Tag objects. 
    const [convertedTags, setConvertedTags] = useState([[], [], [], [], []]);

    // Search Input Information
    const [searchBar, setSearchBar] = useState(""); // the search Bar contents
    const [sortBy, setSortBy] = useState("bestMatch");
    const [ascending, setAscending] = useState(true);
    const [inclusionHead, setInclusionHead] = useState(null);
    const [inclusionAnd, setInclusionAnd] = useState(true);
    const [exclusionHead, setExclusionHead] = useState(null);
    const [exclusionAnd, setExclusionAnd] = useState(false);

    // Display information
    const [posts, setPosts] = useState([]);

    // UI Control State
    const [postLayout, setPostLayout] = useState(LAYOUT.GRID);

    // Callback function passed down
    /**
     * This callback function cycles the tag between 3 
     * states in the following order.
     * 
     * unselected -> included -> excluded -> unselected
     * 
     * AUTHOR NOTE:
     *  Every time we toggle a tag, we'll also need to
     *  update the tag array reference in the useState.
     *  This is for the sake of the advanced tag menu,
     *  so we can reuse this function for another component.
     *  This might be inefficient, but it updates 2-3 
     *  useStates per call.
     * 
     * @param {number} row 
     * @param {number} column 
     */
    const toggleTag = (row, column) => {

        const node = convertedTags[row][column]; // gets current node (save typing effort)
        switch (node.state) {
            case TAGSTATES.UNSELECTED:
                // Inserts converted tag into linked list
                node.next = inclusionHead;
                setInclusionHead(node);
                if (node.next != null) {
                    node.next.prev = node;
                }
                // assume no previous pointer set

                // update state
                node.state = TAGSTATES.INCLUDED;

                // Note: triggering update to removal is not necessary, since it sets head
                break;

            case TAGSTATES.INCLUDED:
                // Note: Not sure if this is necessary, but since we're removing from one head and
                // updating another. I think it'll trigger a re-render in all child components.

                // Head check, since I'm not using a dummy node for the head. I'll need to make sure
                // that when removing, I set the head to null properly
                if (node.name === inclusionHead.name) { // if the head node
                    setInclusionHead(inclusionHead.next);

                } else { // if not the head node
                    node.prev.next = node.next; // can guarantee previous node
                    if (node.next != null) {
                        node.next.prev = node.prev;
                    }

                    // we need to copy the head and replace it's entry in order to trigger changes
                    const incHeadNodeCopy = inclusionHead.copy();
                    if (incHeadNodeCopy.next != null) {
                        incHeadNodeCopy.next.prev = incHeadNodeCopy;
                    }
                    convertedTags[incHeadNodeCopy.row][incHeadNodeCopy.column] = incHeadNodeCopy;
                    setInclusionHead(incHeadNodeCopy); // trigger state change

                }

                // update excluded and node's new position.
                node.prev = null;
                node.next = exclusionHead;
                setExclusionHead(node);
                if (node.next != null) {
                    node.next.prev = node;
                }

                // update state
                node.state = TAGSTATES.EXCLUDED;

                break;

            case TAGSTATES.EXCLUDED:

                // check if at the head or not. remove from head if it is, or copy
                // head instead to trigger changes.
                if (exclusionHead.name === node.name) {
                    setExclusionHead(exclusionHead.next);
                } else {
                    node.prev.next = node.next;
                    if (node.next != null) {
                        node.next.prev = node.prev;
                    }

                    const excHeadNodeCopy = exclusionHead.copy();
                    if (excHeadNodeCopy.next != null) {
                        excHeadNodeCopy.next.prev = excHeadNodeCopy;
                    }
                    convertedTags[excHeadNodeCopy.row][excHeadNodeCopy.column] = excHeadNodeCopy;
                    setExclusionHead(excHeadNodeCopy);

                }

                // update the node references to null
                node.next = null;
                node.prev = null;

                // update state
                node.state = TAGSTATES.UNSELECTED;

                break;

            default:
                console.error("section_body.js invalid toggle state");
                break;
        }

        // Update the convertedTags useState 
        // Citation: https://stackoverflow.com/questions/13756482/create-copy-of-multi-dimensional-array-not-reference-javascript
        const newConvertedTags = convertedTags.map(function (arr) {
            return arr.slice();
        });
        setConvertedTags(newConvertedTags);
    }

    /**
     * This function sets the tag to null and removes it from it's given state.
     * Unlike the toggle function, this doesn't swap between states. It
     * simply sets it to unselected.
     * 
     * @param {number} row 
     * @param {number} column 
     */
    const removeTag = (row, column) => {
        const node = convertedTags[row][column]; // gets current node (save typing effort)

        switch (node.state) {
            case TAGSTATES.UNSELECTED:
                // do nothing
                break;

            case TAGSTATES.INCLUDED:

                // removes node from inclusion linked list
                if (node.name === inclusionHead.name) { // if the head node
                    setInclusionHead(inclusionHead.next);
                } else { // if not the head node

                    node.prev.next = node.next;
                    if (node.next != null) {
                        node.next.prev = node.prev;
                    }
                    const incHeadNodeCopy = inclusionHead.copy();
                    if (incHeadNodeCopy.next != null) {
                        incHeadNodeCopy.next.prev = incHeadNodeCopy;
                    }
                    convertedTags[incHeadNodeCopy.row][incHeadNodeCopy.column] = incHeadNodeCopy;
                    setInclusionHead(incHeadNodeCopy); // trigger state change

                }

                break;

            case TAGSTATES.EXCLUDED:

                // removes node from exclusion linked list
                if (exclusionHead.name === node.name) {
                    setExclusionHead(exclusionHead.next);
                } else {
                    node.prev.next = node.next;
                    if (node.next != null) {
                        node.next.prev = node.prev;
                    }

                    const excHeadNodeCopy = exclusionHead.copy();
                    if (excHeadNodeCopy.next != null) {
                        excHeadNodeCopy.next.prev = excHeadNodeCopy;
                    }
                    convertedTags[excHeadNodeCopy.row][excHeadNodeCopy.column] = excHeadNodeCopy;
                    setExclusionHead(excHeadNodeCopy);

                }

                break;

            default:
                console.error("section_body.js invalid toggle state");
                break;
        }

        // set all pointers to null
        node.next = null;
        node.prev = null;

        // update state
        node.state = TAGSTATES.UNSELECTED;

        // Update convertedTags references
        const newConvertedTags = convertedTags.map(function (arr) {
            return arr.slice();
        });
        setConvertedTags(newConvertedTags);
    }

    // UI Functions
    const onSearchBarChange = (event) => {
        setSearchBar(event.target.value);
    };

    const [selectValues, setSelectValues] = useState("bm");
    /**
     * This is a map between the key values in the select
     * menu and the output, since the select menu is actually
     * a listing of compound key entries, we need to store 2
     * values. However, using arrays for values isn't a good
     * solution since they're arrays and I don't think webpack
     * will probably not compare it properly with the available
     * pool. It's better to keep it as a string, but we'll
     * need a hash map to maintain the matching.
     * 
     */
    const sortTypeMapping = {
        "bm": ["bestMatch", false],
        "ta": ["title", true],
        "td": ["title", false],
        "lpa": ["datePosted", true],
        "opd": ["datePosted", false],
        "lua": ["lastEdited", true],
        "oud": ["lastEdited", false]
    };

    const onSortTypeChange = (event) => {
        setSelectValues(event.target.value);
        const [sortType, ascendingBoolean] = sortTypeMapping[event.target.value];
        setSortBy(sortType);
        setAscending(ascendingBoolean);
    };

    const toggleInclusionAnd = () => {
        setInclusionAnd(!inclusionAnd);
    };

    const toggleExclusionAnd = () => {
        setExclusionAnd(!exclusionAnd);
    };

    const togglePostLayoutToGrid = () => {
        setPostLayout(LAYOUT.GRID);
    }

    const togglePostLayoutToCompressed = () => {
        setPostLayout(LAYOUT.COMPRESSED);
    }

    /**
    * This function triggers whenever the enforcedTags
    * changes and on initialization.
    * 
    * We're sort of using this as a lifecycle method. This 
    * is primarily meant to be run on initialization, but
    * also when 1 property changes. There are a bunch of
    * dependencies, but we're mostly resetting everything
    * when it happens. We can't add them to the depencency,
    * since they'll cause an endless dependency loop. 
    * Thus, we disable the linter for this useEffect.
    */
    useEffect(() => {
        /**
         * This is more of an initialization sequence.
         * 
         * This function initializes the 2d array data
         * structure in this component. It only updates
         * when the enforced tags changes (which it should
         * ONLY occur on language change). 
         * 
         * It converts the 2d string array into a 2d Tag
         * array to enable linked list headers to point
         * into the array.
         * 
         * This also resets the heads of the current inclusion
         * and exclusion linked lists and regenerates the 
         * listings based off the enforced Tags list.
         */
        const convertTags = () => {

            // Resets all fields
            setInclusionHead(null); // asynchronous method, so don't rely on 
            setExclusionHead(null); // values updating later in code.
            setInclusionAnd(true);
            setExclusionAnd(false);
            setAscending(true);
            setSortBy("bestMatch");
            setSearchBar("");

            // Creates hash set from enforced tags to make it easier to check if
            // to add the field to inclusion head.
            const tagsToInclude = new Set();
            for (let i in enforcedTags) {
                tagsToInclude.add(enforcedTags[i]);
            }

            let newInclusionHead = null;

            // Iterate over all tags and convert them. If they're in the
            // hash set, then add them to linked list.
            const convertedArr = [];
            for (let row in tags) {
                const newRow = [];
                for (let column in tags[row]) {
                    const newTag = new Tag(tags[row][column], row, column)
                    newRow.push(newTag);

                    // check if in hash set
                    if (tagsToInclude.has(newTag.name)) {

                        // add tag to linked list
                        newTag.next = newInclusionHead;
                        newInclusionHead = newTag;
                        newTag.state = TAGSTATES.INCLUDED;
                        if (newTag.next != null) {
                            newTag.next.prev = newTag;
                        }


                    }
                }
                convertedArr.push(newRow);
            }

            // sets the new tag state
            setConvertedTags(convertedArr);

            // update new head
            setInclusionHead(newInclusionHead);
        };

        convertTags(tags);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enforcedTags]);
    // enforcedTags, ascending, convertedTags, exclusionAnd, inclusionAnd, searchInterface, sortBy, inclusionHead, searchBar, tags


    // Search Bar Change
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const query = new SearchInput(searchBar, sortBy, ascending, convertTagsToSearch(convertedTags, TAGSTATES.INCLUDED), inclusionAnd, convertTagsToSearch(convertedTags, TAGSTATES.EXCLUDED), exclusionAnd);
            searchInterface.searchPosts(query, setPosts);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [searchBar, ascending, convertedTags, exclusionAnd, inclusionAnd, searchInterface, sortBy]);

    return <Paper>
        <TextField value={searchBar} onChange={onSearchBarChange} />
        <Select value={selectValues} onChange={onSortTypeChange}>
            <MenuItem value={"bm"}>Best Match</MenuItem>
            <MenuItem value={"ta"}>Title (a-z)</MenuItem>
            <MenuItem value={"td"}>Title (z-a)</MenuItem>
            <MenuItem value={"lpa"}>Latest Posts</MenuItem>
            <MenuItem value={"opd"}>Oldest Posts</MenuItem>
            <MenuItem value={"lua"}>Latest Updates</MenuItem>
            <MenuItem value={"oud"}>Oldest Updates</MenuItem>
        </Select>
        <ButtonGroup>
            <IconButton aria-label="compact" disabled={LAYOUT.COMPRESSED === postLayout} onClick={togglePostLayoutToCompressed}>
                <TableRowsIcon />
            </IconButton>
            <IconButton aria-label="cozy" disabled={LAYOUT.GRID === postLayout} onClick={togglePostLayoutToGrid}>
                <ViewModuleIcon />
            </IconButton>
        </ButtonGroup>
        <AdvancedTagMenu pageID={sectionID} modalName={modalName} sectionNames={sectionNames} tags={convertedTags} toggleTag={toggleTag} inclusionAnd={inclusionAnd} exclusionAnd={exclusionAnd} toggleInclusionAnd={toggleInclusionAnd} toggleExclusionAnd={toggleExclusionAnd} inclusionAndOrLabel={inclusionAndOrLabel} exclusionAndOrLabel={exclusionAndOrLabel} />
        <TagScroll pageID={sectionID} inclusionHead={inclusionHead} exclusionHead={exclusionHead} toggleTag={toggleTag} removeTag={removeTag} />
        <PostResults pageID={sectionID} posts={posts} style={postLayout} />
    </Paper>
}