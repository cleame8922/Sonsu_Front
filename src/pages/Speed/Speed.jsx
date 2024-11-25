import React, { useState, useEffect, useRef } from "react";
import { GiAlarmClock } from "react-icons/gi";
import { Camera } from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

export default function Quiz() {
    const [error, setError] = useState(null);
    const [seconds, setSeconds] = useState(10); // 타이머 초기 값 10초
    const [isTimerRunning, setIsTimerRunning] = useState(false); // 타이머가 실행 중인지 상태
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const handsRef = useRef(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const userMedia = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                streamRef.current = userMedia;
                if (videoRef.current) {
                    videoRef.current.srcObject = userMedia;
                }
                initializeHandDetection();
            } catch (err) {
                setError("웹캠을 시작할 수 없습니다.");
                console.error("웹캠 에러:", err);
            }
        };

        const initializeHandDetection = () => {
            handsRef.current = new Hands({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                },
            });

            handsRef.current.setOptions({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            });

            handsRef.current.onResults(onResults);

            if (videoRef.current) {
                cameraRef.current = new Camera(videoRef.current, {
                    onFrame: async () => {
                        await handsRef.current.send({ image: videoRef.current });
                    },
                    width: 800,
                    height: 600,
                });
                cameraRef.current.start();
            }
        };

        startWebcam();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
            if (cameraRef.current) {
                cameraRef.current.stop();
            }
        };
    }, []);

    const onResults = (results) => {
        const canvasCtx = canvasRef.current.getContext("2d");
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, Hands.HAND_CONNECTIONS, {
                    color: "#00FF00",
                    lineWidth: 5,
                });
                drawLandmarks(canvasCtx, landmarks, {
                    color: "#FF0000",
                    lineWidth: 2,
                });
            }
        }
        canvasCtx.restore();
    };

    useEffect(() => {
        if (isTimerRunning && seconds > 0) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds > 1) {
                        return prevSeconds - 1;
                    } else {
                        clearInterval(timer);
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isTimerRunning, seconds]);

    const handleStart = () => {
        if (!isTimerRunning) {
            setIsTimerRunning(true);
        }
    };

    const handleStop = () => {
        if (isTimerRunning) {
            setIsTimerRunning(false);
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
                        <div id="webcam" className="relative mt-11">
                            {error ? (
                                <div className="p-4 text-center text-red-500">
                                    {error}
                                </div>
                            ) : (
                                <div className="relative">
                                    <video
                                        ref={videoRef}
                                        className="rounded-lg shadow-lg"
                                        style={{
                                            width: "800px",
                                            height: "600px",
                                            visibility: "hidden",
                                            position: "absolute",
                                        }}
                                    />
                                    <canvas
                                        ref={canvasRef}
                                        className="rounded-lg shadow-lg"
                                        width={800}
                                        height={600}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
