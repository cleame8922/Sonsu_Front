import { IoIosArrowDown } from "react-icons/io";
import { FaCheck, FaHourglassHalf } from "react-icons/fa";

export default function Main() {
  // 메인3
  const levels = [
    {
      title: "기초 단계",
      subtitle: "수어 첫걸음",
      description: "손 모양과 기본 단어부터 시작하는 기초 학습.",
      color: "text-blue-500", // 기초 단계 색상 파란색
    },
    {
      title: "중급 단계",
      subtitle: "일상 소통",
      description: "다양한 상황에서 사용하는 일상 표현 익히기.",
      color: "text-yellow-500", // 중급 단계 색상 노란색
    },
    {
      title: "고급 단계",
      subtitle: "실전 활용",
      description: "전문적이고 복잡한 수어 표현을 완벽하게!",
      color: "text-red-500", // 고급 단계 색상 빨간색
    },
  ];
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#fffdef]">
      {/* 메인1 - 안녕하세요 */}
      <div className="flex justify-center items-centers h-full">
        <div className="text-center pt-24">
          <h1 className="text-[70px] font-bold animate-bounce">안녕하세요!</h1>
          <img
            src="/images/hoyeon_hi.png"
            alt="안녕하세요 이미지"
            className="w-[600px]"
          />
          <div className="text-center flex justify-center mt-[100px] animate-ping ">
            <IoIosArrowDown size={40} />
          </div>
        </div>
      </div>
      {/* 메인2 - 손수잇다 소개*/}
      <div className="py-[300px] bg-[#f9f6e0] flex justify-center text-[40px] font-bold leading-relaxed">
        <span className="animate-pulse">
          손수잇다로 수어 학습을 새롭게 시작하세요!
          <br />
          게임과 퀴즈로 재미있게, 데이터 분석으로 체계적으로.
          <br />
          수어를 배우는 즐거움, 지금 바로 경험해보세요!
        </span>
      </div>
      {/* 메인3 - 학습기능 소개*/}
      <div className="h-full pt-[150px] ">
        <div className="flex w-full justify-evenly">
          <div className="">
            <h1 className="text-[30px] font-extrabold mb-[20px] text-yellow-500	">
              학습
            </h1>
            <h3 className="text-[50px] font-semibold">
              손수잇다, <br />
              기초부터 실전까지
              <br />
              수어 학습을 완벽하게!
            </h3>
          </div>
          <img src="/images/Vv.png" alt="ㅎㅇ" className="w-[400px] mx-12" />
        </div>
        <div className="flex flex-col items-center mt-16 py-16 bg-gradient-to-b from-[#fffdef] to-[#f9f6e0] ">
          <h1 className="text-3xl font-extrabold mb-8">학습 레벨</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {levels.map((level, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <h2 className={`text-[30px] font-extrabold ${level.color}`}>
                  {level.title}
                </h2>
                <h3 className="text-xl font-semibold mt-2">{level.subtitle}</h3>
                <p className="text-gray-700 mt-4">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 메인4 - 복습기능 소개*/}
      <div className="h-full pt-[100px] ">
        <div className="flex w-full justify-evenly">
          <div className="">
            <h1 className="text-[30px] font-extrabold mb-[20px] text-yellow-500	">
              복습
            </h1>
            <h3 className="text-[50px] font-semibold">
              OX 퀴즈와 스피드 게임으로
              <br />
              재미있게 복습하세요!
            </h3>
          </div>
          <img src="/images/stop.png" alt="ㅎㅇ" className="w-[400px] mx-12" />
        </div>
        <div className="flex justify-evenly mt-20">
          <div className="flex justify-center gap-16">
            {/* OX 퀴즈 */}
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 w-[600px] hover:scale-105 transition-transform bg-gradient-to-b from-[#fffdef] to-[#f9f6e0]">
              <div className="text-yellow-500 text-6xl mb-6">
                <FaCheck />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                OX 퀴즈
              </h3>
              <p className="text-center text-lg text-gray-700 mb-6">
                OX 퀴즈로 간단하고 재미있게 수어 복습!
              </p>
              <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg transition-colors hover:bg-yellow-400">
                시작하기
              </button>
            </div>

            {/* 스피드 게임 */}
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 w-[600px] hover:scale-105 transition-transform bg-gradient-to-b from-[#fffdef] to-[#f9f6e0]">
              <div className="text-blue-500 text-6xl mb-6">
                <FaHourglassHalf />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                스피드 게임
              </h3>
              <p className="text-center text-lg text-gray-700 mb-6">
                실시간 게임으로 빠르게 수어 실력을 향상시키세요!
              </p>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg transition-colors hover:bg-blue-400">
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 메인5 - 데이터 관리 기능 소개*/}
      <div className="h-full pt-[100px] bg-gray-50">
        <div className="flex w-full justify-evenly">
          <img src="/images/report.png" alt="ㅎㅇ" className="w-[400px]" />

          <div className="text-right">
            <h1 className="text-[30px] font-extrabold mb-[20px] text-yellow-500	">
              학습 리포트
            </h1>
            <h3 className="text-[50px] font-semibold">
              학습 데이터를 체계적으로 관리하고, <br />
              AI 분석을 통해 진척도를 확인하세요!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
