import { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../../config";
import InfoModal from "../../../components/InfoModal";
import { getToken } from "../../../utils/authStorage";

const WeeklyRanking = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userRankData, setUserRankData] = useState([]);
  const [myUsername, setMyUsername] = useState("");

  useEffect(() => {
    const token = getToken();
    let myUsername = "";
    if (token) {
      const decoded = jwtDecode(token);
      const myUsername = decoded.username;
      setMyUsername(myUsername);
    }

    const fetchRanking = async () => {
      try {
        const response = await axios.get(`${API_URL}/mypage/ranking`);
        const data = response.data;

        const maxPoints = Math.max(...data.map((user) => user.week_points));

        const top3 = data.slice(0, 3).map((user, index) => ({
          rank: index + 1,
          name: user.username,
          nickname: "",
          progress: user.week_points,
          progressRate: (user.week_points / maxPoints) * 100,
          isCurrentUser: user.username === myUsername, // 여기서 myUsername 사용
        }));

        // 현재 로그인 유저가 top3에 없으면 따로 표시
        const isInTop3 = top3.some((u) => u.name === myUsername);
        if (!isInTop3) {
          const currentUserData = data.find((u) => u.username === myUsername);
          if (currentUserData) {
            top3.push({
              rank: data.findIndex((u) => u.username === myUsername) + 1,
              name: currentUserData.username,
              nickname: "",
              progress: currentUserData.week_points,
              progressRate: (currentUserData.week_points / maxPoints) * 100,
              isCurrentUser: true,
            });
          }
        }

        setUserRankData(top3);
      } catch (error) {
        console.error("랭킹 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchRanking();
  }, [myUsername]);

  return (
    <div className="w-[50%]">
      <div className="flex justify-between mt-3 mb-3">
        <h2 className="text-lg font-bold">주간 랭킹</h2>
        <button onClick={() => setModalVisible(true)}>
          <FiAlertCircle size={21} className="text-gray-500" />
        </button>
      </div>

      {userRankData.map((user, index) => (
        <div
          key={index}
          className={`flex items-center px-6 py-2.5 border-b border-gray-300 transition ${
            user.isCurrentUser
              ? "bg-[#FFEEB8] font-bold text-black rounded-lg shadow-md"
              : ""
          }`}
        >
          <div className="flex items-baseline w-1/2 space-x-2">
            <span
              className={`text-2xl font-bold drop-shadow ${
                user.rank === 1 ? "text-yellow-500" : "text-black"
              }`}
            >
              {user.rank}
            </span>
            <span className={`text-lg text-gray-800`}>{user.name}</span>
            <span className="text-xs text-gray-500">{user.nickname}</span>
            <span className="text-xs">{user.progress}점</span>
          </div>
          <div className="mt-2 w-full">
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden shadow">
              <div
                className={`h-full ${
                  user.isCurrentUser ? "bg-yellow-500" : "bg-yellow-400"
                } rounded`}
                style={{ width: `${user.progressRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}

      <InfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="주간랭킹"
        content={
          "사용자의 학습 점수를 통해 랭킹을 결정합니다.\n점수를 높여 더 좋은 랭킹을 달성하세요!"
        }
      />
    </div>
  );
};

export default WeeklyRanking;
