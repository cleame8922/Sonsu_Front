import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTitle from "../../../components/AdminTitle";
import AdminNav from "../../../components/AdminNav";

export default function ClassMenu() {
  const { code } = useParams();
  const navigate = useNavigate();

  const menus = [
    {
      title: "강의 커리큘럼",
      img: "/assets/images/Admin/Main/AdminMain2_1.png",
      path: `/admin/Curri_Part/${code}`,
    },
    {
      title: "강의 커리큘럼",
      img: "/assets/images/Admin/Main/AdminMain2_2.png",
      path: `/admin/Curri_Part/${code}`,
    },
    {
      title: "강의 커리큘럼",
      img: "/assets/images/Admin/Main/AdminMain2_3.png",
      path: `/admin/Curri_Part/${code}`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />

      <div className="flex w-full">
        <AdminNav />

        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] h-[990px]">
          <div className="flex items-center justify-center h-full gap-16">
            {menus.map((menu, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center mb-20 
                           transition-transform duration-300 ease-in-out
                           hover:scale-105 hover:brightness-105 p-4 cursor-pointer"
                onClick={() => navigate(menu.path)}
              >
                <img
                  src={menu.img}
                  alt={menu.title}
                  className="w-[400px] rounded-xl"
                />
                <p className="text-[28px] text-[#333] font-semibold mt-4">
                  {menu.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
