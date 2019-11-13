import React from 'react';

class Form extends React.Component{
  constructor(){
    super();
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  componentDidMount(){
    //handle localstorage stuff
  } 

  changeHandler(event){
    this.props.storeInput(event.target.value);
  }

  submitHandler(event){
    event.preventDefault();
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw&q=${this.props.storedInput}?limit=25`,{
      method: 'GET',
      headers:{
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response)=>{
        // translate response into readable json
        return response.json();
      })
      .then((readableResponse)=>{
        console.log(readableResponse);
        const gotImages = readableResponse.data;
        // iterate through JSON data and store the image urls recieved in state
        const newSetOfUrls = [];
        for(let i = 0; i < gotImages.length; i++){
          newSetOfUrls.push(gotImages[i].url);
        } 
        this.props.storeImages(newSetOfUrls);
      });
  }
  
  render(){
    return(
      <>
        <form onSubmit={this.submitHandler}>
          <input type="input" placeholder="Search Gif..." onChange = {this.changeHandler}></input>
          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}

export default Form;