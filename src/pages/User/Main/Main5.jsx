import React from "react";

export default function Main5() {
  return (
    <div className="relative h-screen">
      {/* 중앙 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff9e6] via-[#FFE695] to-[#FFF7DF] z-0" />

      {/* 로고 이미지 */}
      <img
        src="./assets/images/logo.png"
        className="w-[450px] opacity-30 absolute top-[500px] left-[1200px] -z-0"
        alt=""
      />

      {/* 글자 영역 */}
      <div className="relative flex flex-col items-center justify-center h-screen">
        <div className="text-[36px] fontSB text-[#5A9CD0]">SONSU CLASS</div>

        <div className="flex flex-col text-center text-[45px] font-bold mt-10">
          <div>손수클래스로 더 똑똑하게, 자유롭게</div>
          <div>수어를 가르치세요.</div>
        </div>

        <div className="text-[40px] whitespace-pre-line text-center mt-20">
          프리미엄 요금제에 가입하면 <span className="text-[#5A9CD0]">강사와 관리자를 위한 전용 기능</span>이 열립니다.{`\n`}
          수강생 추가/삭제, 성적 조회, 클래스별 강의 관리까지,  {`\n`}
          효율적인 수어 교육을 위한 모든 도구를 한곳에 모았습니다.{`\n`}
        </div>

        <div className="bg-gradient-to-b from-[#fff8df] via-[#FFF3CC] to-[#fff8df] px-12 py-2 text-[20px] font-bold mt-20 shadow-xl rounded-full">
          바로가기
        </div>
      </div>
    </div>
  );
}
