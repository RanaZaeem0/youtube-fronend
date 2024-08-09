// Trigger.js
import React, { useState } from 'react';
import Popup from './PublishVideo'; // Adjust the path if necessary

const Trigger = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => setIsPopupVisible(true);
  const hidePopup = () => setIsPopupVisible(false);

  return (
    <div>
      <button onClick={showPopup} className="px-4 py-2 bg-blue-500 text-white rounded">
      Publish A video
      </button>
      <Popup isVisible={isPopupVisible} onClose={hidePopup} />
    </div>
  );
};

export default Trigger;
