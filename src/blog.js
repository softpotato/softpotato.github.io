import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './header';
import Body from './body';

const title = "Ben's Blog";

const sections = [
  { title: "About", url: "#"},
  { title: "Projects", url: "#"},
  { title: "Archive", url: "#"},
  { title: "IDK", url: "#" }
];

const contact = [
  { type: "Mobile", value: "+1 (425) 435-3700"},
  { type: "Email", value: "lin.benjamin1@gmail.com"}
];

const markdownList = [
  { path: './markdown/doc1.md'}
]

function Blog() {

  React.useEffect(() => {
    for (let i = 0; i < markdownList.length; i++) {
      import(markdownList[i].path)
        .then((res) => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={title} sections={sections} contact={contact} />
      </Container>
      <Body />
    </React.Fragment>
  );
}

export default Blog;
