import React, { useState } from 'react'
import AdminTitle from '../../../components/AdminTitle';
import AdminNav from '../../../components/AdminNav';
import students from '../../../data/students';
import { IoCheckbox } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";

export default function AdminStudent() {
  const [selected, setSelected] = useState([]); // 선택된 수강생 관리

  const toggleSelect = (name) => {
    setSelected(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    );
  };

  const selectAll = () => {
    if (selected.length === students.length) {
      setSelected([]);
    } else {
      setSelected(students.map(s => s.name));
    }
  };

  // 복사 함수
  const copyGroupId = () => {
    navigator.clipboard.writeText("#12345")
      .then(() => {
        alert("그룹 ID가 복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사 실패:", err);
      });
  };


  return (
    <div className='min-h-screen bg-[#5A9CD0]'>
      <AdminTitle />

      <div className='flex w-full'>
        <AdminNav />

        <div className='flex flex-col items-center mr-10 w-full my-10 rounded-3xl bg-[#fafafa] h-[930px]'>
          {/* 그룹 이름 */}
          <div className='flex flex-col w-[90%] pt-10 pb-6 h-fit border-b-[4px] border-[#5A9CD0]'>
            <div className='flex items-end'>
              <div className='flex text-[25px] fontSB'>손수잇다</div>
              <BiEditAlt size='17' className='mb-2 ml-2' />
            </div>
            <div className='flex items-center justify-between w-full mt-3'>
              <div className='flex items-center'>
                <div className='flex text-[20px] text-[#777] fontSB'>#12345</div>
                
                <div className='flex text-[20px] text-[#777] mx-1 fontSB cursor-pointer' onClick={copyGroupId}>
                  <IoCopyOutline />
                </div>

                <div className='flex bg-[#DEE6F1] ml-3 w-[30px] h-[30px] rounded-2xl'></div>
              </div>

              <div className='flex'>
                <IoPersonAdd size='22' />
              </div>
            </div>
          </div>

          <div className='flex flex-wrap my-2 justify-center mt-6 w-[80%] gap-2'>
            {students.map((student) => (
              <div
                key={student.id}
                className='flex justify-center items-center my-5 p-4 w-[32%]'
              >
                {/* 학생 사진 */}
                <img
                  src={`/assets/images/peoples/${student.name}.png`}
                  alt={student.name}
                  className='w-16 h-16 rounded-full'
                />
                {/* 학생 이름 */}
                <span className='text-[22px] ml-6 mr-10 fontSB'>{student.name}</span>
                {/* 체크박스 */}
                <IoCheckbox
                  size={25}
                  className={`cursor-pointer ${selected.includes(student.name) ? 'text-[#5A9CD0]' : 'text-[#888]'}`}
                  onClick={() => toggleSelect(student.name)}
                />
              </div>
            ))}
          </div>

          <div className='flex w-[90%] h-full pb-12 items-end justify-end'>
            <div className='flex text-[18px] text-[#777] fontSB cursor-pointer' onClick={selectAll}>
              전체선택
            </div>
            <div className='flex text-[18px] text-[#5A9CD0] fontSB ml-10'>삭제</div>
          </div>
        </div>
      </div>
    </div>
  )
}
