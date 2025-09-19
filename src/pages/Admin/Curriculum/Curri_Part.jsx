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
  const name = state?.name;

  const [customLessons, setCustomLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = getToken();
        const { data } = await axios.get(
          `${API_URL}/class/${classId}/lessons`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setCustomLessons(data);
        console.log(data);
      } catch (err) {
        console.error("강의 불러오기 실패", err);
      }
    };

    fetchLessons();
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

  // CustomCard에서 삭제 시 호출
  const handleDeleteLesson = (lessonId) => {
    setCustomLessons(
      customLessons.filter((l) => l.lessonCategory_id !== lessonId)
    );
  };

  // 수정완료 버튼 클릭 시 백엔드 저장
  const handleSave = async () => {
    try {
      const token = getToken();
      const categoryIds = customLessons.map((l) => l.lessonCategory_id);

      await axios.post(
        `${API_URL}/class/${classId}/addCate`,
        { categoryIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // 저장 후 최신 목록 다시 가져오기
      const { data } = await axios.get(`${API_URL}/class/${classId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setCustomLessons(data);

      alert("강의 저장 완료!");
    } catch (err) {
      console.error(err);
      alert("저장 실패");
    }
  };

  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />
      <div className="flex w-full">
        <AdminNav />
        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] h-[850px] px-10 py-8">
          <div>
            <p className="font-semibold text-[25px]">{name}</p>
            <div className="flex items-center justify-between">
              <div className="text-[20px] font-semibold text-[#777]">
                #{classId}
              </div>
              <button
                className="bg-[#5A9CD0] text-white text-[18px] rounded-full px-4 py-1 font-semibold"
                onClick={handleSave}
              >
                수정완료
              </button>
            </div>
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
              name={name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
