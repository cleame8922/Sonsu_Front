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

  // 서버에서 데이터를 가져오는 함수를 별도로 분리
  const fetchLessons = async () => {
    try {
      const token = getToken();
      const { data } = await axios.get(`${API_URL}/class/${classId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      // API 응답을 올바른 형태로 변환
      const formattedLessons = data.map((category) => ({
        lessonCategory_id: category.id,
        part_number: category.partNumber,
        category: category.categoryName,
        words: category.lessons?.map((l) => l.word) || [],
        lessonLevel_id: category.lessonLevel,
      }));

      return formattedLessons;
    } catch (err) {
      console.error("강의 불러오기 실패", err);
      throw err;
    }
  };

  useEffect(() => {
    const loadLessons = async () => {
      if (!classId) return;

      setLoading(true);
      try {
        const lessons = await fetchLessons();
        setCustomLessons(lessons);
        console.log("Fetched lessons:", lessons);
      } catch (err) {
        alert("강의 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, [classId]);

  // SonsuCard에서 + 클릭 시 호출
  const handleAddLesson = (lesson) => {
    // 이미 있는지 한 번 더 확인 (안전장치)
    const alreadyExists = customLessons.some(
      (l) => l.lessonCategory_id === lesson.lessonCategory_id
    );

    if (!alreadyExists) {
      setCustomLessons((prevLessons) => [...prevLessons, lesson]);
    } else {
      console.warn("이미 추가된 레슨:", lesson);
    }
  };

  // CustomCard에서 삭제 시 호출
  const handleDeleteLesson = (lessonId) => {
    setCustomLessons((prevLessons) =>
      prevLessons.filter((l) => l.lessonCategory_id !== lessonId)
    );
  };

  // 수정완료 버튼 클릭 시 백엔드 저장
  const handleSave = async () => {
    if (loading) return; // 로딩 중이면 중복 요청 방지

    setLoading(true);
    try {
      const token = getToken();

      // categoryIds 추출 및 null/undefined 필터링
      const categoryIds = customLessons
        .map((l) => l.lessonCategory_id)
        .filter((id) => id !== null && id !== undefined);

      console.log("Saving categoryIds:", categoryIds);

      // 현재 서버의 데이터를 가져와서 비교
      const currentLessons = await fetchLessons();
      const currentCategoryIds = currentLessons.map(
        (lesson) => lesson.lessonCategory_id
      );

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

      // 변경사항이 없으면 저장하지 않음
      if (categoriesToDelete.length === 0 && categoriesToAdd.length === 0) {
        alert("변경사항이 없습니다.");
        return;
      }

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

      // 저장 후 최신 목록 다시 가져오기 (서버 상태와 동기화)
      const updatedLessons = await fetchLessons();
      setCustomLessons(updatedLessons);

      alert("강의 저장 완료!");
    } catch (err) {
      console.error("저장 실패:", err);

      // 더 자세한 에러 정보 로깅
      if (err.response) {
        console.error("응답 상태:", err.response.status);
        console.error("응답 데이터:", err.response.data);
        console.error("응답 헤더:", err.response.headers);
      } else if (err.request) {
        console.error("요청 객체:", err.request);
      } else {
        console.error("에러 메시지:", err.message);
      }

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
              name={classInfo.name}
              classColor={classInfo.colorHex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}