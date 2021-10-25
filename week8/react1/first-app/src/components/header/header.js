import React, { useState } from "react";
import "./header.css";

const Header = (props) => {
  const [value, setValue] = useState("");
  console.log(props.arr);
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="default.asp">Home</a>
        </li>
        <li>
          <a href="news.asp">News</a>
        </li>
        <li>
          <a href="contact.asp">Contact</a>
        </li>
        <li>
          <a href="about.asp">About</a>
        </li>
        <li>{props.name}</li>
        <input type="text" onChange={(e) => setValue(e.target.value)}></input>
        <button onClick={() => props.addTask(value)}>Add</button>
      </ul>
    </nav>
  );
};

export default Header;

//rsc
