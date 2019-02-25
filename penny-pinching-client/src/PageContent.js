import React, { Component, Fragment } from 'react';
import { SimpleCard } from './Card';

class PageContent extends Component {
  constructor() {
    super();
    this.state = {
      quotes: []
    };
  }

  componentDidMount = () => {
    fetch('/api/quote/', { method: 'GET' })
      .then(response => response.json())
      .then(quotes => this.setState({ quotes: quotes }))
      .catch(error => this.setState({ error: error }));
  };

  render() {
    const { quotes } = this.state;
    return (
      <Fragment>
        {quotes.map(quote => (
          <SimpleCard
            key={quote.id}
            name={quote.whoSaidIt}
            quote={quote.whatDidTheySay}
          />
        ))}
      </Fragment>
    );
  }
}

export default PageContent;
