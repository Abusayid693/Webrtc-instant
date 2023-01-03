import React, {useState} from 'react';
import cameraOn from '../../images/camera.svg';
import cameraOff from '../../images/cameraOff.svg';

const CameraButton = () => {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

  const handleCameraButton = () => {
    setIsLocalVideoDisabled(prev => !prev);
  };

  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoDisabled ? cameraOff : cameraOn}
        onClick={handleCameraButton}
        className="video_button_image"
      />
    </div>
  );
};

export default CameraButton;
