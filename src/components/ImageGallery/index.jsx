import React from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem';

export function ImageGallery({ data, onClick }) {
  return (
    <ul className="gallery" onClick={onClick}>
      {data.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
}

ImageGallery.propType = {
  data: PropTypes.array,
};
