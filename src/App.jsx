import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import PostDetails from "./components/PostDetails/PostDetails";
import AuthRedirect from "./components/Auth/AuthRedirect.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<AuthRedirect user={user} />} />
        </Routes>
      </Container>
    </Router>
  );
}

/*
 <Route exact path='/' component={Home} /> => in version 5 then 6 for redirecting:
 <Route exact path='/' component={() => <Redirect to='posts' />} />
 <Route path='/' element={<Navigate replace to='/posts' />} />
*/

export default App;
