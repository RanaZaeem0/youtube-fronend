// Popup.js
import React from 'react';
import PublishVideoCompount from "../PublishVideo"
const Popup = ({ isVisible, onClose }) => {
  if (!isVisible) return null; // Do not render anything if not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
      <button onClick={onClose} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">X </button>
      
        
      </div>
    </div>
  );
};

export default Popup;
