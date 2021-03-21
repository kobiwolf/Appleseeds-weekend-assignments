import React from 'react';
import Button from '../Button/Button';
import './Dices.css';
export default class Dices extends React.Component {
  state = { first: 0, second: 0, double: false };
  displayDifferentImg = async () => {
    const num1 = Math.ceil(Math.random() * 6);
    const num2 = Math.ceil(Math.random() * 6);
    await this.setState({ first: num1, second: num2 });
    if (this.state.first === this.state.second) {
      await this.setState({ double: true });
      await setTimeout(() => this.props.endTurn(), 1000);
    }
    this.props.updateFunc(this.state.first + this.state.second);
  };
  doubleOrNormal = () => {
    if (this.state.double) {
      return (
        <div className="doublePage">
          <h1>snake eysss you had a double!!</h1>
        </div>
      );
    } else {
      return (
        <div className="diceDiv">
          <div className="dice">
            <div className={`pic${this.state.first}`}></div>
            <div className={`pic${this.state.second}`}></div>
          </div>
          <div className="buttons">
            <Button text="Roll" func={() => this.displayDifferentImg()} />
            <Button
              func={() => {
                this.props.upDateScore(this.props.player, this.props.value);
                this.props.func();
              }}
              text="finish turn"
            />
          </div>
        </div>
      );
    }
  };
  render() {
    return this.doubleOrNormal();
  }
}
