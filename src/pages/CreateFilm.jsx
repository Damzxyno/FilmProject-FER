import FilmFormContent from "../componenets/FilmFormContent";
import ContentWrapper from "../componenets/ContentWrapper";
import { postData } from "../axiosHelper";
import parseResponse from "../util";

function CreateFilm(){
    const handleFilmCreation = (e) => {
        e.preventDefault();
        const formElement = e.target;
        const formData = new FormData(formElement);
        const filmData = {};
        formData.forEach((value, key) => {
          filmData[key] = value;
        });
        const postFilmCreate = async () => {
          const content = await parseResponse(filmData);
          const response = await postData(null, content);
          alert("Movie has been created successfully.");
        };
        postFilmCreate();
      };
    return (
        <>
          <ContentWrapper pageTitle={`Create Film`}>
            <div className="container">
              <form onSubmit={handleFilmCreation}>
                <FilmFormContent  />
                <button type="submit">Create Film</button>
              </form>
            </div>
          </ContentWrapper>
        </>
      );
}

export default CreateFilm; 