import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import TagList from "./tag_list";
import { useState, useEffect } from "react";

/**
 * This component renders a post preview.
 * It has the following features.
 *  - (optional) if there is a thumbnail, display at top
 *  - display header underneath thumbnail or at top if none
 *  - display description underneath (cropped to size of card)
 *  - display tags in the following order using chips.
 *      - type
 *      - programming language
 *      - other tags
 *    This should only display up to 5 tags.
 * 
 * ADDITIONAL FEATURES
 *  - It's difficult to identify the most important
 *    tags in general. There is no general rule for
 *    what tags a person might look for or what is
 *    most important. e.g.
 *      * if the user choses to have multiple language
 *          tags, then it should display languages. Otherwise,
 *          we can assume the user ONLY expects their given language.
 *      * if the user choses to search by a programming
 *          language or filter by it, is there a need
 *          to show that programming language tag?
 *      * if there are too many programming languages
 *          for a tag, how do you handle overflow?
 *          Should it compress the tag into one?
 *          Should the programming language tags
 *          be cropped to a minimum number?
 *      * what tags should be prioritized? E.g. if I
 *          can only fit 3 or 5 tags, which ones are
 *          the MOST important for a user when filtering
 *          through a list? Obviously, it would vary from
 *          user to user. Say I was trying to find one 
 *          for video games. I'd either search through
 *          the list to find the tag or filter it out
 *          for only video games. Then maybe I can 
 *          assume the list ONLY has video games. Or
 *          maybe the user doesn't assume this, and
 *          expects to see tha tag at first.
 *      * Say I want to see listings of just the tags.
 *          You might click on the tag to see a separate
 *          page of just the tags. That might be important.
 *  That is why I'm putting off the special rules for now.
 *  I can possibly come up with every single rule for what
 *  tag to display or have several linear regression machine
 *  learning algorithm to decide what tags and how much depending
 *  on the user inputs, but that would be another side project
 *  on it's own. I'll consider it another time.
 * 
 * @param {*} param0 
 * @returns 
 */
export default function PreviewCardCozy({ pageID, data }) {
    const previewCardPageID = pageID +  "-previewCard";

    const [tags, setTags] = useState([]);
    const [hyperlinks, setHyperlinks] = useState([]);

    useEffect(() => {
        const newTags = [data["type"]];
        const newHyperlinks = ["#/tags/" + data["type"]];

        // Start counter till it reaches 5
        let counter = 1;

        // Add programming languages
        let programmingLanguageIndex = 0;
        while (counter <= 5 && programmingLanguageIndex < data["programming_languages"].length) {
            newHyperlinks.push("#/tags/" + data["programming_languages"][programmingLanguageIndex]);
            newTags.push(data["programming_languages"][programmingLanguageIndex]);

            counter++;
            programmingLanguageIndex++;
        }

        // Add general tags
        let generalTagsIndex = 0;
        while (counter <= 5 && generalTagsIndex < data["tags"].length) {
            newHyperlinks.push("#/tags/" + data["tags"][generalTagsIndex]);
            newTags.push(data["tags"][generalTagsIndex]);

            counter++;
            generalTagsIndex++;
        }

        setTags(newTags);
        setHyperlinks(newHyperlinks);

    }, [data]);

    return <Grid item key={"card-cozy-" + data["perma-link"]}>
        <Card>
            <CardActionArea href={"#/posts/" + data["perma-link"]}>
                {data["splash_image"] !== "" &&
                    <CardMedia
                        component="img"
                        image={data["splash_image"]}
                        alt={data["splash_image_alt"]}
                    />
                }
                <CardContent>
                    <Typography>{data["title"]}</Typography>
                    <Typography>{data["description"]}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <TagList pageID={previewCardPageID} tags={tags} hyperlinks={hyperlinks} renderLimit={5} />
            </CardActions>
        </Card>
    </Grid>
}