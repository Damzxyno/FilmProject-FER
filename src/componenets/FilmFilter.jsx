import { useState } from "react";
function FilmFilter ({ initialFilters, onSubmit }) {
    const [filters, setFilters] = useState(initialFilters || {});
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(filters);
    };
  
    return (
      <div className="filter-section">
      <form  className="filter-section-form" onSubmit={handleSubmit}>
        <div className="filter-search-box">
          <label htmlFor="search">Search:</label>
          <input
            className="filter-search-input"
            type="text"
            name="search"
            id="search"
            value={filters.search || ''}
            onChange={handleChange}
            aria-label="Search"
          />
        </div>
        <div className="filter-section-form-box">
        <div className="filter-section-form-box-item">
          <label htmlFor="director">Director:</label>
          <input
          className="filter-section-input" 
            type="text"
            name="director"
            id="director"
            value={filters.director || ''}
            onChange={handleChange}
            aria-label="Director"
          />
        </div>
  
        <div className="filter-section-form-box-item">
          <label htmlFor="start-year">Start Year:</label>
          <input
          className="filter-section-input" 
            type="year"
            name="start-year"
            id="start-year"
            value={filters['start-year'] || ''}
            onChange={handleChange}
            aria-label="Start Year"
          />
        </div>
      </div>
      <div class="filter-section-form-box">
        <div className="filter-section-form-box-item">
          <label htmlFor="end-year">End Year:</label>
          <input
          className="filter-section-input" 
            type="year"
            name="end-year"
            id="end-year"
            value={filters['end-year'] || ''}
            onChange={handleChange}
            aria-label="End Year"
          />
        </div>
  
        <div className="filter-section-form-box-item">
          <label htmlFor="stars">Stars:</label>
          <input
          className="filter-section-input" 
            type="text"
            name="stars"
            id="stars"
            value={filters.stars || ''}
            onChange={handleChange}
            aria-label="Stars"
          />
        </div>
  </div>
        <div>
          <button className="filter-section-button" type="submit">Apply Filters</button>
        </div>
      </form>
      </div>
    );
  };
  
  export default FilmFilter;