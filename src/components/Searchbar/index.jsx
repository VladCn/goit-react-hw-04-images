import React, {useState} from 'react';
import PropTypes from 'prop-types';

export function Searchbar({onSubmit}){
  const[name, setName] = useState(null)

  const handleNameChange = event => {
    event.preventDefault();

    setName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    onSubmit(event, name);
  };


    return (
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleNameChange}
          />
        </form>
      </header>
    );
}

Searchbar.propType = {
  onSubmit: PropTypes.func,
};
