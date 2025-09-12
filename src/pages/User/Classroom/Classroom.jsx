import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";
import { API_URL } from "../../../config";
import { getToken } from "../../../utils/authStorage";
import { FiLock } from "react-icons/fi";

export default function Classroom() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [completedCategories, setCompletedCategories] = useState([]);
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
        console.log(res.data);
      } catch (err) {
        console.error(`${level} 강의 불러오기 실패:`, err);
      }
    };

    const fetchProgress = async () => {
      try {
        const token = getToken();

        if (!token) {
          console.log("토큰이 없습니다.");
          return;
        }

        // 다음 강의 정보 가져오기
        const continueRes = await axios.get(`${API_URL}/progress/continue`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setNextLesson(continueRes.data.nextLesson?.[0] || null);

        // 완료된 카테고리 정보 가져오기
        const categoryRes = await axios.post(
          `${API_URL}/progress/categories`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setCompletedCategories(categoryRes.data || []);
      } catch (err) {
        console.error("진도 불러오기 실패:", err);
      }
    };

    fetchLessons();
    fetchProgress();
  }, [level]);

  // 현재 레벨에서 완료된 카테고리 수 계산
  const getCurrentLevelProgress = () => {
    return completedCategories.filter((categoryId) =>
      lessons.some((lesson) => lesson.lessonCategory_id === categoryId)
    ).length;
  };

  const handleLessonClick = (lesson) => {
    const currentProgress = getCurrentLevelProgress();
    const isLocked = lesson.part_number > currentProgress + 1;
    if (!isLocked) {
      navigate(`/classroom/${level}/${lesson.lessonCategory_id}`, {
        state: { lesson },
      });
    } else {
      alert("이 강의는 이전 강의를 완료한 후 이용할 수 있습니다.");
    }
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
                const currentProgress = getCurrentLevelProgress();
                const isLocked = lesson.part_number > currentProgress + 1;
                const isCompleted = completedCategories.includes(
                  lesson.lessonCategory_id
                );

                return (
                  <div
                    key={lesson.lessonCategory_id}
                    className={`flex p-4 rounded-[20px] transition-all duration-200 ${
                      isLocked
                        ? "cursor-not-allowed opacit"
                        : "cursor-pointer hover:shadow-lg transform hover:-translate-y-1"
                    } `}
                    onClick={() => handleLessonClick(lesson)}
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

                      {isCompleted && (
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
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
