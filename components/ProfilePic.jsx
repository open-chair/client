import React from 'react';
import ReactDOM from 'react-dom';


class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img className="pic" src={"images/userProfile.png"}/>
    );
  }
}

export default ProfilePic;