import React from 'react';

export function Button({ onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      Load more
    </button>
  );
}
