import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { RxPlus } from "react-icons/rx";

export default function SonsuCard({
  classId,
  onAddLesson,
  onAddWord,
  customLessons,
  pendingWordAdds,
  loading: parentLoading,
}) {
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
        const lessonsData = res.data.categoriesWithWord || [];
        setLessons(lessonsData);
      } catch (err) {
        console.error("레슨 데이터 가져오기 실패:", err);
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
    setOpenLessonId(null);
  }, [activeTab]);

  // 카테고리 전체가 이미 추가되었는지 확인
  const isCategoryAdded = (categoryId) => {
    return (
      customLessons?.some((l) => l.lessonCategory_id === categoryId) || false
    );
  };

  // 개별 단어가 이미 추가되었는지 확인 (추가 대기열 포함)
  const isWordAdded = (categoryId, word, lessonId) => {
    // 1. 이미 클래스에 추가된 단어인지 확인
    const category = customLessons?.find(
      (l) => l.lessonCategory_id === categoryId
    );
    if (
      category &&
      category.words?.some((w) => (typeof w === "string" ? w : w.word) === word)
    ) {
      return true;
    }

    // 2. 추가 대기열에 있는지 확인
    const isPending =
      pendingWordAdds?.some((add) => add.lessonId === lessonId) || false;
    if (isPending) {
      return true;
    }

    return false;
  };

  const handleAdd = (lesson) => {
    const alreadyAdded = isCategoryAdded(lesson.lessonCategory_id);
    if (alreadyAdded) {
      alert("이미 추가된 강의입니다.");
      return;
    }
    onAddLesson(lesson);
  };

  const handleWordAdd = async (categoryId, word, lessonId) => {
    if (parentLoading) return;

    if (isWordAdded(categoryId, word, lessonId)) {
      alert("이미 추가된 단어이거나 추가 대기 중입니다.");
      return;
    }

    await onAddWord(categoryId, lessonId, word);
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
          lessons.map((lesson) => {
            const categoryAdded = isCategoryAdded(lesson.lessonCategory_id);

            return (
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
                      <p className="text-sm text-gray-600 truncate">
                        {lesson.words
                          ?.map((w) => (typeof w === "string" ? w : w.word))
                          .join(", ") || "단어 정보 없음"}
                      </p>
                      <p className="text-xs text-gray-400">
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
                        categoryAdded ? "text-gray-400" : "text-black"
                      }`}
                    />
                  </div>
                </div>

                {/* 펼쳐지는 하위 Lessons */}
                {openLessonId === lesson.lessonCategory_id && (
                  <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-300">
                    <div className="space-y-1">
                      {lesson.words && lesson.words.length > 0 ? (
                        lesson.words.map((wordItem, idx) => {
                          const word =
                            typeof wordItem === "string"
                              ? wordItem
                              : wordItem.word;
                          const lessonId =
                            typeof wordItem === "object"
                              ? wordItem.lessonId
                              : `${lesson.lessonCategory_id}_${idx}`;
                          const wordAdded = isWordAdded(
                            lesson.lessonCategory_id,
                            word,
                            lessonId
                          );

                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between py-1 pr-2"
                            >
                              <p
                                className={`text-sm ${
                                  wordAdded ? "text-gray-400" : "text-gray-700"
                                }`}
                              >
                                • {word}
                              </p>
                              <div className="flex items-center">
                                <RxPlus
                                  size={12}
                                  className={`transition-transform cursor-pointer ml-2 ${
                                    wordAdded || parentLoading
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "text-green-500 hover:text-green-700 hover:scale-110"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!wordAdded && !parentLoading) {
                                      handleWordAdd(
                                        lesson.lessonCategory_id,
                                        word,
                                        lessonId
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          세부 강의 없음
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
