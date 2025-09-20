import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import AdminTitle from "../../../components/AdminTitle";
import AdminNav from "../../../components/AdminNav";
import SonsuCard from "./SonsuCard";
import CustomCard from "./CustomCard";
import { default as axios } from "axios";
import { API_URL } from "../../../config";
import { getToken } from "../../../utils/authStorage";

export default function Curri_Part() {
  const { code: classId } = useParams();
  const { state } = useLocation();

  // state로 전달된 클래스 정보가 있으면 사용하고, 없으면 기본값
  const classInfo = state?.classInfo || { name: "클래스 이름", code: classId };

  const [customLessons, setCustomLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingWordDeletes, setPendingWordDeletes] = useState([]); // 삭제 예정인 단어들

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const token = getToken();
        const { data } = await axios.get(
          `${API_URL}/class/${classId}/lessons`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        console.log("=== 원본 API 응답 ===", data);
        console.log("첫 번째 카테고리의 lessons:", data[0]?.lessons);

        // API 응답을 올바른 형태로 변환
        const formattedLessons = data.map((category) => {
          console.log(`카테고리 ${category.id}의 lessons:`, category.lessons);
          return {
            lessonCategory_id: category.id,
            part_number: category.partNumber,
            category: category.categoryName,
            words: category.lessons?.map((l) => l.word) || [],
            lessons: category.lessons || [], // 개별 레슨 정보도 보관 (lessonId 포함)
            lessonLevel_id: category.lessonLevel,
          };
        });

        setCustomLessons(formattedLessons);
        console.log("=== 포맷팅된 lessons ===", formattedLessons);
      } catch (err) {
        console.error("강의 불러오기 실패", err);
        alert("강의 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchLessons();
    }
  }, [classId]);

  // SonsuCard에서 + 클릭 시 호출
  const handleAddLesson = (lesson) => {
    if (
      !customLessons.some(
        (l) => l.lessonCategory_id === lesson.lessonCategory_id
      )
    ) {
      setCustomLessons([...customLessons, lesson]);
    }
  };

  // CustomCard에서 강의 전체 삭제 시 호출
  const handleDeleteLesson = (lessonId) => {
    setCustomLessons(
      customLessons.filter((l) => l.lessonCategory_id !== lessonId)
    );
  };

  // 개별 단어 삭제 처리
  const handleDeleteWord = async (categoryId, word, wordIndex) => {
    try {
      console.log("=== 단어 삭제 시작 ===");
      console.log("categoryId:", categoryId);
      console.log("word:", word);
      console.log("wordIndex:", wordIndex);

      // 해당 카테고리 찾기
      const category = customLessons.find(
        (l) => l.lessonCategory_id === categoryId
      );

      console.log("찾은 카테고리:", category);

      if (!category) {
        console.error("카테고리를 찾을 수 없습니다.");
        alert("카테고리를 찾을 수 없습니다.");
        return;
      }

      console.log("카테고리의 lessons:", category.lessons);
      console.log("카테고리의 words:", category.words);

      // lessons 배열이 없거나 비어있는 경우 처리
      if (!category.lessons || category.lessons.length === 0) {
        console.error(
          "레슨 정보가 없습니다. API에서 lessonId를 제공하지 않는 것 같습니다."
        );
        alert(
          "개별 단어 삭제 기능을 사용할 수 없습니다. API에서 lessonId 정보가 없습니다."
        );
        return;
      }

      // 삭제할 레슨의 ID 찾기
      const lessonToDelete = category.lessons[wordIndex];
      console.log("삭제할 레슨:", lessonToDelete);

      if (!lessonToDelete) {
        console.error("해당 인덱스의 레슨을 찾을 수 없습니다.");
        alert("삭제할 레슨을 찾을 수 없습니다.");
        return;
      }

      // lessonId 찾기 (lessonId 필드 사용)
      const lessonId = lessonToDelete.lessonId;

      if (!lessonId) {
        console.error(
          "레슨 ID를 찾을 수 없습니다. 레슨 객체 구조:",
          lessonToDelete
        );
        alert("레슨 ID를 찾을 수 없습니다. 백엔드 개발자에게 문의하세요.");
        return;
      }

      console.log("삭제할 레슨 ID:", lessonId);

      // 즉시 UI에서 제거 (낙관적 업데이트)
      setCustomLessons((prevLessons) =>
        prevLessons.map((lesson) => {
          if (lesson.lessonCategory_id === categoryId) {
            return {
              ...lesson,
              words: lesson.words.filter((_, index) => index !== wordIndex),
              lessons: lesson.lessons.filter((_, index) => index !== wordIndex),
            };
          }
          return lesson;
        })
      );

      // 삭제 대기 목록에 추가
      setPendingWordDeletes((prev) => [...prev, lessonId]);

      // 확인 메시지
      alert(
        "단어가 삭제 예정 목록에 추가되었습니다. '수정완료' 버튼을 눌러 저장해주세요."
      );
    } catch (err) {
      console.error("단어 삭제 실패:", err);
      alert("단어 삭제에 실패했습니다.");
    }
  };

  // 수정완료 버튼 클릭 시 백엔드 저장
  const handleSave = async () => {
    if (loading) return; // 로딩 중이면 중복 요청 방지

    setLoading(true);
    try {
      const token = getToken();

      // 1. 먼저 개별 단어 삭제 처리
      if (pendingWordDeletes.length > 0) {
        console.log("삭제할 레슨 IDs:", pendingWordDeletes);

        await axios.delete(`${API_URL}/class/${classId}/delete`, {
          data: { lessonIds: pendingWordDeletes },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log("개별 단어 삭제 완료");
        setPendingWordDeletes([]); // 삭제 대기 목록 초기화
      }

      // 2. 카테고리 추가/삭제 처리 (기존 로직)
      const categoryIds = customLessons
        .map((l) => l.lessonCategory_id)
        .filter((id) => id !== null && id !== undefined);

      console.log("Saving categoryIds:", categoryIds);

      // 현재 DB 데이터 조회
      const { data: currentData } = await axios.get(
        `${API_URL}/class/${classId}/lessons`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const currentCategoryIds = currentData.map((category) => category.id);

      // 삭제할 카테고리들 (현재 DB에는 있지만 새로운 목록에는 없는 것들)
      const categoriesToDelete = currentCategoryIds.filter(
        (id) => !categoryIds.includes(id)
      );

      // 추가할 카테고리들 (새로운 목록에는 있지만 현재 DB에는 없는 것들)
      const categoriesToAdd = categoryIds.filter(
        (id) => !currentCategoryIds.includes(id)
      );

      console.log("Categories to delete:", categoriesToDelete);
      console.log("Categories to add:", categoriesToAdd);

      // 삭제할 카테고리가 있다면 삭제 API 호출
      if (categoriesToDelete.length > 0) {
        await axios.delete(`${API_URL}/class/${classId}/delCate`, {
          data: { categoryIds: categoriesToDelete },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      }

      // 추가할 카테고리가 있다면 추가 API 호출
      if (categoriesToAdd.length > 0) {
        await axios.post(
          `${API_URL}/class/${classId}/addCate`,
          { categoryIds: categoriesToAdd },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      }

      // 3. 저장 후 최신 목록 다시 가져오기
      const { data } = await axios.get(`${API_URL}/class/${classId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      // 가져온 데이터 포맷팅
      const formattedLessons = data.map((category) => ({
        lessonCategory_id: category.id,
        part_number: category.partNumber,
        category: category.categoryName,
        words: category.lessons?.map((l) => l.word) || [],
        lessons: category.lessons || [], // lessonId를 포함한 전체 레슨 정보
        lessonLevel_id: category.lessonLevel,
      }));

      setCustomLessons(formattedLessons);
      alert("강의 저장 완료!");
    } catch (err) {
      console.error("저장 실패:", err);
      alert(
        `저장 실패: ${err.response?.status} ${
          err.response?.statusText || err.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />
      <div className="flex w-full">
        <AdminNav />
        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] h-[850px] px-10 py-8">
          <div>
            <p className="font-semibold text-[25px]">{classInfo.name}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-3 items-center">
                <div className="text-[20px] font-semibold text-[#777]">
                  #{classInfo.code}
                </div>
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: classInfo.colorHex }}
                ></div>
              </div>
              <button
                className={`text-white text-[18px] rounded-full px-4 py-1 font-semibold transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#5A9CD0] hover:bg-[#4A8BC0]"
                }`}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "저장 중..." : "수정완료"}
              </button>
            </div>
            {classInfo.description && (
              <p className="text-gray-600 text-sm mt-2">
                {classInfo.description}
              </p>
            )}
            {/* 삭제 대기 목록 표시 */}
            {/* {pendingWordDeletes.length > 0 && (
              <div className="mt-2 p-2 bg-yellow-100 rounded text-sm">
                <p className="text-yellow-800">
                  삭제 예정 단어: {pendingWordDeletes.length}개
                  <span className="ml-2 text-xs">
                    '수정완료' 버튼을 눌러 저장해주세요.
                  </span>
                </p>
              </div>
            )} */}
          </div>

          <div className="flex w-full mt-8 justify-evenly">
            <SonsuCard
              classId={classId}
              activeTab="초급"
              onAddLesson={handleAddLesson}
              customLessons={customLessons}
            />
            <CustomCard
              classId={classId}
              lessons={customLessons}
              onDeleteLesson={handleDeleteLesson}
              onDeleteWord={handleDeleteWord}
              name={classInfo.name}
              classColor={classInfo.colorHex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
