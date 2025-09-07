import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../config";
import { getToken, removeToken } from "../utils/authStorage";

export default function UserNav() {
  const [selected, setSelected] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoverUserMenu, setHoverUserMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

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
  const handleClick = (menu) => {
    setSelected(menu);
    if (menu === "학습") navigate("/Classroom_Easy");
    if (menu === "복습") navigate("/adminnogroup");
    if (menu === "마이페이지") navigate("/mypage");
  };

  const menus = ["학습", "복습", "마이페이지"];
  const subMenus = ["초급", "중급", "고급"];
  const userMenuItems = [
    "프로필 설정",
    "수업 참여하기",
    "SONSU CLASS",
    "로그아웃",
  ];

  const subMenuColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  const handleSubClick = (sub) => {
    setSelected(sub);
    if (sub === "초급") navigate("/Classroom/easy");
    if (sub === "중급") navigate("/Classroom/normal");
    if (sub === "고급") navigate("/Classroom/hard");
  };

  const handleUserMenuClick = async (item) => {
    if (item === "로그아웃") {
      const confirmLogout = window.confirm("정말 로그아웃 하시겠습니까?");
      if (!confirmLogout) return;

      try {
        const token = getToken();
        const config = token
          ? {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          : { withCredentials: true };

        await axios.post(`${API_URL}/logout`, {}, config);
        console.log("로그아웃 요청 성공");
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      } finally {
        removeToken(); // 토큰 삭제
        setUserInfo(null); // 상태 초기화
        navigate("/"); // 홈 이동
      }
    } else {
      console.log(item + " 클릭됨");
      // 나머지 메뉴 클릭 처리
    }
  };

  return (
    <div className="flex flex-col w-[16%] mx-14 relative overflow-visible">
      <div className="flex flex-col">
        <img
          src="/assets/images/logo.png"
          alt="group"
          className="flex w-[100px]"
        />

        {menus.map((menu) => (
          <div key={menu} className="flex flex-col">
            {menu === "학습" ? (
              <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <div
                  className={`flex my-5 cursor-pointer ${
                    selected === menu ? "text-white text-[23px]" : "text-[#333]"
                  } text-[20px] font-medium`}
                  onClick={() => handleClick(menu)}
                >
                  {menu}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isHover ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {subMenus.map((sub) => (
                    <div
                      key={sub}
                      onClick={() => handleSubClick(sub)}
                      className="ml-5 my-4 text-[18px] cursor-pointer transition-colors duration-200"
                      style={{
                        color:
                          selected === sub ? subMenuColors[sub] : "#666666",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = subMenuColors[sub])
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          selected === sub ? subMenuColors[sub] : "#666666")
                      }
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={`flex my-5 cursor-pointer ${
                  selected === menu ? "text-white text-[23px]" : "text-[#333]"
                } text-[20px] font-medium`}
                onClick={() => handleClick(menu)}
              >
                {menu}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User 아이콘 및 말풍선 메뉴 */}
      <div className="flex items-end h-full pb-3 relative">
        <div
          onMouseEnter={() => setHoverUserMenu(true)}
          onMouseLeave={() => setHoverUserMenu(false)}
          className="relative"
        >
          <FaUserCircle
            size={53}
            className="text-[#555552] rounded-3xl cursor-pointer z-50 relative"
            onClick={() => setShowUserMenu((prev) => !prev)}
          />

          {(showUserMenu || hoverUserMenu) && (
            <div className="absolute bottom-9 left-6 w-52 bg-white shadow-lg rounded-3xl px-4 pb-5 pt-3 flex flex-col z-40">
              <div className="flex justify-center my-3 text-[17px] text-[#555] items-end fontRegular">
                <div className="text-[#FFCA1F] fontSB text-[20px] mr-1">
                  {userInfo?.username ? userInfo?.username : "undefined"}
                </div>
                님, 안녕하세요!
              </div>
              {userMenuItems.map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg text-[#000] font-thin"
                  onClick={() => handleUserMenuClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
