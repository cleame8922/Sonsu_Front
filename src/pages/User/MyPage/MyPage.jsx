import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";
import axios from "axios";
import { API_URL } from "../../../config";
import { getToken } from "../../../utils/authStorage";
import WeeklyRank from "./WeeklyRank";
import Review from "./Review";
import AttendanceCheck from "./AttendanceCheck";
import WeeklyReport from "./WeeklyReport";
import SignReview from "./SignReview";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  // 사용자 정보
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = getToken();

        if (!token) {
          console.log("토큰이 없습니다.");
          return;
        }

        const response = await axios.get(`${API_URL}/login/success`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.data) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        console.error("에러 상세:", error.response?.data);

        // 토큰이 만료되었거나 유효하지 않은 경우
        if (error.response?.status === 401) {
          console.log("토큰이 만료되었거나 유효하지 않습니다.");
          // 필요시 로그인 페이지로 리다이렉트
          navigate("/login");
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-[#6CC197]">
      <UserTitle />
      <div className="flex w-full">
        <UserNav />
        <div className="flex flex-col mr-10 w-full rounded-[40px] bg-[#f5f5f5] shadow-xl h-[850px] px-32 py-12 overflow-y-auto">
          <div className="flex w-full justify-ceneter items-center h-full">
            {/* 왼 */}
            <div className="w-[74%]">
              {/* 프로필 */}
              <div className="flex items-center w-fit">
                <div className="w-[90px] h-[90px] rounded-full bg-white overflow-hidden flex items-center justify-center shadow-md">
                  <img
                    src="/assets/images/sonsu.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="ml-6">
                  <p className="fontSB text-[12px]">상위 __%</p>
                  <p className="fontSB text-[28px]">
                    {userInfo?.username ? userInfo?.username : "undefined"}
                  </p>
                </div>
              </div>
              {/* 주간랭킹 */}
              <div className="mt-8">
                <WeeklyRank />
              </div>

              {/* 오답 수어 다시보기 */}
              <div className="mt-8">
                <Review />
              </div>
            </div>

            {/* 오 */}
            <div className="w-[26%] space-y-10">
              {/* 카드 3개 */}

              <AttendanceCheck />
              <WeeklyReport />
              <SignReview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
