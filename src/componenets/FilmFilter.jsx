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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            name="search"
            id="search"
            value={filters.search || ''}
            onChange={handleChange}
            aria-label="Search"
          />
        </div>
  
        <div>
          <label htmlFor="director">Director:</label>
          <input
            type="text"
            name="director"
            id="director"
            value={filters.director || ''}
            onChange={handleChange}
            aria-label="Director"
          />
        </div>
  
        <div>
          <label htmlFor="start-year">Start Year:</label>
          <input
            type="year"
            name="start-year"
            id="start-year"
            value={filters['start-year'] || ''}
            onChange={handleChange}
            aria-label="Start Year"
          />
        </div>
  
        <div>
          <label htmlFor="end-year">End Year:</label>
          <input
            type="year"
            name="end-year"
            id="end-year"
            value={filters['end-year'] || ''}
            onChange={handleChange}
            aria-label="End Year"
          />
        </div>
  
        <div>
          <label htmlFor="stars">Stars:</label>
          <input
            type="text"
            name="stars"
            id="stars"
            value={filters.stars || ''}
            onChange={handleChange}
            aria-label="Stars"
          />
        </div>
  
        <div>
          <button type="submit">Apply Filters</button>
        </div>
      </form>
    );
  };
  
  export default FilmFilter;