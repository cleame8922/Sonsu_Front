import { FaRegTrashAlt } from "react-icons/fa";

export default function CustomCard({ lessons, onDeleteLesson, name }) {
  return (
    <div className="w-[45%] h-[650px] rounded-[40px] p-8 bg-[#DEE6F1] shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-[#444] text-[18px] font-black">{name}</p>
      </div>

      <div className="mt-6 h-[550px] overflow-y-auto space-y-4">
        {lessons.length === 0 && <p className="text-gray-500">강의를 추가해주세요.</p>}
        {lessons.map((lesson) => (
          <div
            key={lesson.lessonCategory_id}
            className="flex p-4 rounded-[20px] transition-all duration-200 hover:shadow-lg cursor-pointer bg-white"
          >
            <div className="relative p-4 rounded-[15px] shadow-lg bg-[#F2F2F2]">
              <img
                src="/assets/images/Sign.png"
                alt=""
                className="object-cover w-20 h-20"
              />
            </div>
            <div className="flex flex-col justify-center ml-4 w-[70%]">
              <p className="text-lg font-bold">
                Part {lesson.part_number}. {lesson.category}
              </p>
              <p className="text-sm text-gray-600 truncate w-[150px]">
                {lesson.words?.join(", ") || "단어 정보 없음"}
              </p>
            </div>
            <div className="flex items-center justify-end">
              <FaRegTrashAlt
                size={24}
                className="text-red-500 transition-transform cursor-pointer hover:text-red-700 hover:scale-110"
                onClick={() => onDeleteLesson(lesson.lessonCategory_id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
