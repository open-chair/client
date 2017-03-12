import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Profile from './Profile.jsx'
import ResultPage from './ResultPage.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'Profile',
      restaurants: []
    };
    this.navigateToProfile = this.navigateToProfile.bind(this);
    this.navigateToResults = this.navigateToResults.bind(this);
  }

  componentDidMount() {
    axios.get('/api/restaurants')
    .then(function(restaurantObj) {
      this.setState({restaurants: restaurantObj});
    })
    .catch(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }

  navigateToProfile(e) {
    this.setState({current: 'Profile'});
  }

  navigateToResults(e, config) {
    console.log(config);


    this.setState({current: 'Results'});
  }



  render() {
        {if (this.state.current === 'Profile') {
          return <Profile navigateToResults={this.navigateToResults}/>
        } else if (this.state.current === 'Results') {
          return <ResultPage navigateToProfile={this.navigateToProfile} restaurants={this.state.restaurants}/>
        }
      }
  }
}

export default App;
