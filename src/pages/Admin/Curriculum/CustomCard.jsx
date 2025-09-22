import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CustomCard({
  classId,
  name,
  lessons = [],
  onDeleteLesson,
  onDeleteWord,
  pendingWordDeletes = [],
  classColor = "#DEE6F1",
}) {
  const [activeTab, setActiveTab] = useState("초급");
  const [openLessonId, setOpenLessonId] = useState(null);

  const tabColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  const tabLevelId = { 초급: 1, 중급: 2, 고급: 3 };

  const handleDelete = (lessonCategoryId, e) => {
    e.stopPropagation();
    onDeleteLesson(lessonCategoryId);
  };

  const toggleLesson = (id, e) => {
    e.stopPropagation();
    setOpenLessonId(openLessonId === id ? null : id);
  };

  const filteredLessons = lessons.filter((l) => {
    const hasLevel = l.lessonLevel_id !== undefined && l.lessonLevel_id !== null;
    if (!hasLevel) return true;
    return l.lessonLevel_id === tabLevelId[activeTab];
  });

  return (
    <div
      className="w-[45%] h-[650px] rounded-[40px] p-8 shadow-xl"
      style={{ backgroundColor: classColor }} // ✅ 부모에서 내려준 그룹색 반영
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
        <div className="mb-2 text-xs text-gray-600">
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
              <div className="pl-4 mt-4 ml-4 border-l-2 border-gray-300">
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
                          className="ml-2 text-red-400 transition-transform cursor-pointer hover:text-red-600 hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteWord &&
                              onDeleteWord(lesson.lessonCategory_id, word, idx);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm italic text-gray-500">
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
