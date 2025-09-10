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
        if (!token) return;

        const response = await axios.get(`${API_URL}/login/success`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.data) setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error.response?.data);
        if (error.response?.status === 401) navigate("/login");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const menus = ["학습", "복습", "마이페이지"];
  const subMenus = {
    학습: ["초급", "중급", "고급"],
    복습: ["OX 퀴즈", "스피드 게임"],
  };
  const subMenuColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
    "OX 퀴즈": "#fff",
    "스피드 게임": "#fff",
  };

  const handleClick = (menu) => {
    setSelected(menu);
    if (menu === "학습") navigate("/Classroom_Easy");
    // if (menu === "복습") navigate("/Review");
    if (menu === "마이페이지") navigate("/mypage");
  };

  const handleSubClick = (sub) => {
    setSelected(sub);
    if (sub === "초급") navigate("/Classroom/easy");
    if (sub === "중급") navigate("/Classroom/normal");
    if (sub === "고급") navigate("/Classroom/hard");
    if (sub === "OX 퀴즈") navigate("/OX");
    if (sub === "스피드 게임") navigate("/speed/info");
  };

  const userMenuItems = ["프로필 설정", "수업 참여하기", "SONSU CLASS", "로그아웃"];

  const handleUserMenuClick = async (item) => {
    if (item === "로그아웃") {
      if (!window.confirm("정말 로그아웃 하시겠습니까?")) return;

      try {
        const token = getToken();
        await axios.post(
          `${API_URL}/logout`,
          {},
          token
            ? { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
            : { withCredentials: true }
        );
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      } finally {
        removeToken();
        setUserInfo(null);
        navigate("/");
      }
    } else if (item === "SONSU CLASS") {
      navigate("/admin/ClassList");
    } else {
      console.log(item + " 클릭됨");
    }
  };


  return (
    <div className="flex flex-col w-[16%] mx-14 relative overflow-visible">
      <div className="flex flex-col">
        <img  src="/assets/images/logo.png" alt="logo" className="w-[100px] cursor-pointer" onClick={() => navigate("/")} />

        {menus.map((menu) => (
          <div key={menu} className="flex flex-col">
            <div
              onMouseEnter={() => (menu === "학습" || menu === "복습" ? setIsHover(menu) : null)}
              onMouseLeave={() => (menu === "학습" || menu === "복습" ? setIsHover(false) : null)}
            >
              <div
                className={`flex my-5 cursor-pointer ${
                  selected === menu ? "text-white text-[23px]" : "text-[#333]"
                } text-[20px] font-medium`}
                onClick={() => handleClick(menu)}
              >
                {menu}
              </div>

              {/* 하위 메뉴 */}
              {(menu === "학습" || menu === "복습") && (
                <div className={`overflow-hidden transition-all duration-300 ${isHover === menu ? "max-h-40" : "max-h-0"}`}>
                  {subMenus[menu].map((sub) => (
                    <div
                      key={sub}
                      onClick={() => handleSubClick(sub)}
                      className="ml-5 my-4 text-[18px] cursor-pointer transition-colors duration-200"
                      style={{ color: selected === sub ? subMenuColors[sub] : "#666666" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = subMenuColors[sub])}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = selected === sub ? subMenuColors[sub] : "#666666")
                      }
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* User 아이콘 및 메뉴 */}
      <div className="relative flex items-end h-full pb-3">
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
            <div className="absolute z-40 flex flex-col px-4 pt-3 pb-5 bg-white shadow-lg bottom-9 left-6 w-52 rounded-3xl">
              <div className="flex justify-center my-3 text-[17px] text-[#555] items-end fontRegular">
                <div className="text-[#FFCA1F] fontSB text-[20px] mr-1">
                  {userInfo?.username || "undefined"}
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
