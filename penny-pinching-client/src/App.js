import React, { Component, Fragment } from 'react';
import { Header } from './Header';
import PageContent from './PageContent';
import { AddQuote } from './AddQuote';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <section className="section">
          <div className="container">
            <PageContent />
          </div>
        </section>
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <AddQuote />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default App;
