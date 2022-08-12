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

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  }
];

function Blog() {

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
