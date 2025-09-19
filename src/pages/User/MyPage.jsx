import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPage() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get("http://localhost:5000/mypage/ranking", {
          withCredentials: true,
        });
        setRanking(response.data); // response.data 사용
      } catch (err) {
        console.error("랭킹 불러오기 실패", err);
      }
    };
    fetchRanking();
  }, []);

  // 최대 점수를 기준으로 퍼센트 계산
  const maxPoints = ranking.length ? Math.max(...ranking.map(r => r.week_points)) : 0;

  return (
    <div className="bg-gray-100 min-h-screen py-10 bg-gradient-to-b from-[#fffdef]">
      <div className="container mx-auto px-4 w-[600px]">
        {/* 학습 랭킹 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">이번 주 랭킹</h3>
          <ul>
            {ranking.map((user, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-none"
              >
                <div className="flex items-center">
                  <span className="text-lg font-bold text-yellow-500 mr-4">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center w-[300px]">
                  <p className="mr-4">{user.week_points}점</p>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-yellow-500 h-4 rounded-full"
                      style={{ width: `${(user.week_points / maxPoints) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
