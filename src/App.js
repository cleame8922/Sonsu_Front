import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
