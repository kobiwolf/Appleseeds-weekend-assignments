import React from 'react';
import './FinalScore.css';

class FinalScore extends React.Component {
  state = { finalScore: 20 };
  render() {
    return (
      <div className={this.props.className}>
        <h2>{this.props.text}</h2>
        <form>
          <input
            value={this.state.finalScore}
            onChange={async (e) => {
              await this.setState({ finalScore: e.target.value });
              this.props.changeFinalScore(this.state.finalScore);
            }}
          ></input>
        </form>
      </div>
    );
  }
}

export default FinalScore;
