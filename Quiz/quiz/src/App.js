import "./App.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as mdb from "mdb-ui-kit"; // lib
import toast, { Toaster } from "react-hot-toast";
import HomeScreen from "./screen/HomeScreen";
import { UserProvider } from "./context/userContext";
import ExamScreen from "./screen/ExamScreen";
import About from "./screen/about";
import AboutScreen from "./screen/AboutScreen";
import EditExamScreen from "./screen/EditExamScreen";
import AddExam from "./screen/AddExam";
import QuizScreen from "./screen/QuizScreen"

window.mdb = mdb;
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Toaster />

        <Routes>
          <Route path="/" element={<HomeScreen />} />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/exams" element={<ExamScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/edits/exam" element={<EditExamScreen />} />
          <Route path="/addexam/:id" element={<AddExam />} />
          <Route path="/quiz/:id" element={<QuizScreen />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
