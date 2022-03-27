import React from 'react';

export function ImageGalleryItem({ id, largeImageURL, webformatURL }) {
  return (
    <li className="gallery-item" id={id}>
      <img src={webformatURL} alt="malunok" data-largeimage={largeImageURL} />
    </li>
  );
}
