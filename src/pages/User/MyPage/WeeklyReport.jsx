import React, { useState, useEffect, useRef } from "react";

export default function WeeklyReport() {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={ref}
      onClick={() => setIsActive(!isActive)}
      className={`bg-[#FFEEB8] rounded-[20px] pl-8 pt-6 w-full shadow-lg h-[200px]
                 transform transition duration-300 ease-in-out
                 cursor-pointer
                 ${isActive ? "scale-105 shadow-2xl" : "scale-100 shadow-lg"}`}
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
  );
}
