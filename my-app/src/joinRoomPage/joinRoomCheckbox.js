import React from "react";
import { useDispatch, useSelector } from "react-redux";
import checkBoxImg from "../images/check.png";
import { setConnectOnlyWithAudio } from "../store/slice";

const OnlyWithAudioCheckbox = () => {
  const dispatch = useDispatch();
  const { connectOnlyWithAudio } = useSelector((state) => state.rtc);

  const handleConnectionTypeChange = () => {
    dispatch(setConnectOnlyWithAudio(!connectOnlyWithAudio));
  };

  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {connectOnlyWithAudio && <img className="checkbox_image" src={checkBoxImg} />}
      </div>
      <p className="checkbox_container_paragraph">Only audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
