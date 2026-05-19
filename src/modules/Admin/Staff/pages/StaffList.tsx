import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import Modal from "../../../../components/modals/Staff/StaffModal";
import StaffModalConfirmation from "../../../../components/modals/Staff/StaffModalConfirmation";

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  sex: string;
  phone_number: string;
  email: string;
  position: string;
}

export default function ListStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [formStaff, setFormStaff] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    sex: "",
    phone_number: "",
    email: "",
    position: "",
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchStaff = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/api/staff?page=${currentPage}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStaff(res.data.data || []);
      setLastPage(res.data.data.last_page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [currentPage]);

  const handleChangeStaff = (e: any) => {
    setFormStaff({
      ...formStaff,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitStaff = async () => {
    try {
      await axios({
        method: "POST",
        url: "http://localhost:8000/api/staff",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formStaff,
      });
      fetchStaff();
      setOpenModal(false);
      setFormStaff({
        id: 0,
        first_name: "",
        last_name: "",
        sex: "",
        phone_number: "",
        email: "",
        position: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteStaff = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `http://localhost:8000/api/staff/${selectedId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchStaff();
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
            <h1 className="text-2xl font-bold text-gray-800">Staff List</h1>
            <p className="text-sm text-gray-500">Manage restaurant Staff</p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition"
          >
            + Add New Staff
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 text-gray-700">
                <th className="text-left px-4 py-3 rounded-l-xl">No</th>

                <th className="text-left px-4 py-3">First name</th>
                <th className="text-left px-4 py-3">Last name</th>
                <th className="text-left px-4 py-3">Gender</th>
                <th className="text-left px-4 py-3">Phone number</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Position</th>
                <th className="text-center px-4 py-3 rounded-r-xl">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : staff.length > 0 ? (
                staff.map((staff, index) => (
                  <tr
                    key={staff.id}
                    className="border-b border-gray-100 hover:bg-orange-50 transition"
                  >
                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {staff.first_name}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {staff.last_name}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {staff.sex}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {staff.phone_number}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {staff.email}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-700">
                      {staff.position}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                          onClick={() => navigate(`/staff/edit/${staff.id}`)}
                        >
                          <AiFillEdit />
                        </button>

                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
                          onClick={() => {
                            setSelectedId(staff.id);
                            setOpenModalDelete(true);
                          }}
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No staff found
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
        handleChange={handleChangeStaff}
        handleSubmit={handleSubmitStaff}
        title="Add new Staff"
      />
      <StaffModalConfirmation
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title="Delete Staff"
        description="Are you sure you want to delete this staff?"
        handleSubmit={handleDeleteStaff}
      />
    </>
  );
}
