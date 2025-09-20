import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { RxPlus } from "react-icons/rx";

export default function SonsuCard({ classId, onAddLesson, customLessons }) {
  const [activeTab, setActiveTab] = useState("초급");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openLessonId, setOpenLessonId] = useState(null);

  const levelBgColor = {
    초급: "#D7EDD5",
    중급: "#CBD3DF",
    고급: "#ECD7D4",
  };

  const tabColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  const tabLevelId = { 초급: 1, 중급: 2, 고급: 3 };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/lessons/${tabLevelId[activeTab]}/categories`
        );
        setLessons(res.data.categoriesWithWord || []);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
    setOpenLessonId(null);
  }, [activeTab]);

  const handleAdd = (lesson) => {
    const alreadyAdded = customLessons.some(
      (l) => l.lessonCategory_id === lesson.lessonCategory_id
    );
    if (alreadyAdded) {
      alert("이미 추가된 강의입니다.");
      return;
    }
    onAddLesson(lesson);
  };

  const toggleLesson = (id) => {
    setOpenLessonId(openLessonId === id ? null : id);
  };

  return (
    <div
      className="w-[45%] h-[650px] rounded-[40px] p-8 shadow-xl"
      style={{ backgroundColor: levelBgColor[activeTab] }}
    >
      {/* 탭 */}
      <div className="flex items-center justify-between">
        <p className="text-[#DBBF63] text-[18px] font-black">SONSU</p>
        <div className="flex items-center">
          {["초급", "중급", "고급"].map((tab, idx) => (
            <div key={tab} className="flex items-center">
              <button
                onClick={() => setActiveTab(tab)}
                className="font-semibold text-[16px] transition-all px-3 py-1 rounded-full"
                style={{
                  color: activeTab === tab ? tabColors[tab] : "#333",
                  backgroundColor: activeTab === tab ? "white" : "transparent",
                }}
              >
                {tab}
              </button>
              {idx < 2 && <span className="mx-2 text-[#777]">|</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 목록 */}
      <div className="mt-6 h-[550px] overflow-y-auto space-y-4">
        {loading && <p className="text-gray-500">로딩 중...</p>}
        {!loading && lessons.length === 0 && (
          <p className="text-gray-500">강의가 없습니다.</p>
        )}
        {!loading &&
          lessons.map((lesson) => (
            <div
              key={lesson.lessonCategory_id}
              className="p-4 rounded-[20px] bg-white shadow hover:shadow-lg transition-all"
            >
              {/* 메인 카드 */}
              <div
                className="flex items-center cursor-pointer"
                onClick={() => toggleLesson(lesson.lessonCategory_id)}
              >
                <div className="relative p-4 rounded-[15px] shadow-lg bg-[#F2F2F2]">
                  <img
                    src="/assets/images/Sign.png"
                    alt=""
                    className="object-cover w-20 h-20"
                  />
                </div>
                <div className="flex flex-col justify-center ml-4 w-[70%]">
                  <p className="text-lg font-bold">
                    Part {lesson.part_number}. {lesson.category}
                  </p>
                  <div className="flex items-center space-x-3">
                    <p className="text-sm text-gray-600 truncate ">
                      {lesson.words?.join(", ") || "단어 정보 없음"}
                    </p>
                    <p className="text-xs text-gray-400 ">
                      {openLessonId === lesson.lessonCategory_id ? "▲" : "▼"}
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-end"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdd(lesson);
                  }}
                >
                  <RxPlus
                    size={24}
                    className={`cursor-pointer hover:scale-110 transition-transform ${
                      customLessons.some(
                        (l) => l.lessonCategory_id === lesson.lessonCategory_id
                      )
                        ? "text-gray-400"
                        : "text-black"
                    }`}
                  />
                </div>
              </div>

              {/* 펼쳐지는 하위 Lessons */}
              {openLessonId === lesson.lessonCategory_id && (
                <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-300">
                  <div className="space-y-1">
                    {lesson.words && lesson.words.length > 0 ? (
                      lesson.words.map((word, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-1 pr-2"
                        >
                          <p className="text-sm text-gray-700">• {word}</p>
                          <RxPlus
                            size={12}
                            className="text-red-400 transition-transform cursor-pointer hover:text-red-600 hover:scale-110 ml-2"
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        세부 강의 없음
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
