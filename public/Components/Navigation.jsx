import React from 'react';

class Navigation extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
    <h3>Found {this.props.hitCount} results for: {this.props.savedInput}</h3>
    );
  }
}

export default Navigation;