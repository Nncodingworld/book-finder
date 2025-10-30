import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Filters = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [warning, setWarning] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    title: '',
    author: '',
    year: '',
    language: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();

    // If using simple search
    if (!showAdvanced) {
      if (!query.trim()) {
        setWarning('Please enter a search term.');
        return;
      }
      setWarning('');
      onSearch({ query }, 'simple');
    } 
    // If using advanced search
    else {
      const { title, author, year, language } = advancedFilters;
      if (!title && !author && !year && !language) {
        setWarning('Please fill at least one filter field.');
        return;
      }
      setWarning('');
      onSearch(advancedFilters, 'advanced');
    }
  };

  const handleAdvancedChange = (e) => {
    setAdvancedFilters({
      ...advancedFilters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSearch}>
      <div
        className="d-flex justify-content-center align-items-center mb-3"
        style={{ gap: '10px' }}
      >
        {!showAdvanced ? (
          <>
            <input
              type="text"
              className="form-control"
              style={{ height: '45px', fontSize: '16px', minWidth: '400px' }}
              placeholder="Search by title, author, or year..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn btn-secondary"
              type="submit"
              style={{ height: '45px', fontSize: '16px', minWidth: '100px' }}
            >
              <FaSearch />
            </button>
          </>
        ) : (
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ gap: '10px', maxWidth: '600px' }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={advancedFilters.title}
              onChange={handleAdvancedChange}
              style={{ width: '180px', height: '40px' }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              name="author"
              value={advancedFilters.author}
              onChange={handleAdvancedChange}
              style={{ width: '180px', height: '40px' }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Year"
              name="year"
              value={advancedFilters.year}
              onChange={handleAdvancedChange}
              style={{ width: '100px', height: '40px' }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Language (e.g. eng)"
              name="language"
              value={advancedFilters.language}
              onChange={handleAdvancedChange}
              style={{ width: '120px', height: '40px' }}
            />
            <button
              className="btn btn-secondary"
              type="submit"
              style={{ height: '40px', fontSize: '16px', minWidth: '100px' }}
            >
              <FaSearch />
            </button>
          </div>
        )}

        {/* Filter toggle button */}
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={() => setShowAdvanced(!showAdvanced)}
          style={{ height: '45px', minWidth: '45px' }}
          title="Toggle advanced filters"
        >
          <FaFilter />
        </button>
      </div>

      {warning && (
        <div className="text-center mb-2">
          <small className="text-danger">{warning}</small>
        </div>
      )}
    </form>
  );
};

export default Filters;
