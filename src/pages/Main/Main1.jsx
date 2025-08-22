import React from "react";

export default function Main1() {
  return (
    <div className="flex flex-col justify-center ">
      <div className="flex items-center py-12 px-40">
        <img src="/images/logo.png" className="w-20" alt="" />
        <div className="text-[25px] font-black text-[#222]">SONSU</div>
      </div>
      {/* 상단 텍스트 */}
      <div className="items-center flex flex-col mt-6">
        <div className="text-[#3c3c3c] text-[25px]">
          손으로 이어지는 새로운 소통
        </div>
        <div className="text-[#121212] text-[80px] font-bold mb-20">
          손手잇다
        </div>
        <div className="flex space-x-6 mt-2">
          <img src="/images/Main/AppStore.png" className="w-[170px] h-auto" />
          <img src="/images/Main/GooglePlay.png" className="w-[170px] h-auto" />
        </div>
      </div>

      {/* 목업 이미지 (고정 배치) */}
      <div className="flex justify-center mt-20 space-x-[30px]">
        <img
          src="/images/Mockup/Attendance.png"
          className="w-[300px] h-auto rotate-[-15deg] drop-shadow-2xl translate-y-[100px]"
        />
        <img
          src="/images/Mockup/Main.png"
          className="w-[300px] h-auto rotate-[-7deg] drop-shadow-2xl translate-y-[30px]"
        />
        <img
          src="/images/Mockup/Study.png"
          className="w-[300px] h-auto rotate-[0deg] drop-shadow-2xl"
        />
        <img
          src="/images/Mockup/MyPage.png"
          className="w-[300px] h-auto rotate-[7deg] drop-shadow-2xl translate-y-[30px]"
        />
        <img
          src="/images/Mockup/SpeedGame.png"
          className="w-[300px] h-auto rotate-[15deg] drop-shadow-2xl translate-y-[100px]"
        />
        {/* <img
          src="/images/Mockup/OX.png"
          className="w-[300px] h-auto rotate-[20deg] drop-shadow-2xl translate-y-[240px]"
        /> */}
      </div>
      <div className="h-[280px]"></div>
    </div>
  );
}
