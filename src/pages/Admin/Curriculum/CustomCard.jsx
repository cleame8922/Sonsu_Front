import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { getToken } from "../../../utils/authStorage";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CustomCard({ customLessons, onDeleteLesson }) {
  const [activeTab, setActiveTab] = useState("초급");
  const [detailedLessons, setDetailedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const { code: classId } = useParams();
  const { state } = useLocation();
  const name = state?.name;
  const desc = state?.desc;

  // customLessons(lessonId 배열)을 받아서 상세 정보를 가져오기
  useEffect(() => {
    const fetchLessonDetails = async () => {
      if (!customLessons || customLessons.length === 0) {
        setDetailedLessons([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = getToken();
        if (!token) {
          alert("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        // 각 lessonId에 대해 상세 정보를 가져오기
        const res = await axios.get(`${API_URL}/class/${classId}/lessons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setDetailedLessons(res.data || []);
      } catch (err) {
        console.error("강의 상세 정보 불러오기 실패:", err);
        setDetailedLessons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonDetails();
  }, [customLessons, classId]);

  const tabColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  // 레벨별로 강의 필터링
  const getFilteredLessons = () => {
    if (!detailedLessons || detailedLessons.length === 0) return [];

    // level 또는 difficulty 필드가 있다고 가정
    // 실제 데이터 구조에 맞게 수정 필요
    return detailedLessons.filter((lesson) => {
      if (activeTab === "초급")
        return lesson.level === "beginner" || lesson.difficulty === "초급";
      if (activeTab === "중급")
        return lesson.level === "intermediate" || lesson.difficulty === "중급";
      if (activeTab === "고급")
        return lesson.level === "advanced" || lesson.difficulty === "고급";
      return true;
    });
  };

  // 탭별 콘텐츠
  const renderContent = () => {
    if (loading) {
      return <p className="text-gray-500 mt-4">로딩 중...</p>;
    }

    const filteredLessons = getFilteredLessons();

    if (!filteredLessons || filteredLessons.length === 0) {
      return <p className="text-gray-500 mt-4">{activeTab} 강의가 없습니다.</p>;
    }

    return (
      <div className="h-[550px] overflow-y-auto space-y-4">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.lessonCategory_id || lesson.id}
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

            {/* 삭제 버튼 */}
            <div className="flex items-center justify-end">
              <FaRegTrashAlt
                size={24}
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteLesson(lesson.lesson_id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-[45%] h-[650px] rounded-[40px] p-8 bg-[#DEE6F1] shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-[#444] text-[18px] font-black">{name}</p>

        {/* 탭 버튼 */}
        <div className="flex items-center">
          {["초급", "중급", "고급"].map((tab, index, arr) => (
            <div key={tab} className="flex items-center">
              <button
                onClick={() => setActiveTab(tab)}
                className={`font-semibold text-[16px] transition-all px-3 py-1 rounded-full hover:bg-white/50`}
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
    </div>
  );
}
