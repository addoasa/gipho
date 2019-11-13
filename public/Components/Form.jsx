import React from 'react';

class Form extends React.Component{
  constructor(){
    super();
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount(){
    //handle localstorage stuff
  }
  submitHandler(event){
    event.preventDefault();
  }
  render(){
    return(
      <>
        <form onSubmit={this.submitHandler}>
          <input type="input" placeholder="Search Gif..."></input>
          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}

export default Form;