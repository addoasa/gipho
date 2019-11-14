import React from 'react';
import '../styles/Image.css';
class Image extends React.Component{
  constructor(){
    super();
    this.state={
      isLoaded: false
    };
  }
  componentDidMount(){
    this.setState = ({
      isLoaded : true
    });
    console.log("loaded");
  }
  render(){
    const styles ={
      'backgroundColor': 'red',
      'backgroundRepeat': 'no-repeat'
    };
    return(
      <img className="image" alt="gify gif" src={this.props.url} />
    );
  }
}

export default Image;