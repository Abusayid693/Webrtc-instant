import React, {useState} from 'react';
import screenShare from '../../images/switchToScreenSharing.svg';

const SwitchToScreenSharingButton = () => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const toggleScreenSharing = () => {
    setIsScreenSharing(prev => !prev);
  };

  return (
    <div className="video_button_container">
      <img
        onClick={toggleScreenSharing}
        src={screenShare}
        className="video_button_image"
      />
    </div>
  );
};

export default SwitchToScreenSharingButton;
