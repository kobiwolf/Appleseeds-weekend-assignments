import React from 'react';
import './ScoreBoard.css';

class ScoreBoard extends React.Component {
  componentDidUpdate = () => {
    if (this.props.firstScore > this.props.finalScore) {
      this.props.endGame(this.props.firstName);
    } else if (this.props.secondScore > this.props.finalScore) {
      this.props.endGame(this.props.secondName);
    }
  };
  render() {
    return (
      <div className="ScoreBoard">
        <div>
          <h2>Score Board:</h2>
        </div>
        <div className="playersScores">
          <div className="playerScore">
            <h2>{this.props.firstName}</h2>
            <h2>{this.props.firstScore}</h2>
          </div>
          <div className="playerScore">
            <h2>{this.props.secondName}</h2>
            <h2>{this.props.secondScore}</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default ScoreBoard;
