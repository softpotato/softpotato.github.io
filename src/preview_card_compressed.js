import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import TagList from "./tag_list";
import { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";

/**
 * This component renders the content in a horizontal format. 
 * This isn't really compact. It just renders the content horizontally
 * and takes up the whole width of the webpage.
 * 
 * It takes on the following display style.
 *  - (optional) Thumbnail display on far left side
 *  - title left aligned right of the thumbnail or along the far left border
 *  - tags are left aligned underneath title
 *      - there is no tag limit
 *  - description goes underneath tags
 *  
 * NOTE: I am ripping these styles off Mangadex. I really like that
 *       website and that is the main inspiration for this whole webpage
 *       style. The MUI website is nice and their search bar is nice,
 *       but that search bar is only nice for referencing docs for
 *       code. It's not useful for books or tutorials, since I don't
 *       need to jump around a specific part of the webpage. It's
 *       best if the webpage logs the user's progress in a tutorial
 *       instead.
 * 
 * @param {Object} param0 
 * @returns 
 */
export default function PreviewCardCompressed({ pageID, data }) {
    const previewCardPageID = pageID + "-prewviewCardCompressed-";

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

    return <Grid item xs={12} sm={12} md={12} lg={12}>
        <Card sx={{ display: 'flex', flexDirection: "row" }}>
            <CardActionArea href={"#/posts/" + data["perma-link"]} sx={{ flexGrow: 1 }}>
                <CardContent>
                    <Typography variant="h6">{data["title"]}</Typography>
                    {data["description"].length < 100 ?
                        <Typography variant="subtitle2">{data["description"]}</Typography>
                        :
                        <Typography variant="subtitle2">{data["description"].substring(0,100) + "..."}</Typography>
                    }
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ flexShrink: "1" }}>
                <TagList pageID={previewCardPageID} tags={tags} hyperlinks={hyperlinks} renderLimit={5} />
            </CardActions>
        </Card>
    </Grid>
}