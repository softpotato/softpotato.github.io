import Chip from "@mui/material/Chip";
import Box from '@mui/material/Box';
import { useMemo } from "react";

/**
 * This class is responsible for rendering
 * a list of tags as chips. These chips 
 * will ONLY act as hyperlinks to other pages
 * if a link is passed in. The tags and hyperlinks
 * parameters are assumed to be the same length.
 * 
 * @param {string[]} tags - a list of tags to render
 * @param {string[]} hyperlinks - a list of hyperlinks for the tag to render
 * @param {number} renderLimit - A max limit of tags it can render.
 */
export default function TagList({ pageID, tags, hyperlinks, renderLimit }) {

    /**
     * This function returns an array of chips for
     * rendering the tags. It pairs the tags and hyperlinks
     * together to form the chips array.
     * 
     * NOTE
     * webpack and the linter won't recognize this function
     * on it's own, e.g. remove useMemo. It needs to be called, 
     * so to either run this function. You'll need to call it 
     * within the {} in the JSX or wrap it in a useMemo. 
     * 
     * @returns {JSX[]} chipsArray
     */
    const renderTagElements = useMemo(() => {
        const chips = [];
        for (let i = 0; i < Math.min(tags.length, renderLimit); i++) {
            chips.push(
                <Chip
                    key={pageID + "-chip-" + tags[i]}
                    label={tags[i]}
                    component="a"
                    href={hyperlinks.length > 0 ? hyperlinks[i].replace(" ", "_") : null}
                    clickable={hyperlinks.length > 0}
                    sx={{ ml: "1px", mr: "1px", mb: "1px" }}
                />
            );
        }
        return chips;
    }, [tags, hyperlinks, renderLimit, pageID]);

    return (
        <Box sx={{ flexWrap: "wrap" }}>
            {renderTagElements}
        </Box>
    );
}