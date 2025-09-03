import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";

export default function Main1() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/assets/animations/main.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <div className="flex flex-col justify-center relative">
      <div className="flex items-center px-24 py-12">
        <img src="assets/images/logo.png" className="w-20" alt="" />
        <div className="text-[25px] fontBold text-[#222]">SONSU</div>
      </div>

      {/* 상단 텍스트 */}
      <div className="flex flex-col items-center mt-6">
        <div className="text-[#3c3c3c] text-[25px]">
          손으로 이어지는 새로운 소통
        </div>
        <div className="text-[#121212] text-[80px] fontBold mb-20">
          손手잇다
        </div>
        <div className="flex mt-2 space-x-6">
          <img
            src="assets/images/Main/AppStore.png"
            className="w-[170px] h-auto"
            alt=""
          />
          <img
            src="assets/images/Main/GooglePlay.png"
            className="w-[170px] h-auto"
            alt=""
          />
        </div>
      </div>

      <div className="w-full mt-32">
        {animationData && (
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>


      <div className="h-[280px]"></div>
    </div>
  );
}
