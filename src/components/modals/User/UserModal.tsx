import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

interface ModalProps {
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
}: ModalProps) {
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${openModal ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        onClick={() => setOpenModal(false)}
      >
        <div className="absolute inset-0 bg-black/50"> </div>

        {/* Modal Content */}
        <div
          className="relative bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold text-lg">{title}</h3>

          <div className="py-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange}
            />
          </div>

          <div className="py-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange}
            />
          </div>
          {/* <div className="py-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange}
            />
          </div> */}

          {/* <div className="py-4">
            <label htmlFor="password_confirmation">Password Confirm</label>
            <input
              type="password"
              name="password_confirmation"
              className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange}
            />
          </div> */}

          <div className="py-4">
            <label htmlFor="role_id">Role</label>

            <select
              name="role_id"
              className="w-full border border-gray-400 my-2 p-2 rounded"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="1">Admin</option>
              <option value="2">Cashier</option>
              <option value="3">Kitchen</option>
            </select>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              className="px-4 py-2 bg-blue-900 opacity-80 text-white rounded hover:cursor-pointer"
              onClick={handleSubmit}
            >
              <AiFillSave />
            </button>

            <button
              className="flex items-center px-4 py-2 bg-blue-900 opacity-80 text-white rounded hover:cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              {" "}
              <AiFillCloseCircle />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
