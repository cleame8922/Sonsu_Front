import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz/Quiz";
import QuizInfo from "./pages/Quiz/QuizInfo";
import QuizStart from "./pages/Quiz/QuizStart";
import Speed from "./pages/Speed/Speed";
import SpeedInfo from "./pages/Speed/SpeedInfo";
import SpeedStart from "./pages/Speed/SpeedStart";
import MyPage from "./pages/MyPage";
import Study from "./pages/Study/Study";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex App">
      <BrowserRouter>
        {/* Sidebar */}
        <Nav toggleSidebar={toggleSidebar} isOpen={isOpen} />
        {/* Main Content Area */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/QuizInfo" element={<QuizInfo />} />
            <Route path="/QuizStart" element={<QuizStart />} />
            <Route path="/Speed" element={<Speed />} />
            <Route path="/SpeedInfo" element={<SpeedInfo />} />
            <Route path="/SpeedStart" element={<SpeedStart />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/Study" element={<Study />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
