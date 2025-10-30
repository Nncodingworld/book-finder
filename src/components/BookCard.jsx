import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const BookCard = ({ book, toggleFavourite, isFavourite }) => {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150x220?text=No+Cover';

  const link = `https://openlibrary.org${book.key}`;

  return (
    <div
      className="card m-2 shadow"
      style={{
        width: '12rem',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        color: '#F5F5F5',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      <img
        src={cover}
        className="card-img-top"
        alt={book.title}
        style={{
          height: '180px',
          objectFit: 'cover',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        }}
      />
      <div className="card-body p-2">
        <h6 className="card-title text-truncate" style={{ color: '#FFD700' }}>
          {book.title}
        </h6>
        <p className="card-text small mb-2" style={{ color: '#E0E0E0' }}>
          {book.author_name?.[0] || 'Unknown'} <br />
          <small>{book.first_publish_year || 'N/A'}</small>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() => toggleFavourite(book)}
            style={{ borderColor: 'rgba(255, 215, 0, 0.7)' }}
          >
            {isFavourite ? <FaStar color="gold" /> : <FaRegStar color="gold" />}
          </button>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light btn-sm"
          >
            ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
