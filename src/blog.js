import * as React from 'react';
import Container from '@mui/material/Container';
import Header from './header';
import Body from './body';
import Footer from './footer';


const title = "Ben's Dev Log";

const sections = [
  { title: "Projects", url: "#/projects" },
  { title: "Tutorials", url: "#/tutorials" },
  { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

const bannerContent = {
  box1: {
    title: "About Me",
    content: "I am a recent graduate from the University of Washington Bothell "
      + "with a double major in mathematics and computer science. Currently "
      + "jobless at the moment, but searching and working on various personal projects. "
  },
  box2: {
    title: "Contact Information",
    contact: [
      { type: 'email', value: 'mailto:lin.benjamin1@gmail.com' },
      { type: 'linkedin', value: 'https://www.linkedin.com/in/benjamin-lin-a2574b174/' },
      { type: 'github', value: 'https://github.com/softpotato' }
    ]
  }
}

function Blog(props) {
  const {posts} = props;

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Header title={title} sections={sections} />
      </Container>
      <Body content={posts} bannerContent={bannerContent} />
      <Footer />
    </React.Fragment>
  );

}

export default Blog;
