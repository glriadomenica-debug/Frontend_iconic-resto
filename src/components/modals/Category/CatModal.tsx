interface CategoryModal {
  title: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  handleChange: (e: any) => void;
}

export default function Modal({
  title,
  openModal,
  setOpenModal,
  handleSubmit,
  handleChange,
}: CategoryModal) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        openModal ? "" : "hidden"
      }`}
      onClick={() => setOpenModal(false)}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content modal */}
      <div
        className="relative bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4 text-blue-900">{title}</h2>
        <label htmlFor="category_name" className="text-blue-800">
          Category Name
        </label>
        <input
          type="text"
          name="category_name"
          placeholder="Category Name"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 cursor-pointer"
          >
            Save
          </button>

          <button
            onClick={() => setOpenModal(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
