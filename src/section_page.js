import { Fragment, useContext } from "react";
import Footer from "./footer";
import Header from "./header";
import SectionBody from "./section_body";
import { SettingContext } from './app';

/**
 * This page renders the information
 * when you select a section link in
 * the header navigation of a web page.
 * This page features a simpler search
 * page of a single subset of the full
 * posts list. This will also feature
 * a dynamically rendered tags you
 * can filter by, that appear in random
 * horizontal scrollable order. 
 * 
 * @param {string} sectionKey - A unique key identifier for the section page. It should be statically set
 *                              and expects a corresponding entry in the resource object.
 * @param {string} title - A string value of the title of the webpage.
 * @param {string[][]} tags - A 2d array of tags grouped together by their type.
 * @param {string[]} enforcedTags - A list of tags that are by default, set to selected.
 * @param {BlogStateManager} queryInterface - An object used to make queries to the search state.
 */
export default function SectionPage({ sectionKey, title, tags, enforcedTags, queryInterface }) {
    const { language } = useContext(SettingContext);

    return <Fragment>
        <Header title={title} sections={language['navigation']} />
        <SectionBody
            pageID={sectionKey}
            tags={tags}
            searchInterface={queryInterface}
            enforcedTags={enforcedTags}
        />
        <Footer />
    </Fragment>
}