interface ProductModal {
  title: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  handleChange: (e: any) => void;
  categories: { id: number; category_name: string }[];
}

export default function Modal({
  title,
  openModal,
  setOpenModal,
  handleSubmit,
  handleChange,
  categories,
}: ProductModal) {
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
        <label htmlFor="category_id" className="text-blue-800">
          Food Category
        </label>
        <select
          name="category_id"
          className="w-full border border-gray-400 my-2 p-2 rounded"
          onChange={handleChange}
        >
          <option value="">-- Select Food Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {" "}
              {cat.category_name}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          name="category_id"
          placeholder="Category Name"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        /> */}
        <label htmlFor="product_name" className="text-blue-800">
          Product
        </label>
        <input
          type="text"
          name="product_name"
          placeholder="Product"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />
        <label htmlFor="price" className="text-blue-800">
          Price
        </label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />
        <label htmlFor="stock" className="text-blue-800">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />
        <label htmlFor="image" className="text-blue-800">
          Image
        </label>
        <input
          type="text"
          name="image"
          placeholder="Image"
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
