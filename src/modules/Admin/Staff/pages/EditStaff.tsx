import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  sex: string;
  phone_number: string;
  email: string;
}

export default function EditCategory() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [_staff, setStaff] = useState<Staff>({
    id: 0,
    first_name: "",
    last_name: "",
    sex: "",
    phone_number: "",
    email: "",
  });

  const [formStaff, setFormStaff] = useState<any>({});

  const handleChange = (event: any) => {
    setFormStaff({
      ...formStaff,
      [event.target.name]: event.target.value,
    });
  };

  //untuk ambil semua data yang ada di DB Staff
  const fetchStaff = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/staff/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");

      await setStaff(response.data.data);
      await setFormStaff(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [id]);

  const handleSubmitUpdate = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:8000/api/staff/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formStaff,
      });
      console.log(response, "response");
      navigate("/staff");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl px-4 py-4 opacity-80">
        <div className="flex items-center text-xl text-blue-900 font-bold">
          <AiFillEdit />
          Edit Staff
        </div>

        <div className="py-4">
          <label htmlFor="first_name" className="text-blue-900">
            First Name
          </label>
          <input
            type="text"
            name="firts_name"
            className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange}
            value={formStaff.first_name || ""}
          />
        </div>

        <div className="py-2">
          <label htmlFor="last_name" className="text-blue-900">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange}
            value={formStaff.last_name}
          />
        </div>
        <div className="py-2">
          <label htmlFor="sex" className="text-blue-900">
            Sex
          </label>

          <select
            name="sex"
            className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange}
            value={formStaff.sex}
          >
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Phone */}
        <div className="py-2">
          <label htmlFor="phone_number" className="text-blue-900">
            Phone Number
          </label>

          <input
            type="text"
            name="phone_number"
            className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange}
            value={formStaff.phone_number}
          />
        </div>

        {/* Email */}
        <div className="py-2">
          <label htmlFor="email" className="text-blue-900">
            Email
          </label>

          <input
            type="email"
            name="email"
            className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange}
            value={formStaff.email}
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
