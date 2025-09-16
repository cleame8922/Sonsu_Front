import React, { useState, useEffect } from "react";
import UserNav from "../../../components/UserNav";
import UserTitle from "../../../components/UserTitle";
import DailyCheckIn from "./DailyCheckIn";
import ContinueLearning from "./ContinueLearning";
import axios from "axios";
import { getToken } from "../../../utils/authStorage";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

export default function Home() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = getToken();
        if (!token) return;

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
        if (error.response?.status === 401) {
          console.log("토큰이 만료되었거나 유효하지 않습니다.");
          // navigate("/login");
        }
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-[#D2D2D2]">
      <UserTitle />

      <div className="flex w-full">
        <UserNav />

        <div className="flex flex-col items-center w-full lg:mr-10 rounded-3xl bg-[#fafafa] min-h-[850px] p-6">
          <div className="flex flex-col items-center h-full gap-10 lg:flex-row lg:items-center">
            {/* 왼쪽 영역 */}
            <div className="flex flex-col items-center justify-center w-full mr-12 lg:w-1/2">
              <img
                src="/assets/images/sonsu.png"
                alt=""
                className="w-[150px] sm:w-[180px] lg:w-[220px]"
              />
              <p className="text-[22px] sm:text-[26px] lg:text-[32px] fontMedium mt-8 text-center">
                안녕하세요, {userInfo?.username ? userInfo.username : "사용자"} 님!
              </p>
            </div>

            {/* 구분선 */}
            <div className="hidden lg:block w-[1px] h-[400px] bg-[#D9D9D9]"></div>
            <div className="lg:hidden w-full h-[1px] bg-[#D9D9D9]"></div>

            {/* 오른쪽 영역 */}
            <div className="flex flex-col justify-between w-full ml-12 lg:w-1/2">
              <DailyCheckIn />
              <ContinueLearning />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
