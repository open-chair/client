import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.apiUrl = "";
  }
  //  Lifecycle method
  componentDidMount() {
    axios.get(this.apiUrl)
    .then((res) => {
      this.setState({});
    })
    .catch((error) => {
      console.error('axios error', error)
    })
  }

  render() {
    return (
    );
  }
}

export default Api;