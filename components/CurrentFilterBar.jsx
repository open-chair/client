import React from 'react';

class CurrentFilterBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="CurrentFilterBar">
        <button onClick={this.props.navigateToProfile}>Back</button>
        This shows the current settings
      </div>
    )
  }

}

module.exports = CurrentFilterBar;