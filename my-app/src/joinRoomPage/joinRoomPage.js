import React, { useEffect } from "react";
import "./joinRoomPage.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsRoomHost } from "../store/slice";

import JoinRoomTitle from "./joinRoomTitle"
import JoinRoomContent from "./joinRoomContent"

const JoinRoom = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.rtc);
  const location = useLocation().search;

  useEffect(() => {
    const isRoomHost = new URLSearchParams(location).get("host");
    if (isRoomHost) {
      dispatch(setIsRoomHost(true));
    }
  }, []);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={store.isRoomHost} />
        <JoinRoomContent/>
      </div>
    </div>
  );
};

export default JoinRoom;
