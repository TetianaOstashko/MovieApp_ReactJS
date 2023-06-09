import React, { useState } from 'react';

function SearchArea({ searchRequest, setSearchRequest, handleSearch}) {
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='col-md-4 offset-md-4'>
      <div className='input-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Search...'
          value={searchRequest}
          onChange={(e) => setSearchRequest(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className='btn btn-primary' onClick={handleSearch}>
          Go
        </button>
      </div>

    {/* div id='genres'>
        <div className='genre text-light'>Action</div>
        <div className='genre text-light'>Adventure</div>
        <div className='genre text-light'>Drama</div>
        <div className='genre text-light'>Comedy</div>
      </div>*/}  

    </div>
  );
}

export default SearchArea;

