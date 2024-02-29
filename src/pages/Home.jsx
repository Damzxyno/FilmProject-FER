import { useEffect, useState } from "react";
import fetchData from "../axiosHelper";
import FilmTableRow from "../componenets/FilmTableRow";
import FilmPagination from "../componenets/FilmPagination";
import parseResponse from "../util";
import FilmFilter from "../componenets/FilmFilter";
import ContentWrapper from "../componenets/ContentWrapper";

function Home() {
  const [paginatedFilmsObject, setPaginatedFilmsObject] = useState();
  const [filmFilter, setFilmFilter] = useState({
    "page-number": 1,
    "page-size": 20,
  });
  const [doneLoading, setDoneLoading] = useState(true);
  useEffect(() => {
    setDoneLoading(false);
    const fetchData = async () => {
      await handleDataLoading();
      setDoneLoading(true);
    };
    fetchData();
  }, [filmFilter]);

  const handleFilmRemove = (filmID, filmTitle) => {
    setPaginatedFilmsObject((pfO) => {
      const newFilms = pfO.films.filter((x) => x.id !== filmID);
      return { ...pfO, films: newFilms };
    });
    alert(`${filmTitle} was deleted successfully!`);
  };

  const handleFilterSubmit = (filters) => {
    setFilmFilter((prevFilters) => ({ ...prevFilters, ...filters }));
  };

  const handlePageChange = async (newPageNumber) => {
    await setFilmFilter((prevFilters) => ({
      ...prevFilters,
      "page-number": newPageNumber,
    }));
  };

  const handleDataLoading = async () => {
    try {
      const response = await fetchData(null, filmFilter);
      const parsedData = await parseResponse(response);
      setPaginatedFilmsObject(parsedData.data);
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
    }
  };
  return (
    <>
      <ContentWrapper pageTitle="Welcome to the Homepage!">
        <FilmFilter initialFilters={filmFilter} onSubmit={handleFilterSubmit} />
        <div className="container">
          <table className="films-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Stars</th>
                <th>Director</th>
                <th>Year</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {!doneLoading ? (
                <tr>
                  <td colSpan={7}>Loading. . .</td>
                </tr>
              ) : (
                paginatedFilmsObject &&
                paginatedFilmsObject.films.map((film) => (
                  <FilmTableRow
                    key={film.id}
                    film={film}
                    handleFilmRemove={handleFilmRemove}
                  />
                ))
              )}
            </tbody>
          </table>
          {paginatedFilmsObject && (
            <FilmPagination
              paginatedFilmsObject={paginatedFilmsObject}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </ContentWrapper>
    </>
  );
}

export default Home;
