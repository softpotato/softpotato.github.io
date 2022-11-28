import Chip from '@mui/material/Chip';
import { Fragment, useMemo } from "react";

/**
 * This component renders a list of chips that
 * the user can click to add and remove. This
 * also requires the lists to only pass in a
 * head pointer to the list. 
 * 
 * This is primarily used for underneath the
 * search bar for toggling or removing tags.
 * 
 * This component isn't reusable, due to the
 * weird requirement of using a linked list
 * to render. Slight modifications can be
 * made so it can be reused for rendering
 * chips for post previews or the actual
 * post rendering, but that would be too
 * annoying due to the linked list head
 * requirement. This can't be used for anything
 * else.
 * 
 * OLD DESCRIPTION I'M TOO LAZY TO READ AND REVISE
 * 
 * This component renders an array of chips. These chips are
 * ONLY the currently included and excluded tags. There
 * should be 2 arrays of these and this will be rendered as
 * a horizontal scroll of chips. This component can also 
 * remove chips from the listing, but it requires a callback
 * function to be passed in to do so. This scroll can NOT
 * add any chips and must be added through the filter by
 * menu. The reason why this doesn't handle adding chips
 * is because it complicates things and replicates features 
 * you only need once. Also, a horizontal scroll is a
 * terrible way to find the tag you're looking for (at
 * least in my personal opinion. Also, cause I'm
 * salty cause I struggled so much with this when I
 * should have approached it separately.)
 * 
 * PARAMETERS
 * @param {string} pageId - This is used for generating a unique key values.
 * @param {Tag} inclusionHead - This is used for generating the tags that are to be included in search.
 * @param {Tag} exclusion - This is the head of the linked lsit used for generating the tags that
 *                          are to be excluded in search.
 * @param {function} toggleTag - This function is a callback that toggles the tag given the row
 *                               and column of the tag.
 * @param {function} removeTag - This function is a callback that removes the tag from all groups
 *                               given the row and column of the tag.
 */
export default function TagScroll({ pageID, inclusionHead, exclusionHead, toggleTag, removeTag }) {
    const tagScrollId = pageID + "-tag_scroll";

    const inclusionChips = useMemo(() => {
        const output = [];
        let tempHead = inclusionHead;
        while (tempHead != null) {
            const tagName = tempHead.name;
            const row = tempHead.row;
            const column = tempHead.column;
            output.push(<Chip
                sx={{ ml: "5px", mr: "5px" }}
                label={tagName}
                key={tagScrollId + "-" + tagName}
                onClick={() => { toggleTag(row, column) }}
                onDelete={() => { removeTag(row, column) }}
                color="primary"
            />);
            tempHead = tempHead.next;
        }
        return output;
    }, [inclusionHead, removeTag, toggleTag, tagScrollId]);

    const exclusionChips = useMemo(() => {
        const output = [];
        let tempHead = exclusionHead;
        while (tempHead != null) {
            const tagName = tempHead.name;
            const row = tempHead.row;
            const column = tempHead.column;
            output.push(<Chip
                sx={{ ml: "5px", mr: "5px" }}
                label={tagName}
                key={tagScrollId + "-" + tagName}
                onClick={() => { toggleTag(row, column) }}
                onDelete={() => { removeTag(row, column) }}
                variant="outlined"
            />);
            tempHead = tempHead.next;
        }
        return output;
    }, [exclusionHead, removeTag, toggleTag, tagScrollId]);

    return <Fragment>
        {inclusionChips}
        {exclusionChips}
    </Fragment>
}