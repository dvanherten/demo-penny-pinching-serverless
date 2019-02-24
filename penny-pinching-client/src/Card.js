import React from 'react';

export const SimpleCard = ({ name, quote }) => (
  <div className="card">
    <div className="card-content">
      <p className="title">{`“${quote}”`}</p>
      <p className="subtitle">{name}</p>
    </div>
  </div>
);
