import React, { FC } from "react"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Quiz from "./components/Quiz"
import Results from "./components/Results"

const App: React.FC = () =>{
  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>
          <Route path="/results" element={<Results />}></Route>
        </Routes>
      </Router>
  );
};

export default App
