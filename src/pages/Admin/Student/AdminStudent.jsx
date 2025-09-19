import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminTitle from '../../../components/AdminTitle';
import AdminNav from '../../../components/AdminNav';
import { IoCheckbox } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { IoPersonAdd, IoCopyOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { API_URL } from '../../../config';
import axios from 'axios';

const colors = [
  "#DEE6F1",
  "#F2F3ED",
  "#F1E3D8",
  "#F4EBCE",
  "#DEE8D0",
  "#F0E4F8",
  "#D9D9D9",
];

export default function AdminGroup() {
  const { code } = useParams();
  const [cls, setCls] = useState(null);

  // 그룹 수정 state
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // 선택된 학생 (user_id 배열로 관리)
  const [selected, setSelected] = useState([]);

  // 모달 state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // 사용자 검색 state
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // 클래스 정보 불러오기
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_URL}/class/${code}/select`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data;
        setCls({
          id: data.class_id,
          name: data.class_name,
          desc: data.description,
          code: data.class_code,
          color: colors[(data.color_id || 1) - 1],
          students: data.students || [],
        });

        setGroupName(data.class_name);
        setGroupDesc(data.description);
        setSelectedColor(colors[(data.color_id || 1) - 1]);
      } catch (error) {
        console.error(error);
        alert("클래스 조회에 실패했습니다.");
      }
    };
    fetchClass();
  }, [code]);

  // 전체 사용자 불러오기
  useEffect(() => {
    if (!searchModalOpen) return;
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_URL}/class/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users || []);
      } catch (error) {
        console.error(error);
        alert("유저 목록 불러오기에 실패했습니다.");
      }
    };
    fetchUsers();
  }, [searchModalOpen]);

  useEffect(() => {
  if (cls) console.log("클래스 ID:", cls.id);
}, [cls]);


 // 클래스 수강생 목록 불러오기
  useEffect(() => {
    if (!cls) return;

    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_URL}/class/${cls.id}/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const users = res.data.users || [];

        const imageList = [
          "/assets/images/peoples/person1.png",
          "/assets/images/peoples/person2.png",
          "/assets/images/peoples/person3.png",
          "/assets/images/peoples/person4.png",
          "/assets/images/peoples/person5.png",
        ];

        setCls(prev => ({
          ...prev,
          students: users.map(u => ({
            id: u.member_id,
            name: u.username,
            photo: imageList[Math.floor(Math.random() * imageList.length)]
          }))
        }));
      } catch (error) {
        console.error(error);
        alert("수강생 목록 불러오기에 실패했습니다.");
      }
    };

    fetchStudents();
  }, [cls]);

  // 검색된 사용자
  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  // 학생 선택 토글 (user_id 기준)
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  // 학생 추가 API 호출
  const handleAddStudents = async () => {
    if (selected.length === 0) {
      alert("추가할 학생을 선택해주세요.");
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      await axios.post(
        `${API_URL}/class/${cls.id}/invite`,
        { memberIds: selected },
        { headers: { Authorization: `Bearer ${token}`} }
      );

      alert("성공적으로 멤버가 추가되었습니다.");

      // 새로 추가된 학생 목록 반영 (간단히 다시 fetchClass 호출)
      const res = await axios.get(`${API_URL}/class/${code}/select`);
      const data = res.data.data;
      setCls({
        id: data.class_id,
        name: data.class_name,
        desc: data.description,
        code: data.class_code,
        color: colors[(data.color_id || 1) - 1],
        students: data.students || [],
      });

      setSelected([]);
      setSearchModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("멤버 추가에 실패했습니다.");
    }
  };

  if (!cls) {
    return <div className="flex items-center justify-center min-h-screen">클래스를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />

      <div className="flex w-full">
        <AdminNav />

        <div className="flex flex-col items-center mr-10 w-full my-10 rounded-3xl bg-[#fafafa] min-h-[930px]">
          {/* 그룹 정보 */}
          <div className="flex flex-col w-[90%] pt-10 pb-6 h-fit border-b-[4px] border-[#5A9CD0]">
            <div className="flex items-end">
              <div className="flex text-[25px] fontSB">{cls.name}</div>
              <BiEditAlt
                size="17"
                className="mb-2 ml-2 cursor-pointer"
                onClick={() => setEditModalOpen(true)}
              />
            </div>
            <div className="flex items-center justify-between w-full mt-3">
              <div className="flex items-center">
                <div className="flex text-[20px] text-[#777] fontSB">#{cls.code}</div>
                <div
                  className="flex text-[20px] text-[#777] mx-1 fontSB cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(`#${cls.code}`)}
                >
                  <IoCopyOutline />
                </div>
                <div
                  className="flex ml-3 w-[30px] h-[30px] rounded-2xl"
                  style={{ backgroundColor: cls.color }}
                ></div>
              </div>
              <IoPersonAdd
                size="22"
                className="cursor-pointer"
                onClick={() => setSearchModalOpen(true)}
              />
            </div>
          </div>

          {/* 수강생이 없는 경우 */}
          {cls.students.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full mt-32">
              <img
                src="/assets/images/Admin/Member/group.png"
                alt="group"
                className="w-[400px] h-fit"
              />
              <div className="text-[20px] fontMedium my-5">
                수강생이 없다면 추가해주세요!
              </div>
              <div
                className="text-[20px] fontSB px-4 py-3 rounded-2xl bg-[#E7E7E7] cursor-pointer"
                onClick={() => setSearchModalOpen(true)}
              >
                수강생 추가하기
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap my-2 justify-center mt-6 w-[80%] gap-2">
              {cls.students.map((student) => (
                <div
                  key={student.id}
                  className="flex justify-center items-center my-5 p-4 w-[32%]"
                >
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <span className="text-[22px] ml-6 mr-10 fontSB">{student.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔍 검색 모달 */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 w-[500px] flex flex-col">
            <h2 className="text-[22px] fontSB mb-6">수강생 검색</h2>

            {/* 검색창 */}
            <div className="relative flex mb-6">
              <input
                type="text"
                placeholder="이름으로 검색..."
                className="bg-[#E8E8E8] rounded-full px-10 py-3 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FiSearch
                className="absolute text-gray-600 -translate-y-1/2 right-5 top-1/2"
                size={20}
              />
            </div>

            {/* 유저 목록 */}
            <div className="flex flex-col max-h-[400px] overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.user_id}
                  className="flex items-center justify-between px-6 py-3 my-1 border rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleSelect(user.user_id)}
                >
                  <span className="text-[18px]">{user.username}</span>
                  <IoCheckbox
                    size={22}
                    className={
                      selected.includes(user.user_id) ? "text-[#5A9CD0]" : "text-[#aaa]"
                    }
                  />
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="py-10 text-center text-gray-500">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 border border-gray-400 rounded-lg"
                onClick={() => setSearchModalOpen(false)}
              >
                닫기
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#5A9CD0] text-white"
                onClick={handleAddStudents}
              >
                추가하기
              </button>
            </div>
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
              <div className="flex flex-wrap gap-4 mt-5 mb-6">
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

            <div className='flex items-center mt-5'>
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
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("accessToken");
                    const body = {
                      className: groupName,
                      title: groupName,
                      description: groupDesc,
                      colorId: colors.indexOf(selectedColor) + 1,
                    };

                    await axios.patch(`${API_URL}/class/edit/${cls.id}`, body, {
                      headers: { Authorization: `Bearer ${token}` },
                    });

                    setCls(prev => ({
                      ...prev,
                      name: groupName,
                      desc: groupDesc,
                      color: selectedColor,
                    }));

                    alert("그룹이 성공적으로 수정되었습니다.");
                    setEditModalOpen(false);
                  } catch (error) {
                    console.error(error);
                    alert("그룹 수정에 실패했습니다.");
                  }
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
