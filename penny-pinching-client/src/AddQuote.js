import React, { Fragment, useState } from 'react';

export const AddQuote = saveCallback => {
  const [name, setName] = useState('');
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  const save = () => {
    setError('');

    if (!name) {
      setError('Name is required.');
      return;
    }

    if (!quote) {
      setError('Quote is required.');
      return;
    }

    fetch('/api/quote', {
      body: JSON.stringify({ whoSaidIt: name, whatDidTheySay: quote }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) return true;
        throw new Error('Server could not be reached');
      })
      .then(_ => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <Fragment>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            value={name}
            placeholder="Who said it?"
            onChange={e => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            placeholder="What did they say?"
            value={quote}
            onChange={e => setQuote(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button" onClick={save}>
            Save Quote
          </button>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <span className="has-text-danger">{error}</span>
        </div>
      </div>
    </Fragment>
  );
};
