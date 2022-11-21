# Search Test Posts

This folder contains several dummy posts used for testing
the search function. They primarily contain mostly metadata
and contain very little actual page information. These should
be manually imported into the test folder.

## Structure of JSON file

Each JSON file comes in the following basic format.

```JSON
{
    "created": "mm-dd-yyyy",
    "updated": "mm-dd-yyyy",
    "title": "Post Title",
    "description": "post description",
    "type": "tutorial/project/tool/other",
    "tags": [
        "other tags",
        "can be anything",
        "there can be none"
    ],
    "status": "ongoing/completed/... try to use preset statuses",
    "programming_languages": [
        "JavaScript",
        "etc...",
        "can be any language"
    ],
    "language": "english/spanish/french/... no restrictions, but only 1 per file",
    "splash_image": "optional, but filename in public folder",
    "splash_image_alt": "this is alternate text",
    "perma-link": "this needs to be a unique key string. This is a unique ID of the post so you can get a link to the post",
    "pages": [
        {
            "type": "there are a bunch of object types. They're not specified in this document",
            "content": "There are also sections that the page can break down into, but I won't go into more detail",
            "sections": []
        }
    ]
}
```