import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";
import { API_URL } from "../../../config";
import { FiLock } from "react-icons/fi";

export default function Classroom_Easy() {
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [nextLesson, setNextLesson] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // 초급 레벨은 1
        const res = await axios.get(`${API_URL}/lessons/1/categories`, {
          withCredentials: true,
        });
        setLessons(res.data.categoriesWithWord || []);
      } catch (err) {
        console.error("초급 강의 불러오기 실패:", err);
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
  }, []);

  const handleLessonClick = (lesson) => {
    console.log("강의 클릭:", lesson);
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

          <div className="bg-[#D7EDD5] px-10 py-8 rounded-[40px] h-[85%] overflow-y-auto">
            <div className="grid grid-cols-2 gap-6">
              {lessons.map((lesson) => {
                const isLocked = lesson.part_number > progress.length + 1;
                return (
                  <div
                    key={lesson.lessonCategory_id}
                    className={`flex p-4 rounded-[20px]  ${
                      isLocked ? " cursor-not-allowed" : "cursor-pointer"
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
                      <p className="text-sm text-gray-600">
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
