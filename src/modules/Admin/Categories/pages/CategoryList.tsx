import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/modals/Category/CatModal";
import CategoryModalConfirmation from "../../../../components/modals/Category/CatModalConfirmation";

interface Category {
  id: number;
  category_name: string;
}

export default function ListCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [formCategory, setFormCategory] = useState({
    category_name: "",
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/api/categories?page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(res.data.data.data || []);
      setLastPage(res.data.data.last_page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handleChangeCategory = (e: any) => {
    setFormCategory({
      ...formCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCategory = async () => {
    try {
      await axios({
        method: "POST",
        url: "http://localhost:8000/api/categories",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formCategory,
      });
      fetchCategories();
      setOpenModal(false);
      setFormCategory({
        category_name: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCat = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:8000/api/categories/${selectedId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCategories();
      setOpenModalDelete(false);
    } catch (error: any) {
      alert(error.response.data.data);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Categories List
            </h1>
            <p className="text-sm text-gray-500">
              Manage restaurant categories
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition"
          >
            + Add Category
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="text-left px-4 py-3 rounded-l-xl">No</th>

                <th className="text-left px-4 py-3">Category Name</th>

                <th className="text-center px-4 py-3 rounded-r-xl">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="border-b border-gray-100 hover:bg-orange-50 transition"
                  >
                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {category.category_name}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                          onClick={() =>
                            navigate(`/categories/edit/${category.id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                          onClick={() => {
                            setSelectedId(category.id);
                            setOpenModalDelete(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-lg text-white transition ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
          >
            Prev
          </button>
          <span className="font-medium text-gray-700">
            Page {currentPage} of {lastPage}
          </span>
          <button
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-lg text-white transition ${
              currentPage === lastPage
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleChange={handleChangeCategory}
        handleSubmit={handleSubmitCategory}
        title="Add new category"
      />
      <CategoryModalConfirmation
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        handleSubmit={handleDeleteCat}
      />
    </>
  );
}
