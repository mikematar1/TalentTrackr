import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Companies from "./Components/Companies";
import About from "./Components/About";
import Login from "./Components/Login";
import Navbar from "./Navigation/Navbar";
import SignUpMain from "./Components/SignUpMain";
import SignUpRecruiter from "./Components/SignUpRecruiter";
import SelectType from "./Components/SelectType";
import VerificationRecruiter from "./Components/VerificationRecruiter";
import SignUpSeeker from "./Components/SignUpSeeker";
import SeekerHome from "./Components/SeekerHome";

function App() {
  return (
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
        <Route
          path="/signuprecruiter"
          element={
            <>
              <SignUpRecruiter />
            </>
          }
        />
        <Route
          path="/verificationrecruiter"
          element={
            <>
              <VerificationRecruiter />
            </>
          }
        />
        <Route
          path="/signupseeker"
          element={
            <>
              <SignUpSeeker />
            </>
          }
        />
        <Route
          path="/seekerhome"
          element={
            <>
              <SeekerHome />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
