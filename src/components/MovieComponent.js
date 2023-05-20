import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const API_IMAGE = "https://image.tmdb.org/t/p/w500/";

const MovieComponent = ({ id, title, poster_path, vote_average, release_date, overview, addToFavorites, removeFromFavorites, isFavorite }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowInfo = () => setShowModal(true);
  const handleCloseInfo = () => setShowModal(false);

  const handleAddToFavorites = () => {
    if (!isFavorite) {
      addToFavorites();
    } else {
      removeFromFavorites();
    }
  };

  return (
    <div className="card text-center bg-body-tertiary mb-3">
      <div className="card-body">
        <img className="card-img-top" src={API_IMAGE + poster_path} alt="Movie Poster" />
        <div className="card-body">
          {!isFavorite ? (
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={handleAddToFavorites}
            >
              Add to Favorites
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleAddToFavorites}
              disabled={!isFavorite}
            >
              Remove from Favorites
            </button>
          )}
          <button type="button" className="btn btn-primary btn-sm" onClick={handleShowInfo}>
            Show Info
          </button>
          <Modal show={showModal} onHide={handleCloseInfo}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className="card-img-top mx-auto d-block"
                src={API_IMAGE + poster_path}
                alt="Movie Poster"
                style={{ width: "16rem" }}
              />
              <h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="orange"
                  className="bi bi-star-fill mb-2"
                  viewBox="0 0 16 16"
                >
                  <path 
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" 
                />
                </svg>{" "}
                IMDb: {vote_average}
              </h5>
              <h6>Date: {release_date}</h6>
              <hr></hr>
              <p>Overview: {overview}</p>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
