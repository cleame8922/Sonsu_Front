import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CustomCard({
  classId,
  name,
  lessons = [],
  onDeleteLesson,
  onDeleteWord, // 개별 단어 삭제 함수 추가
  pendingWordDeletes = [], // 삭제 예정인 lessonId들
}) {
  const [activeTab, setActiveTab] = useState("초급");
  const [classColor, setClassColor] = useState("#DEE6F1");
  const [openLessonId, setOpenLessonId] = useState(null);

  const tabColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  const tabLevelId = { 초급: 1, 중급: 2, 고급: 3 };

  const handleDelete = (lessonCategoryId, e) => {
    e.stopPropagation();

    // 부모 컴포넌트의 삭제 함수만 호출
    // 상태 관리는 부모(Curri_Part)에서만 처리
    onDeleteLesson(lessonCategoryId);
  };

  const toggleLesson = (id, e) => {
    e.stopPropagation();
    console.log("Toggle lesson:", id);
    setOpenLessonId(openLessonId === id ? null : id);
  };

  // lessons prop만 사용 (단일 데이터 소스)
  const filteredLessons = lessons.filter((l) => {
    const hasLevel =
      l.lessonLevel_id !== undefined && l.lessonLevel_id !== null;

    if (!hasLevel) {
      return true; // 레벨이 없으면 모든 탭에서 표시
    }

    return l.lessonLevel_id === tabLevelId[activeTab];
  });

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
        <div className="text-xs text-gray-600 mb-2">
          전체: {lessons.length}개, 현재 탭: {filteredLessons.length}개
        </div>

        {filteredLessons.length === 0 && (
          <p className="text-gray-500">강의를 추가해주세요.</p>
        )}

        {filteredLessons.map((lesson, index) => (
          <div
            key={lesson.lessonCategory_id || `lesson-${index}`}
            className="p-4 rounded-[20px] transition-all duration-200 hover:shadow-lg bg-white"
          >
            {/* 상단 메인 정보 */}
            <div
              className="flex items-center cursor-pointer"
              onClick={(e) => toggleLesson(lesson.lessonCategory_id, e)}
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
                  <p className="text-sm text-gray-600 truncate">
                    {lesson.words?.join(", ") || "단어 정보 없음"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {openLessonId === lesson.lessonCategory_id ? "▲" : "▼"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <FaRegTrashAlt
                  size={24}
                  className="text-red-500 transition-transform cursor-pointer hover:text-red-700 hover:scale-110"
                  onClick={(e) => handleDelete(lesson.lessonCategory_id, e)}
                />
              </div>
            </div>

            {/* 토글 내용 */}
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
                        <FaRegTrashAlt
                          size={12}
                          className="text-red-400 transition-transform cursor-pointer hover:text-red-600 hover:scale-110 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteWord &&
                              onDeleteWord(lesson.lessonCategory_id, word, idx);
                          }}
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
