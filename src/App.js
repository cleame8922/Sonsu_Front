import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./routes/User";
import Admin from "./routes/Admin";

function App() {
  return (
    <div className="flex App">
      <BrowserRouter>
        <div className="flex-1">
          <Routes>
            <Route path="/*" element={<User />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
