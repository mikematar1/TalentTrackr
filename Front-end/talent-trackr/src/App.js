import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Companies from "./Components/Companies";

import Navbar from "./Navigation/Navbar";

const About = () => <h2>About Page</h2>;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/companies"
            element={
              <>
                <Navbar />
                <Companies />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
