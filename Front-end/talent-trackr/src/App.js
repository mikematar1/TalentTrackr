import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactModal from "react-modal";

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
import PrivateRoute from "./Navigation/PrivateRoute";
import PublicRoute from "./Navigation/PublicRoute";

const queryClient = new QueryClient();
ReactModal.setAppElement("#root");

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route exact path="/" element={<PublicRoute />}>
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
          </Route>

          <Route
            exact
            path="/"
            element={<PrivateRoute requiredUserType="seeker" />}
          >
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
          </Route>

          <Route
            exact
            path="/"
            element={<PrivateRoute requiredUserType="recruiter" />}
          >
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
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
