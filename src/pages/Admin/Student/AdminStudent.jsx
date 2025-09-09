import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminTitle from '../../../components/AdminTitle';
import AdminNav from '../../../components/AdminNav';
import { BiEditAlt } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { classes } from '../../../data/classes';

const colors = [
  "#DEE6F1",
  "#F2F3ED",
  "#F1E3D8",
  "#F4EBCE",
  "#DEE8D0",
  "#F0E4F8",
  "#D9D9D9",
];

export default function AdminStudent() {
  const { code } = useParams();
  const cls = classes.find(c => c.code === code);

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // 선택된 학생

  // 그룹 수정용 상태
  const [groupName, setGroupName] = useState(cls?.name || "");
  const [groupDesc, setGroupDesc] = useState(cls?.desc || "");
  const [selectedColor, setSelectedColor] = useState(cls?.color || "");

  const copyGroupId = () => {
    navigator.clipboard.writeText(`#${cls.code}`)
      .then(() => alert("그룹 ID가 복사되었습니다!"))
      .catch((err) => console.error("복사 실패:", err));
  };

  const handleInvite = () => {
    navigator.clipboard.writeText(`#${cls.code}`)
      .then(() => alert("초대코드가 복사되었습니다!"))
      .catch((err) => console.error("복사 실패:", err));
  };

  if (!cls) {
    return <div className='flex items-center justify-center min-h-screen'>클래스를 찾을 수 없습니다.</div>;
  }

  const handleSelectStudent = (student) => {
    setSelectedStudent(student.id === selectedStudent?.id ? null : student);
  };

  return (
    <div className='min-h-screen bg-[#5A9CD0]'>
      <AdminTitle />

      <div className='flex w-full'>
        <AdminNav />

        <div className='flex flex-col items-center mr-10 w-full my-10 rounded-3xl bg-[#fafafa] min-h-[930px]'>
          {/* 그룹 이름 */}
          <div className='flex flex-col w-[90%] pt-10 pb-6 h-fit border-b-[4px] border-[#5A9CD0]'>
            <div className='flex items-end'>
              <div className='flex text-[25px] fontSB'>{cls.name}</div>
              <BiEditAlt
                size='17'
                className='mb-2 ml-2 cursor-pointer'
                onClick={() => setEditModalOpen(true)}
              />
            </div>
            <div className='flex items-center justify-between w-full mt-3'>
              <div className='flex items-center'>
                <div className='flex text-[20px] text-[#777] fontSB'>#{cls.code}</div>
                <div className='flex text-[20px] text-[#777] mx-1 fontSB cursor-pointer' onClick={copyGroupId}>
                  <IoCopyOutline />
                </div>
                <div
                  className='flex ml-3 w-[30px] h-[30px] rounded-2xl'
                  style={{ backgroundColor: cls.color }}
                ></div>
              </div>

              <IoPersonAdd 
                size='22' 
                className="cursor-pointer"
                onClick={() => setModalOpen(true)} 
              />
            </div>
          </div>

          {/* 수강생 리스트 & 안내 영역 */}
          <div className="flex w-[85%] mt-6 h-full">
            {/* 왼쪽: 수강생 리스트 */}
            <div className="flex flex-col w-[35%]">
              {cls.students.map((student) => (
                <div
                  key={student.id}
                  className='flex items-center py-4 cursor-pointer'
                  onClick={() => handleSelectStudent(student)}
                >
                  <img
                    src={student.photo}
                    alt={student.name}
                    className='w-16 h-16 rounded-full'
                  />
                  <span
                    className={`ml-6 fontSB ${
                      selectedStudent?.id === student.id
                        ? 'text-[#5A9CD0] text-[25px]'
                        : 'text-[23px] text-[#000]'
                    }`}
                  >
                    {student.name}
                  </span>
                </div>
              ))}
            </div>

            {/* 오른쪽: 안내 영역 */}
            {selectedStudent === null && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <img
                  src="/assets/images/Admin/Student/student.png"
                  alt="select prompt"
                  className="w-[40%] mb-4"
                />
                <span className='text-[20px] fontMedium text-[#333] text-center'>
                  수강생을 선택해 주세요!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 초대 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 w-[400px] flex flex-col items-center">
            <h2 className="text-[22px] fontSB mb-4">수강생 초대</h2>
            <p className="mb-4 text-center">아래 초대코드를 복사하여 수강생을 초대해주세요!</p>
            <div className="flex items-center mb-6">
              <input
                type="text"
                readOnly
                value={`#${cls.code}`}
                className="w-64 px-4 py-2 border rounded-l-2xl"
              />
              <button
                className="bg-[#5A9CD0] text-white px-4 py-2 rounded-r-2xl"
                onClick={handleInvite}
              >
                복사
              </button>
            </div>
            <button
              className="mt-2 text-[#777] px-4 py-2 rounded-2xl border border-[#ccc]"
              onClick={() => setModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 그룹 수정 모달 */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col justify-between py-32 bg-white rounded-2xl w-[40%] px-28 h-[80%]">
            <h2 className="flex justify-center text-[22px] fontSB mb-6">그룹 수정하기</h2>

            <div className='flex flex-col'>
              <label className='text-[18px] fontMedium'>그룹 이름<span className='text-red-500'>*</span></label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="bg-transparent mt-5 px-4 py-3 border-[1.5px] border-[#555552] rounded-xl focus:outline-none focus:border-[#5A9CD0] mb-6"
              />
            </div>

            <div className='flex flex-col justify-between'>
              <label className='text-[18px] fontMedium'>부가 설명</label>
              <input
                type="text"
                value={groupDesc}
                onChange={(e) => setGroupDesc(e.target.value)}
                className="bg-transparent mt-5 px-4 py-3 border-[1.5px] border-[#555552] rounded-xl focus:outline-none focus:border-[#5A9CD0] mb-6"
              />
            </div>

            <div className='flex flex-col justify-between'>
              <label className='text-[18px] fontMedium'>그룹 색상<span className='text-red-500'>*</span></label>
              <div className="flex flex-wrap gap-4 mt-5 mb-6 ">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-[40px] h-[40px] rounded-full cursor-pointer`}
                    style={{
                      backgroundColor: color,
                      border: selectedColor === color ? "3px solid #5A9CD0" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className='flex items-center mt-5 '>
              <div className='flex text-[18px] text-[#333] fontMedium'>
                그룹 코드
              </div>
              <div className='flex ml-8 text-[#666]'>#{cls.code}</div>
            </div>

            <div className='flex justify-end w-full gap-10 mt-10'>
              <div
                className='flex text-[18px] text-[#777] fontSB cursor-pointer'
                onClick={() => setEditModalOpen(false)}
              >
                취소
              </div>
              <div
                className='flex text-[18px] text-[#5A9CD0] fontSB cursor-pointer'
                onClick={() => {
                  cls.name = groupName;
                  cls.desc = groupDesc;
                  cls.color = selectedColor;
                  setEditModalOpen(false);
                }}
              >
                저장
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
