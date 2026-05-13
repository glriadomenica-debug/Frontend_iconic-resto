import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";
interface MovieProps {
  title: string;
  description: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}

export default function CategoryModalConfirmation({
  openModal,
  title,
  description,
  setOpenModal,
  handleSubmit,
}: MovieProps) {
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
          <p className="my-4 text-gray-600">{description}</p>

          <div className="flex gap-4 justify-end">
            <button
              className="px-4 py-2 bg-blue-900 opacity-80 text-white rounded hover:cursor-pointer"
              onClick={handleSubmit}
            >
              <AiFillSave /> Yes
            </button>

            <button
              className="flex items-center px-4 py-2 bg-blue-900 opacity-80 text-white rounded hover:cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              {" "}
              <AiFillCloseCircle /> No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
