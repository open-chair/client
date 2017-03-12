import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePic from './ProfilePic.jsx';
import ProfileInfo from './ProfileInfo.jsx';
import Options from './options.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile">
        
          
          <Options navigateToResults={this.props.navigateToResults}/>
        
      </div>
    );
  }
}

export default Profile;