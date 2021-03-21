import React from 'react';
import Setting from '../Setting/Setting';
import Player from '../Player/Player';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import EndGame from '../EndGame/EndGame';
import './Board.css';

export default class Board extends React.Component {
  state = {
    players: {
      first: { score: 0, name: 'kobi', turn: true },
      second: { score: 0, name: 'judi', turn: false },
    },
    finalScore: 20,
    gameEnd: true,
  };
  switchTurns = async () => {
    let arr = Object.keys(this.state.players);
    for (let i = 0; i < arr.length; i++) {
      await this.setState({
        players: {
          ...this.state.players,
          [arr[i]]: {
            ...this.state.players[arr[i]],
            turn: !this.state.players[arr[i]].turn,
          },
        },
      });
    }
  };
  upDateScore = async (name, num) => {
    await this.setState({
      players: {
        [name]: {
          score: (this.state.players[name].score += num),
        },
      },
    });
  };
  endGame = () => {
    this.setState({ gameEnd: false });
  };
  changeFinalScore = (num) => {
    this.setState({ finalScore: num });
  };
  render() {
    return (
      <div className="board">
        {this.state.gameEnd ? (
          <div>
            <Setting
              finalScore={this.state.finalScore}
              changeFinalScore={this.changeFinalScore}
            />
            <ScoreBoard
              firstName={this.state.players.first.name}
              secondName={this.state.players.second.name}
              firstScore={this.state.players.first.score}
              secondScore={this.state.players.second.score}
              finalScore={this.state.finalScore}
              endGame={this.endGame}
            />
            <div className="players">
              <Player
                name={this.state.players.first.name}
                turn={this.state.players.first.turn}
                func={this.switchTurns}
                upDateScore={this.upDateScore}
                player="first"
              />
              <div />
              <Player
                name={this.state.players.second.name}
                turn={this.state.players.second.turn}
                func={this.switchTurns}
                upDateScore={this.upDateScore}
                player="second"
              />
            </div>
          </div>
        ) : (
          <EndGame players={this.state.players} />
        )}
      </div>
    );
  }
}
