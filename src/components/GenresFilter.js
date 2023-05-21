import React, { useState } from 'react';
import GENRES from './genresData';
import MovieComponent from './MovieComponent';

const GenresFilter = ({ genres, movies }) => {
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenreId(genreId);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.genre_ids.includes(selectedGenreId)
  );

  return (
    <div>
      <h6 className='text-light'>Genres</h6>
      <div>
        {GENRES.map((genre) => (
          <button className='btn btn-light btn-sm button-genre'
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div>
        {selectedGenreId && (
          <div>
            <h3 className='text-light'>
              {genres.find((genre) => genre.id === selectedGenreId)?.name}
            </h3>
            {filteredMovies.length > 0 ? (
              <div className='grid'>
                {filteredMovies.map((movie) => (
                  <MovieComponent
                    key={movie.id}
                    {...movie}
                    addToFavorites={() => {}}
                    removeFromFavorites={() => {}}
                    isFavorite={false}
                  />
                ))}
              </div>
            ) : (
              <p className='text-light'>No movies found in this genre.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenresFilter;
