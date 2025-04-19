import React from "react";
import "./Modal.css";
import EditModal from "./EditModal";

const List = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({ title: "", deadline: "" });
    const [modalMode, setModalMode] = React.useState("edit"); // or "add"

    const handleEditClick = () => {
        setFormData({ title: "예시 공고", deadline: "2025-04-30" });
        // 실제로는 데이터를 가져와서 title과 deadLine에 기입
        setModalMode("edit");
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setFormData({ title: "", deadline: "" });
        setModalMode("add");
        setIsModalOpen(true);
    };

    const handleSave = () => {
        console.log(`${modalMode === "edit" ? "수정" : "추가"}된 데이터:`, formData);
        setIsModalOpen(false);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto border rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">자기소개서 목록</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddClick}>추가</button>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div>Total</div>
                <div className="flex gap-2">
                    <select className="border rounded px-2 py-1">
                        <option>마감일순</option>
                        <option>최신순</option>
                    </select>
                    <input
                        type="text"
                        placeholder="공고명 입력"
                        className="border rounded px-2 py-1"
                    />
                    <button className="bg-gray-300 px-4 py-1 rounded">검색</button>
                </div>
            </div>

            <table className="w-full table-fixed border text-center" border="hover">
                <thead className="bg-blue-100">
                <tr>
                    <th className="w-1/3 py-2 border">공고명</th>
                    <th className="w-1/3 py-2 border">마감일</th>
                    <th className="w-1/3 py-2 border">수정일</th>
                    <th className="py-2 border">수정</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="py-2 border">공고명</td>
                    <td className="py-2 border">마감일</td>
                    <td className="py-2 border">수정일</td>
                    <td className="py-2 border">
                        <button className="bg-gray-200 px-2 py-1 rounded" onClick={handleEditClick}>수정</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: 10 }, (_, i) => (
                    <button
                        key={i + 1}
                        className="w-8 h-8 rounded-full border text-sm hover:bg-gray-200"
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                formData={formData}
                setFormData={setFormData}
                mode={modalMode}
            />

        </div>
    );
};

export default List;
