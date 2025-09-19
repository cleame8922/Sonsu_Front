import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// 요일별학습한단어
const data = [
  { day: "월", value: 3 },
  { day: "화", value: 5 },
  { day: "수", value: 2 },
  { day: "목", value: 6 },
  { day: "금", value: 4 },
  { day: "토", value: 1 },
  { day: "일", value: 7 },
];

// Tooltip 커스텀 컴포넌트
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white shadow-md rounded-lg p-2 border"
        style={{ fontSize: "13px", color: "#333" }}
      >
        <p className="font-semibold">{label}요일</p>
        <p>학습 단어: {payload[0].value}개</p>
      </div>
    );
  }
  return null;
};

export default function WeeklyLearnedWords() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[#333333] text-[15px] fontMedium">
        요일별 학습한 단어 개수
      </p>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            fill="#DEE6F1"
            radius={[30, 30, 0, 0]}
            activeBar={false} // hover 효과 제거
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
