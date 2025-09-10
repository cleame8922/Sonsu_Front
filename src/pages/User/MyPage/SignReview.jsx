import React, { useState, useEffect, useRef } from "react";

export default function SignReview() {
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
      <p className="fontSB text-[24px] ">오답 수어 다시보기</p>
      <div className="fontSB text-[12px] text-[#555] mt-3">
        <p>저장한 수어로 언제든지 복습하고,</p>
        <p>학습한 내용을 되돌아보세요.</p>
      </div>

      <div className="flex justify-end -mt-4">
        <img
          src="/assets/images/MyPage/bookmark.png"
          alt=""
          className="w-[40%] opacity-80"
        />
      </div>
    </div>
  );
}
