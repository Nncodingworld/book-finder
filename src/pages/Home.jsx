import React, { useState } from 'react';
import Filters from '../components/Filters';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [favourites, setFavourites] = useState(
    () => JSON.parse(localStorage.getItem('favourites')) || []
  );
  const [message, setMessage] = useState('');

const handleSearch = async (filters, mode) => {
  setMessage('Loading...');

  let url = 'https://openlibrary.org/search.json?';

  if (mode === 'simple') {
    url += `q=${encodeURIComponent(filters.query)}`;
  } else {
    // Build dynamic advanced search query
    const queryParts = [];

    if (filters.title) queryParts.push(`title:${filters.title}`);
    if (filters.author) queryParts.push(`author:${filters.author}`);
    if (filters.year) queryParts.push(`first_publish_year:${filters.year}`);
    if (filters.language) queryParts.push(`language:${filters.language}`);

    // If only one or multiple filters are given
    const finalQuery = queryParts.join(' ');
    if (finalQuery.trim()) {
      url += `q=${encodeURIComponent(finalQuery)}`;
    } else {
      setMessage('Please fill at least one filter field.');
      return;
    }
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data.docs || [];

    setBooks(results.slice(0, 30));
    setMessage(results.length ? `Found ${results.length} book(s)` : 'No books found');
  } catch (error) {
    console.error(error);
    setMessage('Error fetching data.');
  }
};


  const toggleFavourite = (book) => {
    let updated = [...favourites];
    const exists = favourites.find((b) => b.key === book.key);
    if (exists) updated = favourites.filter((b) => b.key !== book.key);
    else updated.push(book);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px',
        paddingTop: '100px',
        color: 'white',
        background: 'linear-gradient(135deg, #1F1F27, #1F3A5A)'
      }}
    >
      <p className="lead">
        "<span>Search</span>, discover, and dive into stories that will keep you hooked."
      </p>

      <Filters onSearch={handleSearch} />

      {message && <p className="mt-4">{message}</p>}

      <div className="d-flex flex-wrap justify-content-center mt-4">
        {books.map((book, i) => (
          <BookCard
            key={i}
            book={book}
            toggleFavourite={toggleFavourite}
            isFavourite={favourites.some((b) => b.key === book.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
