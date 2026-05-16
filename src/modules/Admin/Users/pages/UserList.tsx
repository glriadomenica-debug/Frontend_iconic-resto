import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../../../components/modals/User/UserModal";
import UserModalConfirmation from "../../../../components/modals/User/UserModalConfirmation";
import { IoIosAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role: {
    id: number;
    name: string;
  };
}

export default function ListProducts() {
  const [_perPage, _setPerPage] = useState<number>(5);
  const [_pager, _setPager] = useState<number>(1);
  const [_maxPage, _setMaxPage] = useState<number>(1);
  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    role_id: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false); //Trigger untuk menekkan button add
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [id, setId] = useState<any>(null);
  const navigate = useNavigate();

  const handleChangeUser = (event: any) => {
    setFormUser({
      ...formUser,
      [event.target.name]: event.target.value,
    });
  };
  //untuk ambil semua data yang ada di DB
  const fetchUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8000/api/users",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response, "response");

      await setUsers(response.data.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmitUser = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/api/users",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formUser,
      });
      console.log(response, "response");
      fetchUser();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleModalDelete = (id: number) => {
    setId(id);
    setOpenModalDelete(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:8000/api/users/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUser();
      setOpenModalDelete(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      {/* List table users*/}
      <div className="bg-white p-4 mt-8 shadow rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-center text-2xl font-bold text-black">
            Users Data
          </h1>
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center md:justify-end bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded hover:cursor-pointer"
          >
            <IoIosAdd className="mr-2 text-xl" />
            Add New User
          </button>
        </div>

        <div className="mt-4 w-full overflow-x-auto">
          <table className="w-full min-w-[600px] border border-gray-300">
            <thead className="bg-gray-100 text-blue-900">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "hover:bg-gray-200"}`}
                >
                  <td className="border p-2 text-sm md:text-base">{u.name}</td>
                  <td className="border p-2 text-sm md:text-base">{u.email}</td>
                  <td className="border p-2 text-sm md:text-base">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {u.role?.name.charAt(0).toUpperCase() +
                        u.role?.name.slice(1)}
                    </span>
                  </td>
                  <td className="border p-2">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded hover:cursor-pointer"
                        onClick={() => navigate(`/admin/user/edit/${u.id}`)}
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded hover:cursor-pointer"
                        onClick={() => handleModalDelete(u.id)}
                      >
                        {" "}
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleChange={handleChangeUser}
        handleSubmit={handleSubmitUser}
        title="Add New User"
      />

      <UserModalConfirmation
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title="Delete User"
        description="Are you sure you want to delete this user?"
        handleSubmit={handleDeleteUser}
      />
    </>
  );
}
