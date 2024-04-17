import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Companies from "./Components/Companies";
import About from "./Components/About";
import Login from "./Components/Login";
import Navbar from "./Navigation/Navbar";
import SignUpMain from "./Components/SignUpMain";
import SelectType from "./Components/SelectType";

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
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/signupmain"
            element={
              <>
                <SignUpMain />
              </>
            }
          />
          <Route
            path="/selecttype"
            element={
              <>
                <SelectType />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
