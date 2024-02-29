import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateFilm from "./pages/CreateFilm";
import EditFilm from "./pages/EditFilm";
import NoPage from "./pages/NoPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";


function App(){
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="/create-film" element={<CreateFilm />} />
            <Route path="/edit-film/:id" element={<EditFilm />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App;