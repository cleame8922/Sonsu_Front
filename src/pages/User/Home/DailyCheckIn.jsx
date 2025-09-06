import React, { useState } from "react";

const DailyCheckIn = () => {
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const getCurrentWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        date: date.getDate(),
        day: weekDays[date.getDay()],
        fullDate: date.toISOString().split("T")[0],
      };
    });
  };

  const [week] = useState(getCurrentWeek);

  // 출석 데이터는 나중에 API 연결할 때 사용
  const attendedDates = {
    // "2025-09-06": true, // 이런 식으로 표시됨
  };

  return (
    <div className="w-[400px]">
      {/* 상단 타이틀 */}
      <div className="flex justify-between items-center">
        <p className="text-[20px] fontSB">오늘의 출석</p>
      </div>

      {/* 캘린더 */}
      <div className="flex justify-around items-center h-[100px] bg-white rounded-2xl mt-6 px-3 py-4 shadow-md ml-[-8px]">
        {week.map(({ date, day, fullDate }, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="text-[14px] font-bold text-black mb-2">{day}</p>
            <div
              className={`w-[35px] h-[35px] flex items-center justify-center rounded-full ${
                attendedDates[fullDate] ? "bg-[#FFEB99]" : ""
              }`}
            >
              {attendedDates[fullDate] ? (
                <img
                  src="/assets/images/logo.png"
                  alt="출석"
                  className="w-[30px] h-[30px] object-contain"
                />
              ) : (
                <p className="text-[14px] font-bold text-[#333]">{date}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyCheckIn;
