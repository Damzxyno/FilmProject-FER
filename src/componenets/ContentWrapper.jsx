import Header from "./Header";
import backgroundIMG from "/img/cinema-background.jpeg";
function ContentWrapper({pageTitle, children}) {
  return (
    <>
      <Header />
      <main className="general-content">
        <figure className="content-figure">
          <img className="content-figure-image" src={backgroundIMG} />
        </figure>
        <div className="main-content">
          <h2>{pageTitle}</h2>
          {children}
        </div>
      </main>
    </>
  );
}

export default ContentWrapper;
