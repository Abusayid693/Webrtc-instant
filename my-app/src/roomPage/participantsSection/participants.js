import React from 'react';

const dummy = [
  {
    identity: 'Jack'
  },
  {
    identity: 'Ann'
  },
  {
    identity: 'ma'
  },
  {
    identity: 'lee'
  },
  {
    identity: 'dhe'
  }
];

const Participant = ({
  identity,
  isLastItem,
  participant
}) => {
  return (
    <>
      <p key={identity} className="participants_paragraph">
        {identity}
      </p>
      {!isLastItem && (
        <span className="participants_separator_line"></span>
      )}
    </>
  );
};

const Participants = () => {
  return (
    <div className="participants_container">
      {dummy.map((participant, index) => (
        <Participant
          identity={participant.identity}
          key={participant.identity}
          participant={participant}
          isLastItem={index == dummy.length - 1}
        />
      ))}
    </div>
  );
};

export default Participants;
