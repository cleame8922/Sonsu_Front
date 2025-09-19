import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminTitle from "../../../components/AdminTitle";
import AdminNav from "../../../components/AdminNav";
import { IoCheckbox, IoPersonAdd, IoCopyOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { API_URL } from "../../../config";
import axios from "axios";
import AdminStudentReport from "./AdminStudentReport/AdminStudentReport";

const colors = [
  "#DEE6F1",
  "#F2F3ED",
  "#F1E3D8",
  "#F4EBCE",
  "#DEE8D0",
  "#F0E4F8",
  "#D9D9D9",
];
const peopleImages = [
  "공준석.png",
  "김정이.png",
  "노태경.png",
  "이호연.png",
  "장원석.png",
  "최유정.png",
];
const getRandomPhoto = () =>
  `/assets/images/peoples/${
    peopleImages[Math.floor(Math.random() * peopleImages.length)]
  }`;

// ================= 수강생 리스트 컴포넌트 =================
function StudentList({ students, selected, toggleSelect }) {
  return (
    <div className="flex justify-around w-full px-10 my-2 mt-6">
      {/* 왼쪽: 수강생 리스트 */}
      <div className="flex flex-col w-fit">
        {students.map((student) => {
          const isSelected = selected.includes(student.id);
          return (
            <div
              key={student.id}
              className="flex items-center justify-start my-5 cursor-pointer w-fit"
              onClick={() => toggleSelect(student.id)}
            >
              <img
                src={student.photo}
                alt={student.name}
                className="w-16 h-16 rounded-full"
              />
              <span
                className="ml-6 mr-10 fontSB"
                style={{
                  fontSize: isSelected ? "25px" : "22px",
                  color: isSelected ? "#5A9CD0" : "#000",
                }}
              >
                {student.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* 오른쪽: 선택된 수강생 보고서 */}
      <div className="flex flex-col w-2/3 p-6 rounded-xl">
        {selected.length > 0 ? (
          selected.map((id) => {
            const student = students.find((s) => s.id === id);
            if (!student) return null;
            return <AdminStudentReport key={id} student={student} />;
          })
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
            <img
              src="/assets/images/Admin/Student/student.png"
              alt="select student"
              className="w-64 mb-4 h-fit"
            />
            <div className="text-[20px] fontMedium">수강생을 선택해주세요</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ================= 검색 모달 =================
function SearchModal({
  users,
  filteredUsers,
  selected,
  toggleSelect,
  handleAddStudents,
  setSearchModalOpen,
  search,
  setSearch,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-8 w-[500px] flex flex-col">
        <h2 className="text-[22px] fontSB mb-6">수강생 검색</h2>
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
                  selected.includes(user.user_id)
                    ? "text-[#5A9CD0]"
                    : "text-[#aaa]"
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
  );
}

// ================= 그룹 수정 모달 =================
function EditModal({
  cls,
  groupName,
  groupDesc,
  selectedColor,
  setGroupName,
  setGroupDesc,
  setSelectedColor,
  setCls,
  setEditModalOpen,
}) {
  const handleSave = async () => {
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
      setCls((prev) => ({
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col justify-between py-32 bg-white rounded-2xl w-[40%] px-28 h-[80%]">
        <h2 className="flex justify-center text-[22px] fontSB mb-6">
          그룹 수정하기
        </h2>

        <div className="flex flex-col">
          <label className="text-[18px] fontMedium">
            그룹 이름<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="bg-transparent mt-5 px-4 py-3 border-[1.5px] border-[#555552] rounded-xl focus:outline-none focus:border-[#5A9CD0] mb-6"
          />
        </div>

        <div className="flex flex-col justify-between">
          <label className="text-[18px] fontMedium">부가 설명</label>
          <input
            type="text"
            value={groupDesc}
            onChange={(e) => setGroupDesc(e.target.value)}
            className="bg-transparent mt-5 px-4 py-3 border-[1.5px] border-[#555552] rounded-xl focus:outline-none focus:border-[#5A9CD0] mb-6"
          />
        </div>

        <div className="flex flex-col justify-between">
          <label className="text-[18px] fontMedium">
            그룹 색상<span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mt-5 mb-6">
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-[40px] h-[40px] rounded-full cursor-pointer`}
                style={{
                  backgroundColor: color,
                  border:
                    selectedColor === color ? "3px solid #5A9CD0" : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center mt-5">
          <div className="flex text-[18px] text-[#333] fontMedium">
            그룹 코드
          </div>
          <div className="flex ml-8 text-[#666]">#{cls.code}</div>
        </div>

        <div className="flex justify-end w-full gap-10 mt-10">
          <div
            className="flex text-[18px] text-[#777] fontSB cursor-pointer"
            onClick={() => setEditModalOpen(false)}
          >
            취소
          </div>
          <div
            className="flex text-[18px] text-[#5A9CD0] fontSB cursor-pointer"
            onClick={handleSave}
          >
            저장
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= 메인 컴포넌트 =================
export default function AdminGroup() {
  const { code } = useParams();
  const [cls, setCls] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selected, setSelected] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const toggleSelect = (id) => {
    if (selected[0] === id) {
      setSelected([]); // 클릭하면 선택 해제
    } else {
      setSelected([id]); // 새로 선택
    }
  };

  const handleAddStudents = async () => {
    if (selected.length === 0) {
      alert("추가할 학생을 선택해주세요.");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${API_URL}/class/${cls.id}/invite`,
        { memberIds: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("성공적으로 멤버가 추가되었습니다.");
      const res = await axios.get(`${API_URL}/class/${code}/select`, { headers:{ Authorization:`Bearer ${token}`} });
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
    } catch (err) {
      console.error(err);
      alert("멤버 추가에 실패했습니다.");
    }
  };

  useEffect(() => {
    /* 클래스 조회 */
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
      } catch (err) {
        console.error(err);
        alert("클래스 조회에 실패했습니다.");
      }
    };
    fetchClass();
  }, [code]);

  useEffect(() => {
    /* 수강생 조회 */
    if (!cls?.id) return;
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_URL}/class/${cls.id}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const users = res.data.users.map((u) => ({
          id: u.member_id,
          name: u.username,
          photo: getRandomPhoto(),
        }));
        setCls((prev) => ({ ...prev, students: users }));
      } catch (err) {
        console.error(err);
        alert("수강생 조회에 실패했습니다.");
      }
    };
    fetchStudents();
  }, [cls?.id]);

  useEffect(() => {
    /* 전체 유저 조회 */
    if (!searchModalOpen) return;
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_URL}/class/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
        alert("유저 목록 불러오기에 실패했습니다.");
      }
    };
    fetchUsers();
  }, [searchModalOpen]);

  if (!cls)
    return (
      <div className="flex items-center justify-center min-h-screen">
        클래스를 찾을 수 없습니다.
      </div>
    );

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#5A9CD0]">
      <AdminTitle />
      <div className="flex w-full">
        <AdminNav />
        <div className="flex flex-col items-center mr-10 w-full my-10 rounded-3xl bg-[#fafafa] min-h-[830px]">
          {/* 그룹 정보 */}
          <div className="flex flex-col w-[90%] pt-10 pb-6 h-fit border-b-[4px] border-[#5A9CD0]">
            <div className="flex items-end">
              <div className="flex text-[25px] fontSB">{cls.name}</div>
              <BiEditAlt
                size={17}
                className="mb-2 ml-2 cursor-pointer"
                onClick={() => setEditModalOpen(true)}
              />
            </div>
            <div className="flex items-center justify-between w-full mt-3">
              <div className="flex items-center">
                <div className="flex text-[20px] text-[#777] fontSB">
                  #{cls.code}
                </div>
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
                size={22}
                className="cursor-pointer"
                onClick={() => setSearchModalOpen(true)}
              />
            </div>
          </div>

          {/* 수강생 */}
          {cls.students.length > 0 ? (
            <StudentList
              students={cls.students}
              selected={selected}
              toggleSelect={toggleSelect}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full mt-32">
              <img
                src="/assets/images/Admin/Student/student.png"
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
          )}
        </div>
      </div>

      {searchModalOpen && (
        <SearchModal
          {...{
            users,
            filteredUsers,
            selected,
            toggleSelect,
            handleAddStudents,
            setSearchModalOpen,
            search,
            setSearch,
          }}
        />
      )}
      {editModalOpen && (
        <EditModal
          {...{
            cls,
            groupName,
            groupDesc,
            selectedColor,
            setGroupName,
            setGroupDesc,
            setSelectedColor,
            setCls,
            setEditModalOpen,
          }}
        />
      )}
    </div>
  );
}
