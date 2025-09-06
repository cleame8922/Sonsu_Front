import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";

export default function Main1() {
  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/assets/animations/main.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <div className="flex flex-col justify-center relative px-24 py-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center ">
          <img src="assets/images/logo.png" className="w-20" alt="" />
          <div className="text-[25px] fontBold text-[#222]">SONSU</div>
        </div>
        <div className="flex space-x-4">
          <button
            className="fontSB text-[#222] hover:text-[#DBBF63] transition-colors"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <div className="w-[1px] bg-[#222] self-center h-4"></div>
          <button
            className="fontSB text-[#222] rounded-lg hover:text-[#DBBF63] transition-colors"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* 상단 텍스트 */}
      <div className="flex flex-col items-center mt-6">
        <div className="text-[#3c3c3c] text-[25px]">
          손으로 이어지는 새로운 소통
        </div>
        <div className="text-[#121212] text-[80px] fontBold mb-12">
          손手잇다
        </div>
        <div className="flex">
          <button
            className="bg-[#FFE694] shadow-xl px-24 py-2 rounded-full text-[23px]"
            onClick={() => navigate("/home")}
          >
            시작하기
          </button>
        </div>
      </div>

      <div className="w-full mt-32">
        {animationData && (
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
    </div>
  );
}
