import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Search } from "./components/Search/search";
import { Hotel } from "./components/Hotel/hotel";
import { City } from "./components/City/city";
import { Country } from "./components/Country/country";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/city" element={<City />} />
        <Route path="/country" element={<Country />} />
      </Routes>
    </Router>
  );
};
export default App;
