import React, { useState } from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full mt-2">
      <p className="text-sm font-medium mb-1">진도율 {progress}%</p>
      <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
        <div
          className="h-full bg-green-500 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const ContinueLearning = () => {
  const currentLevel = "초급";

  // API 연결 대신 더미 데이터 사용
  const [nextLesson] = useState({
    lessonCategory_id: 1,
    word: "안녕하세요",
    animation_path: "", // "" → 비디오 없는 경우
  });
  const [progress] = useState(40); // % 값

  return (
    <div className="my-12 w-[70%]">
      {/* 타이틀 */}
      <div className="flex justify-between items-center">
        <p className="text-[20px] fontSB">이어서 학습하기</p>
      </div>

      {/* 컨텐츠 */}
      <div className="flex justify-around mt-6">
        {/* 왼쪽 (이미지/영상) */}
        <div className="w-[128px] h-[174px] bg-[#CEE9C4] rounded-2xl flex items-center justify-center overflow-hidden">
          {nextLesson.animation_path ? (
            <video
              src={nextLesson.animation_path}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/assets/images/sonsuModel.png"
              alt="lesson"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* 오른쪽 (정보) */}
        <div className="flex flex-col flex-1 pl-8 justify-between py-4">
          <div>
            <p className="text-[20px] fontEB">
              Part {nextLesson.lessonCategory_id}. {nextLesson.word}
            </p>
            <p className="text-[18px] fontLight mt-1">{currentLevel}</p>
          </div>

          {/* 진도율 */}
          <ProgressBar progress={progress} />

          {/* 버튼 */}
          <div className="flex justify-center mt-3">
            <button className="bg-[#F7EABF] py-2 rounded-full shadow-md w-[60%] text-sm fontMedium">
              배움터 바로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;
