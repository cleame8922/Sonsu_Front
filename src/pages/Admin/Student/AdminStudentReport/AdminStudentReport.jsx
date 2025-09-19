import React from "react";
import WeeklyLearnedWords from "./WeeklyLearnedWords";
import AdminAttendance from "./AdminAttendance";
import WeeklyReport from "./WeeklyReport";

export default function AdminStudentReport() {
  return (
    <div className="flex space-x-12">
      {/* 왼 */}
      <div className="w-1/2 h-full flex flex-col jusitfy-center space-y-8">
        {/* 요일별 학습한 단어 개수 */}
        <WeeklyLearnedWords />
        {/* 출석 */}
        <AdminAttendance />
      </div>

      {/* 오 */}
      <div className="w-1/2">
        <WeeklyReport />
      </div>
    </div>
  );
}
