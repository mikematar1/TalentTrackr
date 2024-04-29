import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Companies from "./Components/Companies";
import About from "./Components/About";
import Login from "./Components/Login";
import Navbar from "./Navigation/Navbar";
import NavbarSeeker from "./Navigation/NavbarSeeker";
import NavbarRecruiter from "./Navigation/NavbarRecruiter";
import SignUpMain from "./Components/SignUpMain";
import SignUpRecruiter from "./Components/SignUpRecruiter";
import SelectType from "./Components/SelectType";
import SignUpSeeker from "./Components/SignUpSeeker";
import HomeSeeker from "./Components/HomeSeeker";
import HomeRecruiter from "./Components/HomeRecruiter";
import ProfileSeeker from "./Components/ProfileSeeker";
import ProfileRecruiter from "./Components/ProfileRecruiter";
import AddJob from "./Components/AddJob";

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
              <NavbarSeeker />
              <HomeSeeker />
            </>
          }
        />
        <Route
          path="/seekerprofile"
          element={
            <>
              <ProfileSeeker />
            </>
          }
        />
        <Route
          path="/recruiterhome"
          element={
            <>
              <NavbarRecruiter />
              <HomeRecruiter />
            </>
          }
        />
        <Route
          path="/recruiterprofile"
          element={
            <>
              <ProfileRecruiter />
            </>
          }
        />
        <Route
          path="/addjob"
          element={
            <>
              <AddJob />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
