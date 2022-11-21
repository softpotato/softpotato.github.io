import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import Chip from "@mui/material/Chip";
import Typography from '@mui/material/Typography';
import { Fragment, useState, useContext, useMemo } from "react";
import Switch from "@mui/material/Switch";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SettingContext } from "./app";

/**
 * Contains a mapping of the string state key
 * to the set JSX chip layout.
 * 
 * Also, for various reasons. I had to wrap the
 * toggle function in another function. It kept
 * getting called for no reason if passed not in
 * function.
 */
const jsxChips = {
    "unselected": function (tag, tagKey, toggle) {
        return <Chip
            label={tag.name}
            key={tagKey}
            onClick={() => {toggle(tag.row, tag.column)}}
        />
    },
    "included": function (tag, tagKey, toggle) {
        return <Chip
            label={tag.name}
            key={tagKey}
            onClick={() => {toggle(tag.row, tag.column)}}
            color="primary"
        />
    },
    "excluded": function (tag, tagKey, toggle) {
        return <Chip
            label={tag.name}
            key={tagKey}
            onClick={() => {toggle(tag.row, tag.column)}}
            variant="outlined"
        />
    }
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

/**
 * This component is a button and a modal menu. The
 * modal menu contains multiple collections of tags.
 * 
 * AUTHOR NOTE
 *  I'm trying to make this component resuable, but 
 *  it's difficult to resist the temptation to just
 *  assume that the sections and tags are assumed.
 *  
 * PARAMETERS
 * @param {Object} param0 
 * @param {string} pageID - This is the unique identifier
 *                          of the parent component used for
 *                          key generation.
 * @param {string[]} sectionNames - This is an array of the 
 *                                  groupings of tags in the
 *                                  modal menu. The length of
 *                                  this array must be the same
 *                                  as the following parameter,
 *                                  tags. These 2 are paired
 *                                  together closely.
 * @param {Tag[][]} tags - This is a 2d array containing the
 *                         tags of a corresponding tag section.
 *                         The first dimension length must match
 *                         the lenght of sectionNames.
 * @param {function} toggleTag - This is a callback function to
 *                               toggle the given tag.
 * 
 * AUTHOR NOTE - Why no remove function?
 *  IDK, I'm mostly copying Mangadex.org's style of tag selection
 *  and I really like the no X marks on their tags. It makes it
 *  cleaner also it's really 1-2 more clicks if they get it wrong.
 */
export default function AdvancedTagMenu({ pageID, tags, toggleTag, inclusionAnd, exclusionAnd, toggleInclusionAnd, toggleExclusionAnd }) {
    const { language } = useContext(SettingContext);

    const tagMenuID = useMemo(() => { return pageID + "-advanced_tag_menu" }, [pageID]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    // This function renders the section header and chips
    const renderSections = useMemo(() => {
        const sections = [];
        for (let i = 0; i < language['tag-group-names'].length; i++) {
            const languageName = language['tag-group-names'][i];
            sections.push(<Typography key={languageName}>{languageName}</Typography>);

            const tagList = tags[i];
            for (let index = 0; index < tagList.length; index++) {
                const tag = tagList[index];

                if (tag.state in jsxChips) {
                    sections.push(jsxChips[tag.state](tag, tagMenuID + "-" + tag.name, toggleTag));
                }
            }
        }
        return sections;
    }, [language, tags, tagMenuID, toggleTag]);


    return <Fragment>
        <Button onClick={handleOpen}>{language['tag-menu-button']}</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby={tagMenuID + "-modal_title"}
            aria-description="modal menu of all tags in the current search page"
        >
            <Box sx={style}>
                <Typography key={tagMenuID + "-modal_title"} id={tagMenuID + "-modal_title"} component="h1">
                    {language['tag-modal-title']}
                </Typography>
                {renderSections}

                <FormGroup>
                    <FormControlLabel
                        control={<Switch
                            checked={inclusionAnd}
                            onChange={toggleInclusionAnd}
                        />}
                        label={language['tag-modal-inclusion-and-or-label']} />
                    <FormControlLabel
                        control={<Switch
                            checked={exclusionAnd}
                            onChange={toggleExclusionAnd}
                        />}
                        label={language['tag-modal-exclusion-and-or-label']} />
                </FormGroup>
            </Box>
        </Modal>
    </Fragment>
}
