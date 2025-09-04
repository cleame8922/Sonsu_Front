import React from "react";
import AdminMain1 from "./AdminMain1";
import AdminMain2 from "./AdminMain2";
import AdminMain3 from "./AdminMain3";
import AdminFooter from "./AdminFooter";

export default function AdminMain() {
  return (
    <div className="w-screen bg-[#5A9CD0]">
      <AdminMain1 />
      <AdminMain2 />
      <AdminMain3 />
      <AdminFooter />
    </div>
  );
}
