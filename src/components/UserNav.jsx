import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function UserNav() {
  const [selected, setSelected] = useState("");
  const [isHover, setIsHover] = useState(false); // 학습 hover 상태
  const navigate = useNavigate();

  const handleClick = (menu) => {
    setSelected(menu);
    if (menu === "학습") {
      navigate("/Classroom_Easy");
    }
    if (menu === "복습") {
      navigate("/adminnogroup");
    }
    if (menu === "마이페이지") {
      navigate("/mypage");
    }
  };

  const menus = ["학습", "복습", "마이페이지"];
  const subMenus = ["초급", "중급", "고급"];

  // 각 서브메뉴별 색상 매핑
  const subMenuColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  const handleSubClick = (sub) => {
    setSelected(sub);
    // 필요하다면 navigate 추가 가능
  };

  return (
    <div className="flex flex-col w-[16%] mx-14 ">
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
                  className={`flex my-5 cursor-pointer text-[#111] fontMedium text-[20px] ${
                    selected === menu
                      ? "text-white text-[23px]"
                      : "text-[#333] text-[20px]"
                  }`}
                  onClick={() => handleClick(menu)}
                >
                  {menu}
                </div>

                {/* 학습 hover 시 하위 메뉴 표시 */}
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
                className={`flex my-5 cursor-pointer  text-[#111] fontMedium text-[20px] ${
                  selected === menu
                    ? "text-white text-[23px]"
                    : "text-[#333] text-[20px]"
                }`}
                onClick={() => handleClick(menu)}
              >
                {menu}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-end h-full pb-3">
        <FaUserCircle size={53} className="text-[#555552] rounded-3xl" />
      </div>
    </div>
  );
}
