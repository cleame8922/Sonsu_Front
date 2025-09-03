import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/User/Main/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Quiz from "./pages/User/Quiz/Quiz";
import QuizInfo from "./pages/User/Quiz/QuizInfo";
import QuizStart from "./pages/User/Quiz/QuizStart";
import Speed from "./pages/User/Speed/Speed";
import SpeedInfo from "./pages/User/Speed/SpeedInfo";
import SpeedStart from "./pages/User/Speed/SpeedStart";
import MyPage from "./pages/User/MyPage";
import Study from "./pages/User/Study/Study";
import AdminMain from "./pages/Admin/Main/AdminMain";
import AdminNoGroup from './pages/Admin/Member/AdminNoGroup';
import AdminGroupAdd from './pages/Admin/Member/AdminGroupAdd';
import AdminStudent from './pages/Admin/Member/AdminStudent';

function App() {

  return (
    <div className="flex App">
      <BrowserRouter>
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
            <Route path="/AdminMain" element={<AdminMain />} />
            <Route path="/AdminNoGroup" element={<AdminNoGroup />} />
            <Route path="/AdminGroupAdd" element={<AdminGroupAdd />} />
            <Route path="/AdminStudent" element={<AdminStudent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
