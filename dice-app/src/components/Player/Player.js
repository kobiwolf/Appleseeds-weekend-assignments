import React from 'react';
import Turn from '../Turn/Turn';

import './Player.css';

export default class Player extends React.Component {
  state = { score: this.props.score };
  render() {
    return (
      <div className={`player ${this.props.player}`}>
        {this.props.turn && (
          <Turn
            func={this.props.func}
            upDateScore={this.props.upDateScore}
            player={this.props.player}
          />
        )}
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}
