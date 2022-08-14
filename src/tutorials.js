import Header from "./header";
import PostFeed from "./posts_feed";
import Footer from "./footer";
import React, {useState, useEffect} from "react";

const title = 'Tutorials';
const sections = [
    { title: "Home", url: "#/" },
    { title: "Projects", url: "#/projects" },
    { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

const importAll = r => r.keys().map(r);
const markdownFiles = importAll(require.context('./tutorials', false, /\.md$/)).sort();

export default function Tutorials(props) {
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const tutorials = await Promise.all(
                markdownFiles.map((file) => fetch(file).then((res) => res.text())))
                .catch((err) => console.error(err));
            setTutorials(tutorials);
        }
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <React.Fragment>
        <Header title={title} sections={sections} />
        <PostFeed posts={tutorials} />
        <Footer />
    </React.Fragment>
}