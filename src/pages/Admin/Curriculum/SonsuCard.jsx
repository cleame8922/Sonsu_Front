import { useState, useEffect } from "react";
import { default as axios } from "axios";
import { API_URL } from "../../../config";
import { getToken } from "../../../utils/authStorage";
import { RxPlus } from "react-icons/rx";

export default function SonsuCard({ classId, onAddLesson, customLessons }) {
  const [activeTab, setActiveTab] = useState("초급");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error(err);
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [activeTab]);

  const handleAdd = (lesson) => {
    onAddLesson(lesson);
  };

  const renderContent = () => {
    if (loading) return <p className="mt-4 text-gray-500">로딩 중...</p>;
    if (!lessons || lessons.length === 0) return <p className="mt-4 text-gray-500">강의가 없습니다.</p>;

    return (
      <div className="h-[550px] overflow-y-auto space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.lessonCategory_id}
            className="flex p-4 rounded-[20px] transition-all duration-200 hover:shadow-lg cursor-pointer bg-white"
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
              <p className="text-sm text-gray-600 truncate w-[150px]">
                {lesson.words?.join(", ") || "단어 정보 없음"}
              </p>
            </div>
            <div
              className="flex items-center justify-end"
              onClick={() => handleAdd(lesson)}
            >
              <RxPlus
                size={24}
                className={`cursor-pointer hover:scale-110 transition-transform ${
                  customLessons.some((l) => l.lessonCategory_id === lesson.lessonCategory_id)
                    ? "text-gray-400"
                    : "text-black"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="w-[45%] h-[650px] rounded-[40px] p-8 shadow-xl"
      style={{ backgroundColor: levelBgColor[activeTab] }}
    >
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

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
}
