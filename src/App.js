import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Quiz from "./pages/Quiz/Quiz";
import QuizInfo from "./pages/Quiz/QuizInfo";
import QuizStart from "./pages/Quiz/QuizStart";
import Speed from "./pages/Speed/Speed";
import SpeedInfo from "./pages/Speed/SpeedInfo";
import SpeedStart from "./pages/Speed/SpeedStart";

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
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/QuizInfo" element={<QuizInfo />} />
            <Route path="/QuizStart" element={<QuizStart />} />
            <Route path="/Speed" element={<Speed />} />
            <Route path="/SpeedInfo" element={<SpeedInfo />} />
            <Route path="/SpeedStart" element={<SpeedStart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
