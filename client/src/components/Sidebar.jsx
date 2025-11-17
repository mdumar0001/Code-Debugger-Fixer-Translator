// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ history }) => {
//     const [isOpen, setIsOpen] = useState(true);

//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className={`bg-gray-800 text-white h-full transition-transform duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
//             <button onClick={toggleSidebar} className="p-2">
//                 {isOpen ? 'Close' : 'Open'}
//             </button>
//             <div className={`mt-4 ${isOpen ? 'block' : 'hidden'}`}>
//                 <h2 className="text-lg font-bold">User History</h2>
//                 <ul>
//                     {history.map((item, index) => (
//                         <li key={index} className="py-2">
//                             <Link to={`/history/${item.id}`} className="hover:underline">
//                                 {item.title}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
import React from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function Sidebar({
  open,
  onClose,
  pastReviews,
  onSelect,
  onNewSlide,
  //   onEdit,
  onDelete,
}) {
  return (
    // slide panel
    <aside
      className={`fixed left-0 top-0 bottom-0 w-80 bg-gray-800 text-white shadow-lg transform transition-transform z-50 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <button className="bg-gray-200 text-gray-900">New Slide</button>
       */}{" "}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold">Previous Reviews</h3>
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          <FaTimes />
        </button>
      </div>
      <div className="px-4 pt-4">
        <button
          className="w-full bg-gray-600 hover:bg-gray-700 active:scale-95 
             transition-all font-semibold py-2 text-white 
             rounded-md shadow-md mt-3 mb-2"
          onClick={onNewSlide}
        >
          + New Slide
        </button>
      </div>
      <div className="p-3 overflow-auto h-full">
        {pastReviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {pastReviews.map((item) => (
              <li
                key={item.id}
                className="bg-gray-700 p-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-600"
              >
                <div onClick={() => onSelect(item)} className="flex-1 pr-2">
                  <div className="text-sm text-gray-100">{item.title}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <button
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   onEdit(item);
                    // }}
                    className="text-yellow-300"
                  >
                    <FaEdit />
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
