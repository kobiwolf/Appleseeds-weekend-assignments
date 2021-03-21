import React from 'react';
import './Button.css';

function Button(props) {
  return <button onClick={props.func}>{props.text}</button>;
}
export default Button;
