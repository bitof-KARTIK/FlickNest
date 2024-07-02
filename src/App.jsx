import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";
import Tvdetails from "./components/Tvdetails";
import Persondetails from "./components/Persondetails";
import Trailer from "./components/partial/Trailer";
import Notfound from "./components/partial/Notfound";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie/*" element={<Movie />} />
        <Route path="/tv/*" element={<Tvshows />} />
        <Route path="/person/*" element={<People />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} >
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv/details/:id" element={<Tvdetails />} >
        <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person/details/:id" element={<Persondetails />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </div>
  );
}
