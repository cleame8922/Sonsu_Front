import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import AdminTitle from "../../../components/AdminTitle";
import AdminNav from "../../../components/AdminNav";

export default function Curri_Part() {
  const { code } = useParams();
  const { state } = useLocation();
  const name = state?.name;
  const desc = state?.desc;

  const [activeTab, setActiveTab] = useState("초급");

  // 탭별 콘텐츠
  const renderContent = () => {
    switch (activeTab) {
      case "초급":
        return <p className="text-[16px] text-[#333]">초</p>;
      case "중급":
        return <p className="text-[16px] text-[#333]">중</p>;
      case "고급":
        return <p className="text-[16px] text-[#333]">고</p>;
      default:
        return null;
    }
  };

  // 각 탭별 색상 매핑
  const tabColors = {
    초급: "#39B360",
    중급: "#487BCD",
    고급: "#FF9381",
  };

  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />
      <div className="flex w-full">
        <AdminNav />
        <div className="flex flex-col mr-10 w-full rounded-3xl bg-[#fafafa] h-[850px] px-10 py-8">
          <div>
            <p className="font-semibold text-[25px]">{name}</p>
            <div className="flex justify-between items-center">
              <div className="text-[20px] font-semibold text-[#777]">
                #{code}
              </div>
              <button className="bg-[#5A9CD0] text-white text-[18px] rounded-full px-4 py-1 font-semibold">
                수정완료
              </button>
            </div>
          </div>

          <div className="flex w-full justify-evenly mt-8">
            {/* SONSU */}
            <div className="w-[45%] bg-[#D7EDD5] h-[650px] rounded-[40px] p-8">
              <div className="flex items-center justify-between">
                <p className="text-[#DBBF63] text-[18px] font-black">SONSU</p>

                {/* 탭 버튼 */}
                <div className="flex items-center gap-2">
                  {["초급", "중급", "고급"].map((tab, index, arr) => (
                    <div key={tab} className="flex items-center">
                      <button
                        onClick={() => setActiveTab(tab)}
                        className={`font-semibold text-[16px] transition-all px-3 py-1 rounded-full`}
                        style={{
                          color:
                            activeTab === tab ? tabColors[tab] : "text-[#333]",
                        }}
                      >
                        {tab}
                      </button>
                      {/* 구분자 | (마지막 요소 제외) */}
                      {index < arr.length - 1 && (
                        <span className="mx-2 text-[#777]">|</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 탭 내용 */}
              <div className="mt-6">{renderContent()}</div>
            </div>

            {/* 커스텀 */}
            <div className="w-[45%] bg-[#DEE6F1] h-[650px] rounded-[40px] p-8">
              <p className="text-[#333] text-[18px] font-black">{name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
