import { Fragment } from "react";

/**
 * PURPOSE
 * This component is responsible for rendering 
 * a detailed post. 
 * 
 * DESIGN
 * This post is based off the tutorials in the offical
 * Google Kotlin tutorials.
 *      - https://developer.android.com/kotlin/campaign/learn
 * The following is a list of different features the
 * page will have.
 *  - app bar
 *      - [optional] hideable left bar navigation drawer button
 *      - button to return back to search page left aligned 
 *      - title of current section page left aligned
 *      - perma link icon button to get reference to blog post link
 *      - tutorial progress bar used to tell how much the use
 *        has done
 *      - predicted time left in post right of progress bar
 *  - [optional] left navgiation drawer (only active if post needs it)
 *      - large box nagivation drawer with title of pages and
 *        sub sections within page listed in indented and smaller
 *        font size.
 *      - pages titles will switch the current page if it's not
 *        the same as the current.
 *  - bottom section (not affected by navigation bar)
 *      - report bug button
 *      - previous page button (left aligned)
 *      - next page button (right aligned)
 *  - Primary Content
 *      - First Post Page
 *          - The first page generally renders some of the metadata
 *            information and additional information such as the following.
 *              - Title of post
 *              - progress bar of completion
 *              - data posted and date edited
 *              - description
 *      - Renders the following content
 *          - headers (h1, h2, h3, ...)
 *              - each header is added to navigation bar
 *          - paragraph
 *              - markdown support for easier bold and italic
 *                support
 *              - latex support
 *          - drop down content hiden
 *              - hides all children normally
 *              - has title
 *              - has special icon to symbolize purpos
 *                  - alert icon to generally notify or raise attention
 *                  - red stop if to be careful of an error
 *                  - exclamation mark to symbolize general info
 *                  - star to describe definitions or go into certain topics in more detail
 *              - has special color to symbolize prupose
 *          - simple image rendering
 *              - renders image stored in public folder
 *              - [optional] clickable modal zoom
 *          - Image collection rendering
 *              - renders a folder of images
 *              - used for comics
 *              - mostly a bunch of clumped together vertical scrolling
 *          - tools
 *              - general purpose stuff, so can be anything you want. Stored in
 *                extensions.
 *              - progress bar
 *                  - to signify progress of how much the post is complete
 *              - pdf renderer
 *                  - to display resumes and other PDF documents.
 *              - Rimworld clothing temperature calculator
 *              - simple graph and bar chart
 *              - kanban chart
 *              - Leetcode planner
 *              - Webpage Content Generator
 *              - Game
 *          - hyperlink to another page for reference. 
 *          - code block
 *              - can swap between languages
 *              - if javascript, optional code running? Like in MDN docs?
 *              - code highlighting
 *  - Extra Features
 *      - end of tutorial confetti
 *      - completion of tutorial green button to head back to search page
 * 
 * @param {Object} post
 */
export default function EnhancedPost({ post }) {


    return <Fragment>
        
    </Fragment>
}