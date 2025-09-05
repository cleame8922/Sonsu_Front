import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function AdminNav() {
  const [selected, setSelected] = useState("커리큘럼 관리");
  const navigate = useNavigate();

  const handleClick = (menu) => {
    setSelected(menu);
    if (menu === "커리큘럼 관리") {
      navigate("/CurriMain"); // 원하는 경로로 이동
    }
    if (menu === "수강그룹 관리") {
      navigate("/adminnogroup"); // 원하는 경로로 이동
    }
    if (menu === "수강생 관리") {
      navigate("/adminnogroup"); // 원하는 경로로 이동
    }
  };

  const menus = ["커리큘럼 관리", "수강그룹 관리", "수강생 관리"];

  return (
    <div className="flex flex-col w-[20%] mx-14 ">
      <div className="flex flex-col my-5">
        <img
          src="/assets/images/Admin/Member/group.png"
          alt="group"
          className="flex my-5 w-[120px]"
        />

        {menus.map((menu) => (
          <div
            key={menu}
            className={`flex my-5 fontBold cursor-pointer ${
              selected === menu
                ? "text-white text-[23px]"
                : "text-[#333] text-[20px]"
            }`}
            onClick={() => handleClick(menu)}
          >
            {menu}
          </div>
        ))}
      </div>

      <div className="flex items-end h-full pb-3">
        <FaUserCircle size={53} className="text-[#555552] rounded-3xl" />
      </div>
    </div>
  );
}
