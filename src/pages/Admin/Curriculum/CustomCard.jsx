import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../../config";

export default function CustomCard({
  classId,
  name,
  lessons = [],
  onDeleteLesson,
}) {
  const [existingLessons, setExistingLessons] = useState([]);
  const [activeTab, setActiveTab] = useState("초급");
  const [classColor, setClassColor] = useState("#DEE6F1"); // 기본 색상

  const tabColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  const tabLevelId = { 초급: 1, 중급: 2, 고급: 3 };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_URL}/class/${classId}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);

        // 기존 강의 포맷팅 - lessonLevel을 lessonLevel_id로 매핑
        const formattedLessons = res.data.map((category) => ({
          lessonCategory_id: category.id,
          part_number: category.partNumber,
          category: category.categoryName,
          words: category.lessons.map((l) => l.word),
          lessonLevel_id: category.lessonLevel, // API에서는 lessonLevel로 옴
        }));

        setExistingLessons(formattedLessons);

        // class_color가 있다면 적용
        if (res.data[0]?.class_color) {
          setClassColor(res.data[0].class_color);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (classId) fetchLessons();
  }, [classId]);

  const handleDelete = (lessonCategoryId, e) => {
    // 이벤트 버블링 방지
    e.stopPropagation();

    // 부모 컴포넌트의 삭제 함수 호출
    onDeleteLesson(lessonCategoryId);

    // 로컬 상태에서도 해당 강의 제거 (기존 강의인 경우)
    setExistingLessons((prev) =>
      prev.filter((lesson) => lesson.lessonCategory_id !== lessonCategoryId)
    );
  };

  // 기존 + Sonsu에서 추가된 강의 합치기
  const combinedLessons = [
    ...existingLessons,
    ...lessons.filter(
      (l) =>
        !existingLessons.some(
          (exist) => exist.lessonCategory_id === l.lessonCategory_id
        )
    ),
  ];

  // 선택된 레벨만 필터링
  const filteredLessons = combinedLessons.filter(
    (l) => l.lessonLevel_id === tabLevelId[activeTab]
  );

  return (
    <div
      className="w-[45%] h-[650px] rounded-[40px] p-8 shadow-xl"
      style={{ backgroundColor: classColor }}
    >
      {/* 제목 + 레벨 탭 */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#444] text-[18px] font-black">{name}</p>
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

      {/* 강의 리스트 */}
      <div className="h-[550px] overflow-y-auto space-y-4">
        {filteredLessons.length === 0 && (
          <p className="text-gray-500">강의를 추가해주세요.</p>
        )}
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.lessonCategory_id}
            className="flex p-4 rounded-[20px] transition-all duration-200 hover:shadow-lg cursor-pointer"
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
            <div className="flex items-center justify-end">
              <FaRegTrashAlt
                size={24}
                className="text-red-500 transition-transform cursor-pointer hover:text-red-700 hover:scale-110"
                onClick={(e) => handleDelete(lesson.lessonCategory_id, e)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
