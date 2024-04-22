import { useEffect, useState } from "react";
import Header from "../componenets/Header";
import fetchData from "../axiosHelper";
import { useParams } from "react-router-dom";
import backgroundIMG from "/img/cinema-background.jpeg";
import parseResponse, { parseRequest } from "../util";
import FilmFormContent from "../componenets/FilmFormContent";
import { updateData, deleteData } from "../axiosHelper";
import ContentWrapper from "../componenets/ContentWrapper";

function EditFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState();
  const [doneLoading, setDoneLoading] = useState();
  useEffect(() => {
    setDoneLoading(false);
    const fetchFilm = async () => {
      const response = await fetchData(id);
      const parsedData = await parseResponse(response);
      setFilm(parsedData.data);
      setDoneLoading(true);
    };
    fetchFilm();
  }, [id]);

  const handleFilmUpdate = (e) => {
    e.preventDefault();
    const formElement = e.target;
    const formData = new FormData(formElement);
    const filmData = {};
    formData.forEach((value, key) => {
      filmData[key] = value;
    });
    const postFilmUpdate = async () => {
      const content = await parseRequest(filmData);
      const response = await updateData(id, content);
      alert("Film has been updated successfully.");
    };
    postFilmUpdate();
  };

  const handleFilmDelete = (e) => {
    e.preventDefault();
    const shouldDelete = window.confirm(
      `Are you sure you want to delete '${film.title}'?`
    );
    if (shouldDelete) {
      deleteData(film.id).then((response) => {
        if (response.status === 200) {
          alert("Film has been deleted successfully.");
        } else {
          alert(`Error deleting ${film.title}.`);
        }
      });
    }
  };

  return (
    <>
      <ContentWrapper pageTitle={`Edit Movie ${film && "-" + film.title}`}>
        <div className="container">
          <form onSubmit={handleFilmUpdate}>
            {film && <FilmFormContent {...film} />}
            <button type="submit">Update Film</button>
            <button type="button" onClick={handleFilmDelete}>
              <i className="fa-solid fa-trash"></i>
              <span>Delete</span>
            </button>
          </form>
        </div>
      </ContentWrapper>
    </>
  );
}

export default EditFilm;
