import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";

interface Users {
  id: number;
  name: string;
  email: string;
}

export default function EditUser() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [_user, setUser] = useState<Users>({
    id: 0,
    name: "",
    email: "",
  });

  const [formUser, setFormUser] = useState<any>({});

  const handleChange = (event: any) => {
    setFormUser({
      ...formUser,
      [event.target.name]: event.target.value,
    });
  };

  //untuk ambil semua data yang ada di Tabel user
  const fetchUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/users/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");

      await setUser(response.data.data);
      await setFormUser(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleSubmitUpdate = async () => {
    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:8000/api/users/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formUser,
      });
      console.log(response, "response");
      navigate("/admin/user");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl px-4 py-4 opacity-80">
        <div className="flex items-center text-xl text-blue-900 font-bold ">
          <AiFillEdit />
          Edit User
        </div>

        <div className="py-4 text-1xl">
          <label htmlFor="name" className="text-blue-900">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange}
            defaultValue={formUser.name}
          />

          <label htmlFor="email" className="text-blue-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-400 my-2 p-2 rounded"
            onChange={handleChange}
            defaultValue={formUser.email}
          />

          <label htmlFor="role" className="text-blue-900">
            Role
          </label>

          <input
            type="text"
            disabled
            value={
              formUser.role?.name.charAt(0).toUpperCase() +
              formUser.role?.name.slice(1)
            }
            className="w-full border border-gray-400 my-2 p-2 rounded bg-gray-100 cursor-not-allowed"
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
