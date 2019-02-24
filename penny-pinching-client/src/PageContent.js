import React, { Component, Fragment } from 'react';
import { SimpleCard } from './Card';

class PageContent extends Component {
  constructor() {
    super();
    this.state = {
      comments: [
        {
          id: '1',
          whoSaidIt: 'Dave van Herten',
          whatDidTheySay: 'Serverless is awesome! And cheap!'
        },
        {
          id: '2',
          whoSaidIt: 'Jeff Atwood',
          whatDidTheySay:
            'There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.'
        }
      ]
    };
  }

  componentDidMount = () => {
    // fetch('/api/comment/', { method: 'GET' })
    //   .then(response => response.json())
    //   .then(comments => this.setState({ comments: comments }))
    //   .catch(error => this.setState({ error: error }));
  };

  render() {
    const { comments } = this.state;
    return (
      <Fragment>
        {comments.map(comment => (
          <SimpleCard
            key={comment.id}
            name={comment.whoSaidIt}
            quote={comment.whatDidTheySay}
          />
        ))}
      </Fragment>
    );
  }
}

export default PageContent;
