import React from "react";

export default function SpeedStart() {
  return (
    <div className="relative flex flex-col items-center w-full min-h-screen">
      {/* 제목: 화면 맨 위 중앙 고정 */}
      <div className="absolute flex justify-center w-full mt-5 top-24">
        <img
          src="images/SpeedTitle.png"
          alt="스피드 타이틀"
          className="h-fit w-fit"
        />
      </div>

      <div className="flex h-[250px]"></div>

      <div className="z-10 flex flex-col items-center">
        <div className="flex text-center text-[24px] font-medium">스피드 퀴즈를 위해 <br /> 카메라를 준비해주세요.</div>
        
        <button className="flex justify-center w-fit px-12 py-3 mt-6 rounded-3xl bg-gradient-to-b from-[#fff3af] to-[#ffe553]">
          START
        </button>
      </div>

      {/* 원: 화면 맨 아래 중앙 */}
      <div className="absolute bottom-0 flex justify-center w-full">
        <div className="relative flex justify-center">
          <img
            src="images/SpeedEllipse.png"
            alt="원"
            className="lg:w-[75%] w-[90%]"
          />
          
          <div className="absolute bottom-0 flex flex-col items-center">
            <img
            src="images/sonsu.png"
            alt="원"
            className="lg:w-[70%] w-[45%]"
          />
          </div>
        </div>
      </div>
    </div>
  );
}
