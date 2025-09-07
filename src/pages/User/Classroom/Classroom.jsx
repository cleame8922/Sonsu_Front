import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";
import { API_URL } from "../../../config";
import { FiLock } from "react-icons/fi";

export default function Classroom() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [nextLesson, setNextLesson] = useState(null);

  const levelBgColor = {
    easy: "#D7EDD5",
    normal: "#CBD3DF",
    hard: "#ECD7D4",
  };

  const levelId = { easy: 1, normal: 2, hard: 3 };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/lessons/${levelId[level]}/categories`,
          { withCredentials: true }
        );
        setLessons(res.data.categoriesWithWord || []);
      } catch (err) {
        console.error(`${level} 강의 불러오기 실패:`, err);
      }
    };

    const fetchProgress = async () => {
      try {
        const res = await axios.get(`${API_URL}/progress/continue`, {
          withCredentials: true,
        });
        setProgress(res.data.completed || []);
        setNextLesson(res.data.nextLesson?.[0] || null);
      } catch (err) {
        console.error("진도 불러오기 실패:", err);
      }
    };

    fetchLessons();
    fetchProgress();
  }, [level]);

  const handleLessonClick = (lesson) => {
    // lessonCategory_id를 partId로 넘겨서 세부 페이지 이동
    navigate(`/classroom/${level}/${lesson.lessonCategory_id}`);
  };

  return (
    <div className="min-h-screen bg-[#FFE694]">
      <UserTitle />
      <div className="flex w-full">
        <UserNav />
        <div className="flex flex-col mr-10 w-full rounded-[40px] bg-[#fafafa] shadow-xl h-[850px] px-12 py-9 overflow-y-auto">
          <div className="mb-6">
            <p className="text-[#222] font-bold text-[25px]">손수잇다</p>
            <p className="text-[#777] font-semibold text-[20px]">#12345</p>
          </div>

          <div
            className={`px-10 py-8 rounded-[40px] h-[85%] overflow-y-auto`}
            style={{ backgroundColor: levelBgColor[level] }}
          >
            <div className="grid grid-cols-2 gap-6">
              {lessons.map((lesson) => {
                const isLocked = lesson.part_number > progress.length + 1;
                return (
                  <div
                    key={lesson.lessonCategory_id}
                    className={`flex p-4 rounded-[20px] ${
                      isLocked ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => !isLocked && handleLessonClick(lesson)}
                  >
                    <div className="relative p-4 rounded-[15px] shadow-lg bg-[#F2F2F2]">
                      <img
                        src="/assets/images/Sign.png"
                        alt=""
                        className="w-20 h-20"
                      />
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-[15px]">
                          <FiLock className="text-white" size={32} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center ml-4">
                      <p className="font-bold text-lg">
                        Part {lesson.part_number}. {lesson.category}
                      </p>
                      <p className="text-sm text-gray-600 truncate w-[150px]">
                        {lesson.words?.join(", ")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
