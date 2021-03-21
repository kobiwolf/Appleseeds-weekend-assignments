import React from 'react';
import Button from '../Button/Button';
import FinalScore from '../FinalScore/FinalScore';
import './Setting.css';

function Setting(props) {
  return (
    <div className="setting">
      <Button text="new Game" func={() => window.location.reload()} />
      <FinalScore
        value={props.finalScore}
        text="final Score"
        className="FinalScore"
        changeFinalScore={props.changeFinalScore}
      />
      {/* this is a div for design uses */}
      <div />
    </div>
  );
}

export default Setting;
