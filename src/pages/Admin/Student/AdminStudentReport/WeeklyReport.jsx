import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../../../../config";
import { getToken } from "../../../../utils/authStorage";

export default function WeeklyReport() {
  const [reportData, setReportData] = useState(null);
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      const accessToken = getToken();
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          const response = await fetch(`${API_URL}/mypage/report`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setReportData(data);

          const dayMap = {
            Sunday: "일",
            Monday: "월",
            Tuesday: "화",
            Wednesday: "수",
            Thursday: "목",
            Friday: "금",
            Saturday: "토",
          };

          const fullWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          const chartData = fullWeek.map((day) => {
            const found = data.lessonCount?.find((d) => d.day === day);
            return {
              name: dayMap[day],
              value: found ? found.lesson_count : 0,
            };
          });

          setBarData(chartData);
          break; // 성공했으므로 루프 종료
        } catch (error) {
          if (error.message.includes("429")) {
            const waitTime = Math.pow(2, retryCount) * 1000; // 1초, 2초, 4초
            console.warn(
              `Rate limit! 재시도 중... ${
                retryCount + 1
              }회 (대기: ${waitTime}ms)`
            );
            await new Promise((res) => setTimeout(res, waitTime));
            retryCount++;
          } else {
            console.error("리포트 데이터를 불러오는 중 오류 발생:", error);
            break; // 다른 오류는 반복하지 않음
          }
        }
      }
      setLoading(false);
    };

    fetchReport();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-700 leading-relaxed">
        {reportData?.report || "분석 데이터를 불러오는 중입니다..."}
      </p>
    </div>
  );
}
