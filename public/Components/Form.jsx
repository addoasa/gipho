import React from 'react';
import SearchHistory from './SearchHistory';

class Form extends React.Component{
  constructor(){
    super();
    this.state ={
      isUserSearching:false,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
  }
  componentDidMount(){
    //handle localstorage stuff
  } 

  changeHandler(event){
    this.props.storeInput(event.target.value);
  }

  submitHandler(event){
    event.preventDefault();
    this.props.userSearchedAndDoesNotWantFavs();
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw&q=${this.props.savedInput}&limit=25&offset=${this.props.pageOffset}`,{
      method: 'GET',
      headers:{
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response)=>{
        // translate response into readable json
        console.log(response);
        return response.json();
      })
      .then((readableResponse)=>{
        console.log(readableResponse);
        const gotImages = readableResponse.data;
        const totalHits = readableResponse.pagination.total_count;
        // iterate through JSON data and store the image urls recieved in state
        const newSetOfUrls = [];
        const newSetOfIds = [];
        for(let i = 0; i < gotImages.length; i++){
          newSetOfUrls.push(gotImages[i].images.fixed_height_downsampled.url);
          newSetOfIds.push(gotImages[i].id);
        } 
        this.props.storeImages(newSetOfUrls);
        this.props.storeGifIds(newSetOfIds);
        this.props.storeTotalHits(totalHits);
        this.props.saveSearchHistory(this.props.savedInput);
      });
  }
  
  focusHandler(){
    this.setState({
      isUserSearching:true
    });

  }
  blurHandler(){
    // When a user clicks way from the input text field the history box will disappear after 1 ms (leaving enough time for it to occupy the text field on click)
    setTimeout(()=>{
      console.log('hit');
      this.setState({
        isUserSearching:false,
      });
    },500);
  }

  
  render(){
    console.log(this.state.isUserSearching)

    return(
      <>
        <form onSubmit={this.submitHandler}>
          <input type="input" placeholder="Search Gif..."  onChange = {this.changeHandler} onFocus={this.focusHandler} value={this.props.savedInput} onBlur={this.blurHandler} ></input>
          {this.state.isUserSearching   
            ? 
            <SearchHistory 
              searchHistory={this.props.searchHistory} 
              updateInputWithHistory={this.props.updateInputWithHistory}
            /> 
            : 
            <></>}
          <button type="submit">Search</button>
        </form>
      </>
    );
  }
}

export default Form;