import React, {useState} from 'react';
import MicButtonOn from '../../images/mic.svg';
import MicButtonOff from '../../images/micOff.svg';

const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const toggleMicButton = () => {
    setIsMicMuted(prev => !prev);
  };

  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? MicButtonOff : MicButtonOn}
        className="video_button_image"
        onClick={toggleMicButton}
      />
    </div>
  );
};

export default MicButton;
