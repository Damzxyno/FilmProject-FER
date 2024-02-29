import { Link } from "react-router-dom";
import { deleteData } from "../axiosHelper";

function FilmTableRow({ film, handleFilmRemove }) {
  function handleDelete(e) {
    e.preventDefault();
    const shouldDelete = window.confirm(
      `Are you sure you want to delete '${film.title}'?`
    );
    if (shouldDelete) {
      deleteData(film.id).then((response) => {
        if (response.status === 200) {
          handleFilmRemove(film.id, film.title);
        } else {
          alert(`Error deleting ${film.title}.`);
        }
      });
    }
  }
  return (
    <tr key={film.id}>
      <td>{film.title}</td>
      <td>{film.review}</td>
      <td>{film.stars}</td>
      <td>{film.director}</td>
      <td>{film.year}</td>
      <td className="table-anchor">
        <button type="submit" onClick={(e) => handleDelete(e)}>
          <i className="fa-solid fa-trash"></i>
          <span>Delete</span>
        </button>
      </td>
      <td className="table-anchor">
        <Link to={`/Edit-Film/${film.id}`}>
          <button>
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Edit</span>
          </button>
        </Link>
      </td>
    </tr>
  );
}

export default FilmTableRow;
