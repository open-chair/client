import React from 'react';
import ResultOption from './ResultOption.jsx'

class ResultContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var restaurants = [
        {
          name: 'Town',
          seats: 12
        },
        {
          name: 'Madera - Rosewood',
          seats: 8
        },
        {
          name: 'Evvia',
          seats: 4
        },
        {
          name: 'Il Fornanio',
          seats: 11
        },
        {
          name: 'Chieftan',
          seats: 10
        },
        {
          name: 'Sam\'s Chowder House',
          seats: 3
        },
        {
          name: 'The Village Pub',
          seats: 7
        },
        {
          name: 'Scratch',
          seats: 6
        },
        {
          name: 'Reposado Restaurant',
          seats: 8
        },
        {
          name: 'Benihana',
          seats: 11
        },
      ];
    return (
      <div className="ResultContainer">
        {restaurants.map(function(restaurant, index) {
          return <ResultOption value={restaurant} key={index}/>;
        })}
      </div>
    )
  }

}

module.exports = ResultContainer;