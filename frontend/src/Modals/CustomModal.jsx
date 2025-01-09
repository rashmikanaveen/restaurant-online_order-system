import React from 'react';

const CustomModal = ({ show, handleClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-50 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div>{children}</div>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;