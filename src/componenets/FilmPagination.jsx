import React from 'react';

function FilmPagination({ paginatedFilmsObject, onPageChange }) {
  const { currentFilmCount, totalFilmsCount, totalFilmsPages, pageNumber, hasNext, hasPrevious } = paginatedFilmsObject;
  const buttonsToShow = 5; // Adjust the number of buttons you want to show

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber >= 1 && newPageNumber <= totalFilmsPages) {
      onPageChange(newPageNumber);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, pageNumber - Math.floor(buttonsToShow / 2));
    const endPage = Math.min(totalFilmsPages, startPage + buttonsToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)} className={i === pageNumber ? 'active' : ''}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <p>
        Showing {currentFilmCount} of {totalFilmsCount} films, Page {pageNumber} of {totalFilmsPages}
      </p>
      <button onClick={() => handlePageChange(1)} disabled={!hasPrevious}>
        First
      </button>
      <button onClick={() => handlePageChange(pageNumber - 1)} disabled={!hasPrevious}>
        Previous
      </button>
      {renderPageButtons()}
      <button onClick={() => handlePageChange(pageNumber + 1)} disabled={!hasNext}>
        Next
      </button>
      <button onClick={() => handlePageChange(totalFilmsPages)} disabled={!hasNext}>
        Last
      </button>
    </div>
  );
}

export default FilmPagination;
