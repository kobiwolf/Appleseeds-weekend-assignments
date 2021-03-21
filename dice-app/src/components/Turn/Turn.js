import React from 'react';
import Dices from '../Dices/Dices';
import './Turn.css';

class Turn extends React.Component {
  state = { value: 0 };
  upDateCubeValues = (num) => {
    this.setState((preState) => {
      return { value: preState.value + num };
    });
  };
  render() {
    return (
      <div className="turn">
        <div className={`current ${this.props.player}`}>
          <h2>Current:</h2>
          <h2>{this.state.value}</h2>
        </div>
        <Dices
          updateFunc={this.upDateCubeValues}
          endTurn={this.props.func}
          upDateScore={this.props.upDateScore}
          player={this.props.player}
          value={this.state.value}
          func={this.props.func}
        />
      </div>
    );
  }
}

export default Turn;
