import { useState } from "react";

function FilmFormContent({ id, title, year, director, stars, review }) {
  const [currTitle, setCurrTitle] = useState(title || "");
  const [currYear, setCurrYear] = useState(year || "");
  const [currDirector, setCurrDirector] = useState(director || "");
  const [currStars, setCurrStars] = useState(stars || "");
  const [currReview, setCurrReview] = useState(review || "");

  return (
   <>
      <input type="hidden" name="id" value={id} />
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={currTitle}
          onChange={(e) => setCurrTitle(e.target.value)}
          required
        />
      </div>
      <div className="row mb-3">
        <div className="col">
          <label className="form-label" htmlFor="year">
            Year:
          </label>
          <input
            className="form-control"
            type="number"
            name="year"
            value={currYear}
            onChange={(e) => setCurrYear(e.target.value)}
            required
          />
        </div>
        <div className="col">
          <label className="form-label" htmlFor="director">
            Director:
          </label>
          <input
            className="form-control"
            type="text"
            name="director"
            value={currDirector}
            onChange={(e) => setCurrDirector(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="stars">
          Stars:
        </label>
        <input
          className="form-control"
          type="text"
          name="stars"
          value={currStars}
          onChange={(e) => setCurrStars(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="review">
          Review:
        </label>
        <textarea
          className="form-control"
          name="review"
          rows="4"
          cols="50"
          onChange={(e) => setCurrReview(e.target.value)}
          defaultValue={currReview}
          required
         />
      </div>
      </>
  );
}

export default FilmFormContent;
