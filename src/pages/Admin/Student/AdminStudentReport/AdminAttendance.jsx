import React, { useState, useEffect, useRef } from "react";

export default function AdminAttendance() {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const containerRef = useRef(null);
  const bubbleRef = useRef(null);

  // 현재 달의 출석한 날 수 계산
  const getAttendanceCount = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const attendedDays = attendanceData.filter((attendance) => {
      const attendDate = new Date(attendance.attend_date);
      return (
        attendDate.getMonth() === currentMonth &&
        attendDate.getFullYear() === currentYear &&
        attendance.status === 1
      );
    });

    return attendedDays.length;
  };

  // 현재 달의 일 수 계산
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    return lastDay.getDate();
  };

  // 출석률 계산
  const attendanceCount = getAttendanceCount();
  const totalDays = getDaysInMonth();
  const attendancePercentage =
    totalDays > 0 ? (attendanceCount / totalDays) * 100 : 0;

  useEffect(() => {
    const now = currentDate;
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDayOfMonth.getDay();
    const lastDate = lastDayOfMonth.getDate();

    // 이전 달의 날짜 추가
    const prevMonth = new Date(year, month, 0);
    const prevMonthLastDate = prevMonth.getDate();
    for (let i = startDay; i > 0; i--) {
      days.push({
        date: prevMonthLastDate - i + 1,
        isCurrentMonth: false,
      });
    }

    // 현재 월의 날짜들 추가
    for (let i = 1; i <= lastDate; i++) {
      days.push({ date: i, isCurrentMonth: true });
    }

    // 다음 달 날짜 추가 (42개 맞추기)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
      });
    }

    setDaysInMonth(days);
  }, [currentDate]);

  // 오늘 날짜와 비교하여 강조하는 함수
  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day.date &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear() &&
      day.isCurrentMonth
    );
  };

  // 출석 상태가 있는지 확인하는 함수
  const isAttended = (date) => {
    const formattedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    return attendanceData.some((attendance) => {
      const attendDate = new Date(attendance.attend_date);
      return (
        attendDate.getDate() === formattedDate.getDate() &&
        attendDate.getMonth() === formattedDate.getMonth() &&
        attendDate.getFullYear() === formattedDate.getFullYear() &&
        attendance.status === 1
      );
    });
  };

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  // 이후 달로 이동
  const goToNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  // 요일 배열
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="relative">
      {/* 클릭 시 나오는 말풍선 */}

      <div
        ref={bubbleRef}
        className=" w-full p-6 bg-white rounded-xl shadow-md z-50 transform transition duration-300 ease-in-out max-h-[600px] overflow-y-auto"
      >
        {/* 헤더 */}
        <div className="flex justify-center items-center mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousMonth}
              className="text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ←
            </button>
            <h3 className="fontSB text-[18px] ">
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </h3>
            <button
              onClick={goToNextMonth}
              className="text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              →
            </button>
          </div>
        </div>

        {/* 달력 */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg w-[80%]">
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekdays.map((weekday, index) => (
                <div
                  key={index}
                  className="text-center py-2 font-semibold text-gray-600"
                >
                  {weekday}
                </div>
              ))}
            </div>

            {/* 날짜 */}
            <div className="grid grid-cols-7 gap-1">
              {daysInMonth.map((day, index) => (
                <div
                  key={`${day.date}-${day.isCurrentMonth}-${index}`}
                  className={`relative aspect-square flex items-center justify-center text-sm rounded-lg
                    ${!day.isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                    ${isToday(day) ? "text-blue-500 font-bold" : ""}
                    ${isAttended(day.date) && day.isCurrentMonth ? "" : ""}
                  `}
                >
                  <span>{day.date}</span>
                  {isAttended(day.date) && day.isCurrentMonth && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
                        <img
                          src="/assets/images/logo.png"
                          alt="출석"
                          className="w-8 h-8"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
