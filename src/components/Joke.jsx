import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { db } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import Modal from "react-modal";
import "./Joke.css";

Modal.setAppElement("#root");

const Joke = () => {
  const [joke, setJoke] = useState("");
  const [rating, setRating] = useState(0);
  const [loadingJoke, setLoadingJoke] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState({ mostLikedJoke: "", highestRating: 0 });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchJoke = async () => {
    if (loadingJoke) return;
    setLoadingJoke(true);
    try {
      const response = await axios.get(
        "https://v2.jokeapi.dev/joke/Programming"
      );
      const jokeData = response.data;
      const jokeText =
        jokeData.type === "twopart"
          ? `${jokeData.setup} ... ${jokeData.delivery}`
          : jokeData.joke;
      setJoke(jokeText);
    } catch (error) {
      console.error("Error fetching the joke:", error);
    } finally {
      setLoadingJoke(false);
    }
  };

  const submitRating = async () => {
    try {
      await addDoc(collection(db, "jokeRatings"), {
        joke: joke,
        rating: parseInt(rating, 10),
        timestamp: new Date(),
      });
      console.log("Rating submitted");
      setRating(0);
      fetchJoke();
      fetchStatistics();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const fetchStatistics = async () => {
    setLoadingStats(true);
    try {
      const q = query(
        collection(db, "jokeRatings"),
        orderBy("rating", "desc"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      let mostLikedJoke = "";
      let highestRating = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        mostLikedJoke = data.joke;
        highestRating = data.rating;
      });

      setStats({ mostLikedJoke, highestRating });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchJoke();
    fetchStatistics();
  }, []);

  return (
    <div className="joke-container">
      {loadingJoke || loadingStats ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {stats.highestRating > 0 && (
            <button className="most-liked-button" onClick={openModal}>
              Most Liked
            </button>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Most Liked Joke"
            className="modal"
            overlayClassName="overlay"
          >
            <div className="modal-header">
              <h2>Most Liked Joke</h2>
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                onClick={closeModal}
                className="modal-close-icon"
              />
            </div>
            <div className="modal-body">
              <p>
                <strong>Joke:</strong> {stats.mostLikedJoke}
              </p>
              <p>
                <strong>Highest Rating:</strong> {stats.highestRating}
              </p>
            </div>
          </Modal>
          <div className="joke-text">{joke}</div>
          <div className="rating-container">
            <label htmlFor="rating">Rate this joke:</label>
            <input
              type="range"
              id="rating"
              name="rating"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <span>{rating}</span>
          </div>
          <div className="icon-buttons">
            <FontAwesomeIcon
              icon={faSync}
              size="2x"
              onClick={fetchJoke}
              className="icon"
            />
            <FontAwesomeIcon
              icon={faCheck}
              size="2x"
              onClick={submitRating}
              className="icon"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Joke;
