import React, { useState, useEffect, useRef } from "react";

export default function WeeklyReport({ isActive, setIsActive }) {
  //   const [isActive, setIsActive] = useState(false);
  //   const ref = useRef(null);

  // 바깥 클릭 감지
  //   useEffect(() => {
  //     const handleClickOutside = (event) => {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         setIsActive(false);
  //       }
  //     };
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  //   }, [setIsActive]);

  return (
    <div className="relative z-50">
      <div
        onClick={() => setIsActive(!isActive)}
        className={`bg-[#FFEEB8] rounded-[20px] pl-8 pt-6 w-full shadow-lg h-[200px]
                   transform transition duration-300 ease-in-out
                   cursor-pointer
                   ${
                     isActive ? "scale-105 shadow-2xl" : "scale-100 shadow-lg"
                   }`}
      >
        <p className="fontSB text-[24px] ">주간 리포트</p>
        <div className="fontSB text-[13px] text-[#555] mt-3">
          <p>AI와 함께</p>
          <p>한 주 간의 학습 상황을 분석해요</p>
        </div>

        <div className="flex justify-end -mt-6">
          <img
            src="/assets/images/MyPage/report.png"
            alt=""
            className="w-[45%] opacity-80"
          />
        </div>
      </div>
      {isActive && (
        <div className="absolute -left-10 top-0 mt-0 -translate-x-full w-[400px] p-6 bg-white rounded-xl shadow-2xl z-50 transform transition duration-300 ease-in-out">
          {/* 안내 메시지 */}
          <div className="mt-3 text-xs text-gray-500 text-center">
            💡 출석은 하루에 최소 1개 이상의 학습을 완료해야만 인정됩니다.
          </div>
        </div>
      )}
    </div>
  );
}
