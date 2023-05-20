import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieComponent from './components/MovieComponent';
import MainPageHeading from './components/MainPageHeading';
import SearchArea from './components/SearchArea';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=c7cb8794994279fffdae398fa5892f70";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error('Error fetching popular movies:', error);
        setError('Failed to fetch popular movies.');
      });
  }, []);

  const handleSearch = () => {
    if (searchRequest) {
      const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=c7cb8794994279fffdae398fa5892f70&query=${searchRequest}`;
      fetch(API_SEARCH)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results);
        })
        .catch((error) => {
          console.error('Error searching movies:', error);
          setError('Failed to search movies.');
        });
    } else {
      setSearchResults([]);
    }
  };

  const addToFavorites = (movieId) => {
    const movieToAdd = movies.find((movie) => movie.id === movieId);
    setFavorites([...favorites, movieToAdd]);
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
  };

  return (
    <div className='container bg-dark bg-gradient bg-opacity-75'>
      <div className='row  d-flex align-items-center mt-4 mb-4 overflow-auto'>
        <MainPageHeading heading='Movie App' />
        <SearchArea searchRequest={searchRequest} setSearchRequest={setSearchRequest} handleSearch={handleSearch} />
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='grid'>
        {searchResults.length > 0 ? (
          searchResults.map((movieComponent) => (
            <MovieComponent
              key={movieComponent.id}
              {...movieComponent}
              addToFavorites={() => addToFavorites(movieComponent.id)}
              removeFromFavorites={() => removeFromFavorites(movieComponent.id)}
              isFavorite={favorites.some((movie) => movie.id === movieComponent.id)}
            />
          ))
        ) : (
          movies &&
          movies.map((movieComponent) => (
            <MovieComponent
              key={movieComponent.id}
              {...movieComponent}
              addToFavorites={() => addToFavorites(movieComponent.id)}
              removeFromFavorites={() => removeFromFavorites(movieComponent.id)}
              isFavorite={favorites.some((movie) => movie.id === movieComponent.id)}
            />
          ))
        )}
      </div>

      <div className='favorites-container'>
        <h2>Favorite Movies</h2>
        <div className='grid'>
          {favorites.length > 0 ? (
            favorites.map((favoriteMovie) => (
              <MovieComponent
                key={favoriteMovie.id}
                {...favoriteMovie}
                removeFromFavorites={() => removeFromFavorites(favoriteMovie.id)}
                isFavorite={true}
              />
            ))
          ) : (
            <p>No favorite movies yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
