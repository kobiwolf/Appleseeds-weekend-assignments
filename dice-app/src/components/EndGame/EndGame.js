import React from 'react';
import Button from '../Button/Button';
import './EndGame.css';
export default function EndGame(props) {
  let name = props.players.first.name;
  let score = props.players.first.score;
  if (props.players.first.score < props.players.second.score) {
    name = props.players.second.name;
    score = props.players.second.score;
  }

  return (
    <div className="endGameDiv">
      <div className="endGame">
        <h1>
          wowwwww {name} has won with {score} points!!
        </h1>
        <h2>Would you like a new game?</h2>
        <div>
          <Button text="Y" func={() => window.location.reload()} />
          <h3>/</h3>
          <Button text="N" func={() => {}} />
        </div>
      </div>
    </div>
  );
}
