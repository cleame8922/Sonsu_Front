import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import AdminTitle from "../../../components/AdminTitle";
import AdminNav from "../../../components/AdminNav";

export default function ClassList() {
  const classes = [
    { name: "손수잇다", code: "FE101", desc: "클래스설명" },
    { name: "하이롱", code: "RE201", desc: "클래스설명" },
    { name: "안녕안녕", code: "BE101", desc: "클래스설명" },
    { name: "나는호연", code: "DB101", desc: "클래스설명" },
    { name: "드디어개발을하는군아", code: "AL101", desc: "클래스설명" },
    { name: "뿡", code: "PJ301", desc: "클래스설명" },
  ];

  const colors = [
    "#DEE6F1",
    "#F2F3ED",
    "#F1E3D8",
    "#F4EBCE",
    "#DEE8D0",
    "#F0E4F8",
    "#D9D9D9",
    "#DEE6F1",
  ];

  const [sortType, setSortType] = useState("latest");
  const [search, setSearch] = useState("");

  // 클래스별 색상 고정 (처음 렌더링 시에만 랜덤 배정)
  const [colorMap] = useState(() => {
    const map = {};
    classes.forEach((cls) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      map[cls.code] = randomColor;
    });
    return map;
  });

  const filteredClasses = classes
    .filter((cls) => cls.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortType === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />

      <div className="flex w-full">
        <AdminNav />

        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] h-[990px]">
          {/* 상단 탭 + 검색 */}
          <div className="flex flex-col items-end mb-6 mr-10 mt-8">
            {/* 검색창 */}
            <div className="relative w-80 mb-6">
              <input
                type="text"
                placeholder="클래스 검색..."
                className="bg-[#E8E8E8] rounded-full px-10 py-4 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch
                className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600"
                size={23}
              />
            </div>

            {/* 정렬 버튼 */}
            <div className="flex mr-2">
              <button
                className={`px-2 py-2 rounded-lg ${
                  sortType === "latest" ? "font-black" : ""
                }`}
                onClick={() => setSortType("latest")}
              >
                최신순
              </button>
              <button
                className={`px-2 py-2 rounded-lg ${
                  sortType === "name" ? "font-black" : ""
                }`}
                onClick={() => setSortType("name")}
              >
                정렬순
              </button>
            </div>
          </div>

          {/* 클래스 카드 */}
          <div className="flex justify-center overflow-auto mb-10">
            <div className="grid grid-cols-4 gap-10 mt-5">
              {filteredClasses.map((cls) => {
                const bg = colorMap[cls.code]; // 고정된 색상 사용
                return (
                  <div
                    key={cls.code}
                    className="rounded-2xl p-6 shadow-md h-[400px] w-[300px]"
                    style={{ backgroundColor: bg }}
                  >
                    <h2 className="text-xl font-bold mb-2">{cls.name}</h2>
                    <p className="text-sm text-gray-600 mb-1"># {cls.code}</p>
                    <p className="text-gray-700">{cls.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
