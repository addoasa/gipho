import React from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import Navigation from './Components/Navigation';
import ImagesContainer from './Components/ImagesContainer';
import './styles/App';
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      savedInput:'',
      savedImages: [],
      pageOffset:0,
      hitCount:0,
      imgsAreLoading:false,
      searchHistory:[],
      favorites: []
    };
    this.storeInput = this.storeInput.bind(this);
    this.storeImages = this.storeImages.bind(this);
    this.storeTotalHits = this.storeTotalHits.bind(this);
    this.saveSearchHistory = this.saveSearchHistory.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.updateInputWithHistory = this.updateInputWithHistory.bind(this);
  }
  componentDidMount(){
    //handle localstorage stuff
    console.log(localStorage);
    // if there are search history items in local storage save them in state for our application
    if(localStorage.getItem('giphoSearchHistory')){
      const foundSeachHistory = JSON.parse(localStorage.getItem('giphoSearchHistory'));
      this.setState({
        searchHistory: foundSeachHistory
      });
    }
    // if the user has favorites stored in their browser already, retrieve them and store them in state
    if(localStorage.getItem('giphoFavorites')){
      const foundFavorites = JSON.parse(localStorage.getItem('giphoFavorites'));
      this.setState({
        favorites: foundFavorites
      });
    }
  }

  storeInput(typedInput){
    this.setState({
      savedInput:typedInput
    });
    console.log(this.state.savedInput);
  }

  storeImages(imgsRecieved){
    this.setState({
      savedImages : imgsRecieved
    });
    console.log(this.state.savedImages);
  }

  storeTotalHits(hitsRecieved){
    this.setState({
      hitCount : hitsRecieved
    });
    console.log(this.state.hitCount);
  }

  saveSearchHistory(searchInput){
    // create a copy of old search history in state...
    const newArr = this.state.searchHistory.slice();
    
    // add the newly typed input to this new array
    newArr.push(searchInput);
    console.log('newArr', newArr)
    //asynchronously update state with new array
    this.setState({
      searchHistory: newArr
    });
    // directly update localstorage with new array
    localStorage.setItem('giphoSearchHistory', JSON.stringify(newArr));
  }

  addToFavorites(uniqueImageSrc){
    // create a copy of old search history in state...
    const newFavArr = this.state.favorites.slice();
    // add the newly favorited img src url to this new array
    newFavArr.push(uniqueImageSrc);
    console.log('newFavArr', newFavArr);
    // //asynchronously update state with new array
    this.setState({
      favorites: newFavArr
    });
    // // directly update localstorage with new array
    localStorage.setItem('giphoFavorites', JSON.stringify(newFavArr));
    console.log("item faved", localStorage)
  }
  updateInputWithHistory(historyItem){
    this.setState({
      savedInput:historyItem
    });
  }
  render(){
    return(
      <>
        <Header />
        <Form 
          storeImages={this.storeImages} 
          storeInput={this.storeInput} 
          savedInput= {this.state.savedInput} 
          storeTotalHits = {this.storeTotalHits} 
          pageOffset={this.state.pageOffset} 
          searchHistory={this.state.searchHistory} 
          saveSearchHistory= {this.saveSearchHistory} 
          updateInputWithHistory={this.updateInputWithHistory}
        />
        {/* Use ternary to determine if we have images in our state from our fetch, render our set of images and tell us how many images we found */}
        {this.state.savedImages.length > 0 
          ? 
          <main> 
            <Navigation 
              savedInput= {this.state.savedInput} 
              hitCount={this.state.hitCount}/> 
            <ImagesContainer 
              savedImages={this.state.savedImages} 
              addToFavorites={this.addToFavorites}/> 
          </main> 
          : 
          <></>}
      </>
    );
  }
}

export default App;