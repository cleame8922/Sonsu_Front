import React, { useState, useEffect, useRef } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

export default function Study() {
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
        canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
        );
        canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
        );

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
    
    return (
        <div className="flex justify-center h-screen items-center bg-gradient-to-b from-[#fffdef] relative">
            <div className="flex flex-col items-center justify-center">
                <div className="border-[1px] border-[#666666] rounded-xl">
                    <img src="/images/hoyeon_hi.png" alt="hoyeon_hi" className="w-[500px]" />
                </div>
                <div className="flex p-5 text-[30px] font-semibold">안녕하세요 / 안녕히 계세요</div>
                <div className="flex text-center text-[18px] font-bold">오른 손바닥으로 주먹을 쥔 왼 팔을 <br />
                    쓸어내린 다음, 두 주먹을 쥐고 <br />
                    동시에 아래로 내립니다.
                </div>
            </div>
            <div className="flex border-[1px] border-[#666666] rounded-xl ml-5">
                <div id="webcam" className="relative">
                    {error ? (
                        <div className="p-4 text-center text-red-500">{error}</div>
                    ) : (
                        <div className="relative">
                            <video
                                ref={videoRef}
                                className="rounded-lg shadow-lg"
                                style={{
                                width: "1100px",
                                height: "1000px",
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
    );
}
