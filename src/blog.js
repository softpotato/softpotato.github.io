import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './header';
import Body from './body';
import Footer from './footer';

const title = "Ben's Dev Log";

const sections = [
  { title: "About (WIP)", url: "#" },
  { title: "Projects (WIP)", url: "#" },
  { title: "Tutorials (WIP)", url: "#" },
  { title: "Archive", url: "https://drive.google.com/drive/folders/1e1ifnwfB8TFh9JHRVSFb-PAwlGJRdwm5?usp=sharing" }
];

const bannerContent = {
  box1: {
    title: "About Me",
    content: "I am a new graduate from the University of Washington Bothell "
    + "with a double major in mathematics and computer science. Currently "
    + "jobless at the moment, but searching and working on various personal projects. "
  },
  box2: {
    title: "Contact Information",
    contact: [
      {type: 'email', value: 'mailto:lin.benjamin1@gmail.com'},
      {type: 'linkedin', value: 'https://www.linkedin.com/in/benjamin-lin-a2574b174/'},
      {type: 'github', value: 'https://github.com/softpotato'}
    ]
  }
}

// Citation: https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
const importAll = r => r.keys().map(r);
const markdownFiles = importAll(require.context('./markdown', false, /\.md$/)).sort().reverse();
console.log(markdownFiles);

class Blog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    const posts = await Promise.all(
      markdownFiles.map((file) => fetch(file).then((res) => res.text())))
      .catch((err) => console.error(err));

    this.setState((state) => ({ ...state, posts }));
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title={title} sections={sections} />
        </Container>
        <Body content={this.state.posts} bannerContent={bannerContent} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Blog;
