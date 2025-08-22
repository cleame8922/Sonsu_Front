import React from "react";

export default function Main5() {
  return (
    <div className="h-screen bg-gradient-to-b from-white via-[#EAF3FF] to-white">
      <div className="absolute">
        <img
          src="/images/logo.png"
          className="w-[900px] opacity-30 relative top-[400px] left-[1400px]"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-10" />
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-[36px] text-[#1974F3]">SONSU CLASS</div>
        <div className="flex flex-col text-center text-[40px] font-bold mt-10">
          <div>손수클래스로 더 똑똑하게, 자유롭게</div>
          <div>수어를 가르치세요.</div>
        </div>
        <div className="text-[20px] whitespace-pre-line text-center mt-20">
          수강생 등록·삭제, 성적 관리, 강의 운영까지,{`\n`}수어 교육을 더 쉽고
          효율적으로 만들어주는 통합 도구를 경험하세요.
        </div>
        <div className="border bg-white px-8 py-2 text-[30px] font-bold mt-20 rounded-full">
          시작하기
        </div>
      </div>
    </div>
  );
}
