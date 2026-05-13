import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";

interface Category {
  id: number;
  category_name: string;
}

export default function EditProduct() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [_category, setCategory] = useState<Category>({
    id: 0,
    category_name: "",
  });

  const [formCategory, setFormCategory] = useState<any>({});

  const handleChange = (event: any) => {
    setFormCategory({
      ...formCategory,
      [event.target.name]: event.target.value,
    });
  };

  //untuk ambil semua data yang ada di DB Category
  const fetchCategory = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/categories/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");

      await setCategory(response.data.data);
      await setFormCategory(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const handleSubmitUpdate = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:8000/api/categories/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formCategory,
      });
      console.log(response, "response");
      navigate("/categories");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl px-4 py-4 opacity-80">
        <div className="flex items-center text-xl text-blue-900 font-bold">
          <AiFillEdit />
          Edit Category
        </div>

        <div className="py-4 text-1xl">
          <label htmlFor="category_name" className="text-blue-900">
            Category Name
          </label>
          <input
            type="text"
            name="category_name"
            className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange}
            value={formCategory.category_name || ""}
          />
        </div>

        <div className="my-4">
          <button
            className="bg-blue-900 opacity-80 hover:bg-blue-800 cursor-pointer text-white py-2 px-4 rounded"
            onClick={handleSubmitUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}
