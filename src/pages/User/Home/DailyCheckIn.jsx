import React, { useState, useEffect, useCallback } from "react";
import { API_URL } from "../../../config";
import { getToken } from "../../../utils/authStorage";

const DailyCheckIn = () => {
  const [attendedDates, setAttendedDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const fetchAttendanceData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/attend`, {
        method: "GET",
        credentials: "include", // withCredentials와 동일
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const attendedMap = {};

      data.forEach((item) => {
        const dateObj = new Date(item.attend_date);
        // KST 기준 날짜 추출
        const kstOffset = 9 * 60 * 60 * 1000;
        const localDate = new Date(dateObj.getTime() + kstOffset);
        const dateString = localDate.toISOString().split("T")[0];
        attendedMap[dateString] = true;
      });

      setAttendedDates(attendedMap);
    } catch (error) {
      console.error("출석 데이터를 불러오는 중 오류 발생:", error);
      setError("출석 데이터를 불러오는데 실패했습니다.");
      // 오류 시 빈 객체로 설정
      setAttendedDates({});
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  const handleNavigateToAttendance = () => {
    console.log("출석 체크 페이지로 이동");
    window.location.href = "/mypage";
  };

  if (loading) {
    return (
      <div className="w-[400px]">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">출석 데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[400px]">
      {/* 상단 타이틀 */}
      <div className="flex justify-between items-center">
        <p className="text-[20px] font-semibold">오늘의 출석</p>
      </div>

      {/* 에러 상태 */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          {error}
          <button
            onClick={fetchAttendanceData}
            className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          >
            다시 시도
          </button>
        </div>
      )}

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
                <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center">
                  {/* <span className="text-white text-xs font-bold">✓</span> */}
                  <img src="/assets/images/logo.png" alt="" />
                </div>
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
