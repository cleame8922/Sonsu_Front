import React, { useState, useEffect, useRef } from "react";
import { GiAlarmClock } from "react-icons/gi";

export default function Quiz() {
    const [error, setError] = useState(null);
    const [seconds, setSeconds] = useState(10);
    const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머가 실행 중인지 여부
    const videoRef = useRef(null); // video 요소의 참조를 관리하는 useRef
    const streamRef = useRef(null); // 스트림을 관리하는 useRef

    useEffect(() => {
        // 컴포넌트 마운트 시 웹캠 자동 시작
        const startWebcam = async () => {
            try {
                const userMedia = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                streamRef.current = userMedia; // 스트림을 ref에 저장
                if (videoRef.current) {
                    videoRef.current.srcObject = userMedia; // 스트림을 video 요소에 연결
                }
            } catch (err) {
                setError("웹캠을 시작할 수 없습니다.");
                console.error("웹캠 에러:", err);
            }
        };

        startWebcam();

        // 컴포넌트 언마운트 시 웹캠 정리
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []); // 이 effect는 한 번만 실행되도록 [] 의존성 배열을 설정

    useEffect(() => {
        // 타이머 로직
        if (isTimerRunning && seconds > 0) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds > 1) {
                        return prevSeconds - 1;
                    } else {
                        clearInterval(timer); // 타이머 종료
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(timer); // 타이머 정리
        }
    }, [isTimerRunning, seconds]); // isTimerRunning과 seconds가 변경될 때마다 실행

    const handleStart = () => {
        if (!isTimerRunning) {
            setSeconds(10); // 타이머를 10초로 초기화
            setIsTimerRunning(true); // 타이머 시작
        }
    };

    return (
        <div>
            <div
                className={`flex justify-center h-screen items-center bg-gradient-to-b from-[#fffdef] relative ${
                    seconds <= 5 ? "text-red-500" : "text-black"
                }`} // 5초 이하일 때 텍스트 색상 변경
            >
                <div className="flex w-full">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex mb-8 text-4xl font-bold text-center w-fit">
                            안녕하세요 / 안녕히계세요
                        </div>
                        <div className="flex">
                            <button
                                className="font-semibold px-5 py-1 text-[20px] text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-400"
                                onClick={handleStart} // 시작하기 버튼 클릭 시 타이머 시작
                            >
                                시작하기
                            </button>
                            <div className="flex items-center ml-5">
                                <GiAlarmClock className="size-11" />
                                <div id="second" className="ml-2 text-2xl">
                                    {seconds}초
                                </div>
                            </div>
                        </div>
                        <div id="webcam" className="relative mt-11">
                            {error ? (
                                <div className="p-4 text-center text-red-500">
                                    {error}
                                </div>
                            ) : (
                                <video
                                    ref={videoRef} // video 요소에 ref 연결
                                    autoPlay
                                    className="rounded-lg shadow-lg"
                                    style={{ width: '800px', height: '600px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
