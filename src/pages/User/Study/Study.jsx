import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserTitle from "../../../components/UserTitle";
import UserNav from "../../../components/UserNav";
import { API_URL } from "../../../config";
import { serverIP } from "../../../config";
import { getToken } from "../../../utils/authStorage";

export default function Study() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [videoSrc, setVideoSrc] = useState(`${serverIP}/video_feed`);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // location.state에서 topic, lesson, index 받기 (앱과 동일)
  const { topic, lesson, index } = location.state || {};

  const [animation, setAnimation] = useState("");
  const [stepData, setStepData] = useState(null);

  console.log("레슨아이디", lesson);

  const levelId = { easy: 1, normal: 2, hard: 3 };

  // 토픽 데이터 가져오기 (앱과 동일한 로직)
  const fetchTopic = async () => {
    try {
      const response = await fetch(
        `${API_URL}/lessons/${lesson?.id || lessonId}/topics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("토픽 데이터", data);

        // topic이 있으면 해당 topic 찾기, 없으면 lessonId로 찾기
        const topicData = topic
          ? data.find((t) => t.word === topic.word)
          : data.find((t) => t.lesson_id === parseInt(lessonId));

        if (topicData) {
          const animationPath = topicData.animation_path;
          console.log("서버에서 전달된 URL:", animationPath);
          setAnimation(animationPath);
          setStepData(topicData);
        }
      }
    } catch (error) {
      console.log("애니메이션 불러오기 실패:", error.message);
    }
  };

  console.log("비디오 여기", animation);

  // 강의 시작하기 (앱과 동일한 로직)
  const startLesson = async () => {
    try {
      const targetLessonId = topic?.lesson_id || lessonId;
      const token = getToken();

      const response = await fetch(`${API_URL}/lessons/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
        body: JSON.stringify({ lessonId: targetLessonId }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("강의가 시작되었습니다", data);
      } else if (response.status === 401) {
        console.log("로그인을 해주세요.");
      } else if (response.status === 403) {
        console.log("접근이 거부되었습니다. 토큰이 유효하지 않습니다.");
      }
    } catch (error) {
      console.log("에러 발생:", error.message);
    }
  };

  // 혼자 해보기 버튼 클릭
  //   const handlePractice = () => {
  //     navigate("/study-only", {
  //       state: {
  //         topic: topic || stepData,
  //         lesson,
  //         index,
  //       },
  //     });
  //   };

  useEffect(() => {
    fetchTopic();
    startLesson();
  }, [topic, lessonId]);

  // 현재 topic 또는 stepData에서 표시할 데이터 결정
  const currentTopic = topic || stepData;
  const displayTitle = currentTopic
    ? `Step ${currentTopic.step_number || index + 1}. ${currentTopic.word}`
    : `Step ${lessonId}`;

  return (
    <div className="min-h-screen bg-[#FFE694]">
      <UserTitle />
      <div className="flex w-full">
        <UserNav />
        <div className="flex flex-col mr-10 w-full rounded-[40px] bg-[#f5f5f5] shadow-xl h-[850px] px-12 py-9 overflow-y-auto">
          <div className="flex justify-center space-x-20">
            <div className="text-left">
              <h1 className="text-[30px] font-bold mt-[33px] text-[#333] m-0">
                {displayTitle}
              </h1>

              {/* 설명 텍스트 */}
              <div className="flex justify-center mt-12">
                <div className="">
                  <p className="text-[14px] py-[3px] m-0 text-[#333] leading-[1.5]">
                    1. 오른 손바닥으로 왼 팔등을 스쳐내리세요.
                  </p>
                  <p className="text-[14px] py-[3px] m-0 text-[#333] leading-[1.5]">
                    2. 두 주먹을 쥐고 바닥이 아래로 향하게 하여 가슴 앞에서
                    아래로 내려요
                  </p>
                </div>
              </div>
            </div>
            {/* 비디오 플레이어 */}
            {(currentTopic?.animation_path || animation) && (
              <div className="flex justify-end">
                <video
                  src={currentTopic?.animation_path || animation}
                  loop
                  autoPlay
                  muted
                  className="w-[55%] max-w-[600px] h-auto rounded-[10px] shadow-md"
                  style={{ aspectRatio: "16/9" }}
                  onError={(e) => console.log("Video error:", e)}
                >
                  브라우저가 비디오를 지원하지 않습니다.
                </video>
              </div>
            )}
          </div>

          {/* 카메라 피드 */}
          {/* <div className="flex justify-center mt-12">
            <div className="w-[1000px] h-[450px] overflow-hidden rounded-[15px] bg-black border border-[#ddd]">
              <iframe
                src={`${API_URL}/game1/video_feed`}
                className="w-full h-full bg-transparent border-none"
                title="Camera Feed"
                frameBorder="0"
                allow="camera; microphone"
                onError={(error) => console.log("Iframe error:", error)}
              />
            </div>
          </div> */}

          <div className="flex justify-center h-full">
            {error ? (
              <div className="mt-4 text-red-500">{error}</div>
            ) : (
              <div className="mt-4">
                {isVideoPlaying && (
                  <img
                    src={videoSrc}
                    alt="Video Stream"
                    className="w-[1100px] h-[500px] shadow-lg rounded-3xl"
                  />
                )}
              </div>
            )}
          </div>

          {/* 혼자 해보기 버튼 */}
          {/* <div className="flex justify-center">
            <button
              onClick={handlePractice}
              className="bg-[#FFE694] py-[7px] px-[30px] rounded-[8px] border-none cursor-pointer transition-all duration-200 shadow-[1px_3px_5px_rgba(0,0,0,0.3)] hover:transform hover:-translate-y-[2px] hover:shadow-[1px_5px_8px_rgba(0,0,0,0.4)]"
            >
              <span className="text-[21px] font-bold text-[#333] text-center">
                혼자 해보기 →
              </span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
