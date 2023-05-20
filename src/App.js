import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieComponent from './components/MovieComponent';
import MainPageHeading from './components/MainPageHeading';
import SearchArea from './components/SearchArea';
import Loader from './components/Loader';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=c7cb8794994279fffdae398fa5892f70";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching popular movies:', error);
          setError('Failed to fetch popular movies.');
          setIsLoading(false);
        });
    }, 3000); 
  }, []);

  const handleSearch = () => {
    if (searchRequest) {
      const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=c7cb8794994279fffdae398fa5892f70&query=${searchRequest}`;
      setIsSearching(true);
      setIsLoading(true);

      fetch(API_SEARCH)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results);
          setIsSearching(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error searching movies:', error);
          setError('Failed to search movies.');
          setIsSearching(false);
          setIsLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  };

  const addToFavorites = (movieId) => {
    const movieToAdd = searchResults.length > 0 ? searchResults.find((movie) => movie.id === movieId) : movies.find((movie) => movie.id === movieId);
    setFavorites([...favorites, movieToAdd]);
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
  };

  return (
    <div className='container bg-dark bg-gradient bg-opacity-75 rounded'>
      <div className='row d-flex align-items-center mt-4 mb-4 overflow-auto'>
        <MainPageHeading heading='Movie App' />
        <SearchArea searchRequest={searchRequest} setSearchRequest={setSearchRequest} handleSearch={handleSearch} />
      </div>

      {error && <div className='error-message'>{error}</div>}

      {(isLoading || isSearching) && <Loader />}

      {!isLoading && !isSearching && (
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
      )}

      <div className='favorites-container'>
        <h2 className='text-light'>Favorite Movies</h2>
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
            <p className='text-light'>No favorite movies yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
