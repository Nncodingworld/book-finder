import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';


const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    setFavourites(JSON.parse(localStorage.getItem('favourites')) || []);
  }, []);

  const removeFavourite = (book) => {
    const updated = favourites.filter(b => b.key !== book.key);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  return (
    <div className="favourites-container">
      <div className="favourites-cards">
        {favourites.length ? (
          favourites.map((book, i) => (
            <BookCard
              key={i}
              book={book}
              toggleFavourite={removeFavourite}
              isFavourite={true}
            />
          ))
        ) : (
          <p className="favourites-empty">No favourites added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
