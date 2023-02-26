import React from "react";

const Header = (props) => {
  const { loggedInStudent } = props;

  return (
    <header className="App-header">
      <p>
        Hello, welcome
        {!loggedInStudent === false ? ` ${loggedInStudent}!` : "!"}
      </p>
    </header>
  );
};
export default Header;
