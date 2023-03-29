import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PeopleForm from "./components/PeopleForm";
import PeopleList from "./components/PeopleList";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<PeopleForm />} />
        <Route path="/list" element={<PeopleList />} />
      </Routes>
    </Router>
  );
}

export default App;
