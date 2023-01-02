import React from 'react';
import {useSelector} from 'react-redux';

const Participant = ({identity, isLastItem, participant}) => {
  return (
    <>
      <p key={identity} className="participants_paragraph">
        {identity}
      </p>
      {!isLastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

const Participants = () => {
  const {participants} = useSelector(state => state.rtc);
  return (
    <div className="participants_container">
      {participants.map((participant, index) => (
        <Participant
          identity={participant.identity}
          key={participant.identity}
          participant={participant}
          isLastItem={index == participants.length - 1}
        />
      ))}
    </div>
  );
};

export default Participants;
