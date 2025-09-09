import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { code } = useParams(); // 여기서 code 가져오기

  const menus = [
    { name: "커리큘럼 관리", path: "/admin/ClassList" },
    { name: "수강그룹 관리", path: `/admin/group/${code}` },
    { name: "수강생 관리", path: `/admin/student/${code}` },
  ];

  const [selected, setSelected] = useState("");

  // URL 변경에 따라 selected 업데이트
  useEffect(() => {
    const currentMenu = menus.find((menu) => menu.path === location.pathname);
    setSelected(currentMenu ? currentMenu.name : "");
  }, [location.pathname, code]); // code가 바뀌면 다시 체크

  const handleClick = (menu) => {
    setSelected(menu.name);
    navigate(menu.path);
  };

  return (
    <div className="flex flex-col w-[16%] mx-14 ">
      <div className="flex flex-col my-5">
        <img
          src="/assets/images/Admin/Member/group.png"
          alt="group"
          className="flex w-[120px]"
        />

        {menus.map((menu) => (
          <div
            key={menu.name}
            className={`flex my-5 fontBold cursor-pointer ${
              selected === menu.name
                ? "text-white text-[23px]"
                : "text-[#333] text-[20px]"
            }`}
            onClick={() => handleClick(menu)}
          >
            {menu.name}
          </div>
        ))}
      </div>

      <div className="flex items-end h-full pb-3">
        <FaUserCircle size={53} className="text-[#555552] rounded-3xl" />
      </div>
    </div>
  );
}
