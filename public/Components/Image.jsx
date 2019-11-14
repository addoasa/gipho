import React from 'react';
import '../styles/Image.css';
class Image extends React.Component{
  constructor(){
    super();
    this.state={
      isLoaded: false
    };
    this.doubleClickHandler = this.doubleClickHandler.bind(this);
  }
  componentDidMount(){
    this.setState = ({
      isLoaded : true
    });
    console.log("loaded");
  }
  doubleClickHandler(){
    this.props.addToFavorites(this.props.url);
  }
  render(){
    const styles ={
      'backgroundColor': 'red',
      'backgroundRepeat': 'no-repeat'
    };
    return(
      <div>
        <img className="image" alt="gify gif" src={this.props.url} onDoubleClick={this.doubleClickHandler}/>
      </div>
    );
  }
}

export default Image;