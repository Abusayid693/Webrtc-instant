import React, { useState } from "react";
import JoinRoomInputs from "./joinRoomInputs";
import { useSelector } from "react-redux";

const JoinRoomContent = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const isRoomHost = useSelector((state) => state.rtc.isRoomHost)
  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomId}
        setRoomIdValue={setRoomId}
        nameValue={name}
        setNameValue={setName}
        isRoomHost={isRoomHost}
      />
    </>
  );
};

export default JoinRoomContent;
