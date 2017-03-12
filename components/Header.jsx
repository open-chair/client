import React from 'react';
import ReactDOM from 'react-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header">
        <a href="/"><img src={"images/logo.png"}/></a>
      </div>
    );
  }
}

export default Header;