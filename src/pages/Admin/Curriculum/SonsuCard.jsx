import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { getToken } from "../../../utils/authStorage";
import { RxPlus } from "react-icons/rx";

export default function SonsuCard({ classId }) {
  const [activeTab, setActiveTab] = useState("초급");
  const [lessons, setLessons] = useState([]);
  const [customLessons, setCustomLessons] = useState([]);
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

  // 탭에 따른 레벨 ID
  const tabLevelId = { 초급: 1, 중급: 2, 고급: 3 };

  // 전체 강의 목록 가져오기
  const fetchLessons = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/lessons/${tabLevelId[activeTab]}/categories`
      );
      setLessons(res.data.categoriesWithWord || []);
    } catch (err) {
      console.error(`${activeTab} 강의 불러오기 실패:`, err);
      setLessons([]);
    } finally {
      setLoading(false);
    }
  };

  // 현재 클래스에 추가된 강의 목록 가져오기
  const fetchCustomLessons = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const res = await axios.get(`${API_URL}/class/${classId}/lessons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const lessonData = Array.isArray(res.data)
        ? res.data
        : res.data.lessons || res.data.data || [];

      const lessonIds = lessonData.map(
        (lesson) => lesson.lessonCategory_id || lesson.id
      );

      setCustomLessons(lessonIds);
    } catch (err) {
      console.error("클래스 강의 불러오기 실패:", err);
      setCustomLessons([]);
    }
  };

  // 강의 추가 함수
  const handleAddLesson = async (lessonId) => {
    // 중복 체크
    if (customLessons.includes(lessonId)) {
      alert("이미 추가된 강의입니다.");
      return;
    }

    try {
      const token = getToken();

      const res = await axios.post(
        `${API_URL}/class/${classId}/add`,
        { lessonIds: [lessonId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("레슨 추가 성공:", res.data.message);

      await fetchCustomLessons();
      alert("강의가 추가되었습니다.");
    } catch (err) {
      console.error("레슨 추가 실패:", err);
      const errorMessage =
        err.response?.data?.message || "추가에 실패했습니다.";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [activeTab]);

  useEffect(() => {
    fetchCustomLessons();
  }, [classId]);

  // 탭별 콘텐츠 렌더링
  const renderContent = () => {
    if (loading) {
      return <p className="text-gray-500 mt-4">로딩 중...</p>;
    }

    if (!lessons || lessons.length === 0) {
      return <p className="text-gray-500 mt-4">강의가 없습니다.</p>;
    }

    return (
      <div className="h-[550px] overflow-y-auto space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.lessonCategory_id}
            className="flex p-4 rounded-[20px] transition-all duration-200 hover:shadow-lg cursor-pointer bg-white"
          >
            {/* 이미지 */}
            <div className="relative p-4 rounded-[15px] shadow-lg bg-[#F2F2F2]">
              <img
                src="/assets/images/Sign.png"
                alt=""
                className="w-20 h-20 object-cover"
              />
            </div>

            {/* 강의 정보 */}
            <div className="flex flex-col justify-center ml-4 w-[70%]">
              <p className="font-bold text-lg">
                Part {lesson.part_number}. {lesson.category}
              </p>
              <p className="text-sm text-gray-600 truncate w-[150px]">
                {lesson.words?.join(", ") || "단어 정보 없음"}
              </p>
            </div>

            {/* 추가 버튼 */}
            <div
              className="flex items-center justify-end"
              onClick={() => handleAddLesson(lesson.lessonCategory_id)}
            >
              <RxPlus
                size={24}
                className={`cursor-pointer hover:scale-110 transition-transform ${
                  customLessons.includes(lesson.lessonCategory_id)
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
      style={{
        backgroundColor: levelBgColor[activeTab],
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[#DBBF63] text-[18px] font-black">SONSU</p>

        {/* 탭 버튼 */}
        <div className="flex items-center">
          {["초급", "중급", "고급"].map((tab, index, arr) => (
            <div key={tab} className="flex items-center">
              <button
                onClick={() => setActiveTab(tab)}
                className={`font-semibold text-[16px] transition-all px-3 py-1 rounded-full`}
                style={{
                  color: activeTab === tab ? tabColors[tab] : "#333",
                  backgroundColor: activeTab === tab ? "white" : "transparent",
                }}
              >
                {tab}
              </button>
              {index < arr.length - 1 && (
                <span className="mx-2 text-[#777]">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 탭 내용 */}
      <div className="mt-6">{renderContent()}</div>

      {/* 디버깅용 정보 */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-2 p-2 bg-gray-100 text-xs">
          <p>CustomLessons: {JSON.stringify(customLessons)}</p>
          <p>Lessons count: {lessons.length}</p>
          <p>Active tab: {activeTab}</p>
        </div>
      )}
    </div>
  );
}
