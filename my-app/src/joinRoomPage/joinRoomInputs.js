const JoinRoomInputs = ({
  roomIdValue,
  setRoomIdValue,
  nameValue,
  setNameValue,
  isRoomHost
}) => {
  return (
    <div className="join_room_inputs_container">
      {!isRoomHost && (
        <input
          placeholder="Enter meeting id"
          value={roomIdValue}
          onChange={e => setRoomIdValue(e.target.value)}
          className="join_room_input"
        />
      )}
      <input
        placeholder="Enter your name"
        value={nameValue}
        onChange={e => setNameValue(e.target.value)}
        className="join_room_input"
      />
    </div>
  );
};

export default JoinRoomInputs;
