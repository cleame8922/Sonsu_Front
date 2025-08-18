import React from "react";
import { NavLink } from "react-router-dom";

export default function SpeedInfo() {
  return (
    <div>
      <div className="flex justify-center h-screen items-centers bg-gradient-to-b from-[#fffdef]">
        <div className="flex w-[100%]">
          <div className="flex justify-center items-center w-[100%]">
            <img
              src="/images/stop.png"
              alt="report"
              className="flex w-[450px]"
            />
            <div className="flex flex-col items-center justify-center ml-11">
              <div className="flex w-fit text-center font-extrabold text-[55px] text-[red]">
                잠깐!
              </div>
              <div className="flex w-fit text-center font-bold text-[40px] text-[#222] mt-7">
                스피드 퀴즈를 위해 카메라를 준비해주세요.
              </div>
              <div className="flex w-fit text-center font-bold text-[40px] text-[#222] mt-7">
                동작을 빠르게 맞출수록 정답률이 올라갑니다~!
              </div>
              <NavLink
                to="/Speed"
                className="mt-11 px-10 py-3 text-[20px] font-bold text-white transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-400"
              >
                다음
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
