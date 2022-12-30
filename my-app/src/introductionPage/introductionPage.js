import React, { useEffect } from "react";
import "./introductionPage.css";
import logo from "../images/logo.png";
import ConnectingButtons from "./connectingButtons";
import { useDispatch } from "react-redux";
import { setIsRoomHost } from "../store/slice";

const IntroductionPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsRoomHost(false));
  }, []);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img src={logo} className="introduction_page_image" />
        <ConnectingButtons />
      </div>
    </div>
  );
};

export default IntroductionPage;
