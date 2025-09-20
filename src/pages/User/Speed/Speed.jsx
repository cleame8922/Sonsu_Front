import React, { useState, useEffect } from "react";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";
import Lottie from "lottie-react";
import { serverIP } from "../../../config";
import axios from "axios";

export default function Speed() {
  const [animationData, setAnimationData] = useState(null);
  const [time, setTime] = useState(5);
  const [error, setError] = useState(null);
  const [videoSrc] = useState(`${serverIP}/video_feed`);
  const [isVideoPlaying] = useState(true);
  const [gameResult, setGameResult] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [question, setQuestion] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  // Lottie 애니메이션 불러오기
  useEffect(() => {
    fetch("/assets/animations/clock.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  // 문제 불러오기
  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`${serverIP}/get_question`);
      setQuestion(res.data.question);
      setGameResult(null);
    } catch (err) {
      console.error("문제 불러오기 실패:", err);
      setError("문제를 가져오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // 게임 정보 주기적 확인
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${serverIP}/get_game_info`);
        const data = res.data;
        setGameResult(data.game_result);
        setConfidence(data.confidence);

        if (data.game_result === "정답입니다!") {
          setModalVisible(true);
        }
      } catch (err) {
        console.error("게임 정보 불러오기 실패:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 게임 종료 시 틀린 문제 한 번에 저장
  useEffect(() => {
    const saveBulk = async () => {
      if (!gameOver || incorrectAnswers.length === 0) return;

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await axios.post(
          `${serverIP}/save_incorrect`,
          { answers: incorrectAnswers },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true, // JWT 토큰/쿠키를 브라우저가 함께 보냄
          }
        );
        console.log("📌 틀린 문제 저장 완료:", res.data);
        setIncorrectAnswers([]);
      } catch (err) {
        console.error("❌ 틀린 문제 저장 실패:", err);
      }
    };

    saveBulk();
  }, [gameOver]);

  // 다음 문제로 넘어가기
  const handleNextQuestion = () => {
    if (gameResult === "정답입니다!") {
      setCorrectCount((prev) => prev + 1);
    }

    // 틀렸다면 배열에 저장
    if (gameResult === "틀렸습니다!") {
      setIncorrectAnswers((prev) => [...prev, { question, confidence }]);
    }

    if (questionIndex >= 5) {
      setGameOver(true);
      setModalVisible(false);
      return;
    }

    setModalVisible(false);
    setTime(5);
    setQuestionIndex((prev) => prev + 1);
    fetchQuestion();
    setGameResult(null);
  };

  // 타이머 기능
  useEffect(() => {
    if (time <= 0) {
      setGameResult("틀렸습니다!");
      setModalVisible(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="min-h-screen bg-[#F28079]">
      <UserTitle />
      <div className="flex w-full">
        <UserNav />
        <div className="flex flex-col mr-10 w-full rounded-[40px] bg-[#fafafa] shadow-xl h-[850px] px-12 py-9 overflow-y-auto">
          {gameOver ? (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="mb-4 text-3xl font-bold">게임 종료 🎉</h2>
              <p className="mb-6 text-xl">
                총 <span className="font-bold">{5}</span>문제 중{" "}
                <span className="text-[#39B360] font-bold">{correctCount}</span>
                개 맞췄습니다!
              </p>
              <button
                onClick={() => {
                  setGameOver(false);
                  setCorrectCount(0);
                  setQuestionIndex(1);
                  setTime(5);
                  fetchQuestion();
                }}
                className="px-6 py-2 bg-[#39B360] text-white rounded-lg font-bold"
              >
                다시 시작
              </button>
            </div>
          ) : (
            <>
              <img
                src="/assets/images/review/speedTitle.png"
                alt="스피드 타이틀"
                className="w-[180px] m-3"
              />

              <div className="flex justify-center text-[28px] fontSB">
                {question ? question : "문제를 불러오는 중..."}
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center w-[75%]">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    style={{ width: 65 }}
                  />
                  <div className="flex text-[35px] fontRix ml-3">{time}</div>
                </div>

                <div className="flex items-end text-[30px] fontEB">
                  <span className="text-[#39B360] text-[35px] fontEB">
                    {questionIndex}
                  </span>
                  /5
                </div>
              </div>

              <div className="flex justify-center h-full">
                {error ? (
                  <div className="mt-4 text-red-500">{error}</div>
                ) : (
                  <div className="mt-4">
                    {isVideoPlaying && (
                      <img
                        src={videoSrc}
                        alt="Video Stream"
                        className="w-[1200px] h-[600px] shadow-xl rounded-3xl"
                      />
                    )}
                  </div>
                )}
              </div>

              {modalVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="p-8 text-center bg-white shadow-lg rounded-xl">
                    <h2 className="py-3 mb-4 text-2xl font-bold px-7">
                      {gameResult === "정답입니다!"
                        ? "정답입니다!"
                        : "틀렸습니다!"}
                    </h2>
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-1.5 bg-[#F28079] text-white rounded-lg font-bold"
                    >
                      {questionIndex >= 5 ? "결과 보기" : "다음 문제"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
