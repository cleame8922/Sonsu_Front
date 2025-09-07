import { Routes, Route } from "react-router-dom";
import Main from "../pages/User/Main/Main";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Quiz from "../pages/User/Quiz/Quiz";
import QuizInfo from "../pages/User/Quiz/QuizInfo";
import QuizStart from "../pages/User/Quiz/QuizStart";
import Speed from "../pages/User/Speed/Speed";
import SpeedInfo from "../pages/User/Speed/SpeedInfo";
import SpeedStart from "../pages/User/Speed/SpeedStart";
import MyPage from "../pages/User/MyPage";
import Study from "../pages/User/Study/Study";
import Home from "../pages/User/Home/Home";
import Classroom from "../pages/User/Classroom/Classroom";
import ClassroomDetail from "../pages/User/Classroom/ClassroomDetail";

export default function User() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/quiz/info" element={<QuizInfo />} />
      <Route path="/quiz/start" element={<QuizStart />} />
      <Route path="/speed" element={<Speed />} />
      <Route path="/speed/info" element={<SpeedInfo />} />
      <Route path="/speed/start" element={<SpeedStart />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/study" element={<Study />} />
      <Route path="/classroom/:level" element={<Classroom />} />
      <Route path="/classroom/:level/:partId" element={<ClassroomDetail />} />
    </Routes>
  );
}
