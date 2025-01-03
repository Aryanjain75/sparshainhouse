// components/Button.jsx
import React from 'react';

const Button = ({ text, type }) => (
  <button
    type={type}
    className="w-[20rem] m-4 rounded-full  p-[0.5rem] text-2xl" style={{backgroundColor:"red",margin:"1rem",padding:"0.5rem",width:"20rem"}}
  >
    {text}
  </button>
);

export default Button;
