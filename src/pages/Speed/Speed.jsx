import React, { useState, useEffect } from "react";
import { GiAlarmClock } from "react-icons/gi";

export default function Quiz() {
    const [error, setError] = useState(null);
    const [seconds, setSeconds] = useState(10); // 타이머 초기 값 10초
    const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머가 실행 중인지 상태
    const [question, setQuestion] = useState(null);
    const [videoSrc, setVideoSrc] = useState("http://localhost:5001/video_feed");
    const [isVideoPlaying, setIsVideoPlaying] = useState(true); // 비디오 상태 관리

    // 게임 문제를 가져오는 함수
    const getQuestion = async () => {
        try {
            const response = await fetch('http://localhost:5001/get_question');
            if (!response.ok) {
                throw new Error('문제를 가져오는 데 실패했습니다.');
            }
            const data = await response.json();
            setQuestion(data.question);
        } catch (err) {
            setError(`문제를 가져오는 중 오류가 발생했습니다: ${err.message}`);
            console.error("문제 가져오기 오류:", err);
        }
    };

    useEffect(() => {
        getQuestion();
    }, []);

    // 타이머가 실행되는 동안 주기적으로 시간을 업데이트
    useEffect(() => {
        let timer;
        if (isTimerRunning) {
            timer = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [isTimerRunning]);

    useEffect(() => {
        if (seconds === 0 && isTimerRunning) {
            setIsTimerRunning(false); // 타이머가 끝나면 멈추기
            setIsVideoPlaying(false); // 비디오 멈추기
        }
    }, [seconds, isTimerRunning]);

    const handleStart = () => {
        if (!isTimerRunning) {
            setIsTimerRunning(true);
            setIsVideoPlaying(true); // 타이머 시작 시 비디오 다시 시작
        }
    };

    const handleStop = () => {
        if (isTimerRunning) {
            setIsTimerRunning(false);
            setIsVideoPlaying(false); // 타이머 멈추면 비디오 멈추기
        }
    };

    return (
        <div>
            <div
                className={`flex justify-center h-screen items-center bg-gradient-to-b from-[#fffdef] relative ${
                    seconds <= 5 ? "text-red-500" : "text-black"
                }`}
            >
                <div className="flex w-full">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex mb-8 text-4xl font-bold text-center w-fit">
                            안녕하세요 / 안녕히계세요
                        </div>

                        <div className="flex">
                            <button
                                className="font-semibold px-5 py-1 text-[20px] text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-400"
                                onClick={handleStart}
                            >
                                시작하기
                            </button>

                            <button
                                className="font-semibold px-5 py-1 text-[20px] text-white transition-colors bg-red-500 rounded-lg hover:bg-red-400 ml-4"
                                onClick={handleStop}
                            >
                                멈추기
                            </button>

                            <div className="flex items-center ml-5">
                                <GiAlarmClock className="size-11" />
                                <div id="second" className="ml-2 text-2xl">
                                    {seconds}초
                                </div>
                            </div>
                        </div>

                        {seconds === 0 ? (
                            <h2 className="mt-4 text-xl text-red-500">시간이 다 되었습니다!</h2>
                        ) : (
                            <h1 className="mt-4">현재 문제: {question}</h1>
                        )}

                        {error ? (
                            <div className="mt-4 text-red-500">{error}</div>
                        ) : (
                            <div className="mt-4">
                                {/* 비디오 스트리밍을 img 태그로 표시 */}
                                {isVideoPlaying && (
                                    <img
                                        src={videoSrc}
                                        alt="Video Stream"
                                        className="rounded-lg shadow-lg"
                                        style={{ width: "800px", height: "600px" }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
