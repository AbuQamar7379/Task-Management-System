import React from "react";
import TaskDashboard from "./components/TaskDashboard/TaskDashboard";
import Register from "./components/AUTH/Register/Register";
import Login from "./components/AUTH/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const config = {
  endpoint: "https://task-management-backend-jcwn.onrender.com",
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/register" element={<Register />} />{" "}
          <Route path="/" element={<TaskDashboard />} />{" "}
        </Routes>{" "}
      </Router>{" "}
    </>
  );
}

export default App;
