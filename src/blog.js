import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './header';
import Body from './body';
import Footer from './footer';

const title = "Ben's Blog";

const sections = [
  { title: "About", url: "#" },
  { title: "Projects", url: "#" },
  { title: "Archive", url: "#" },
  { title: "IDK", url: "#" }
];

const contact = [
  { type: "Mobile", value: "+1 (425) 435-3700" },
  { type: "Email", value: "lin.benjamin1@gmail.com" }
];

const bannerContent = {
  box1: {
    title: "About Me",
    content: "I am currently a new graduate "
    + "from the University of Washington Bothell "
    + "searching for a job. I'm not full sure what "
    + "I plan to do in the future at the moment, but "
    + "I'm mostly doing this blog to help push myself "
    + "and reflect more on what I've done. I was also "
    + "told to do this by a professor before I graduated, "
    + "but I never had the time to do so. Being jobless "
    + "after college, I got all the free time I want. "
    + "maybe a little too much though... "
  },
  box2: {
    title: "Contact Information",
    contact: [
      {type: 'phone', value: '+1 (425) 435-3700'},
      {type: 'email', value: 'lin.benjamin1@gmail.com'},
      {type: 'linkedin', value: 'https://www.linkedin.com/in/benjamin-lin-a2574b174/'}
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
    // Bad code - apparently for promise, it only works for 1
    //  asynchronous issues arise.
    // for (let i = 0; i < markdownList.length; i++) {
    //   fetch(markdownList[i].path)
    //     .then((res) => {
    //       return res.text();
    //     })
    //     .then((text) => {
    //       //console.log(text);
    //       this.setState({
    //         content: [...this.state.content, text]
    //       });
    //     })
    //     .catch(err => console.log(err));
    // }

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
          <Header title={title} sections={sections} contact={contact} />
        </Container>
        <Body content={this.state.posts} bannerContent={bannerContent} />
      </React.Fragment>
    );
  }
}

export default Blog;
