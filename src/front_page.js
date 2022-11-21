import { useContext, Fragment } from 'react';
import Header from './header';
import PrimaryBody from './primary_body';
import Footer from './footer';
import { SettingContext } from './app';

/**
 * This component renders the full front page of the
 * blog (excluding the theme switcher). This
 * primarily groups the layout together.
 * 
 * This component and all sub components below this
 * are primarily static components not really meant
 * to be reused in any capacity, aside from the primary
 * post scroll. Every other element requires the "resource"
 * field setting static elements.
 * 
 * @param {Object} props 
 * @returns 
 */
export default function FrontPage({ pageID, posts }) {
  const { language } = useContext(SettingContext);

  return (
    <Fragment>
      <Header title={language['primary-title']} sections={language['navigation']} />
      <PrimaryBody content={posts} />
      <Footer pageID={pageID} />
    </Fragment>
  );

}