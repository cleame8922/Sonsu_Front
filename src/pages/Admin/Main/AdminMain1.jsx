import React from "react";

export default function AdminMain1() {
  return (
    <div className="h-screen bg-gradient-to-b from-[#EAF3FF] to-white relative overflow-hidden">
      <div className="flex items-center py-12 px-40">
        <img src="/images/logo.png" className="w-20" alt="" />
        <div className="text-[25px] font-black text-[#222]">SONSU</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" className="w-20" alt="" />
          <div className="text-[32px] font-bold text-[#1974F3]">
            SONSU CLASS
          </div>
        </div>
        <div className="mt-10 text-[50px] whitespace-pre-line text-center font-bold">
          강사와 관리자를 위한 프리미엄 기능,{`\n`}이제 한곳에서!
        </div>
        <div className="mt-8 text-[24px] ">
          효율적인 수어 교육에 필요한 모든 도구를 제공합니다.
        </div>
        <div className="bg-white text-[24px] px-8 py-2 rounded-full shadow mt-20">
          가입하기
        </div>
      </div>
      {/* <img
        src="/images/Admin/Main/AdminLogo.png"
        className="w-[900px] opacity-30 relative bottom-[300px] left-[1400px]"
        alt=""
      /> */}
    </div>
  );
}
