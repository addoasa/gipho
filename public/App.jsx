import React from 'react';
import Form from './Components/Form';
import Navigation from './Components/Navigation';
import ImagesContainer from './Components/ImagesContainer';
import ImageModal from './Components/ImageModal';
import './styles/App';
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      savedInput:'',
      savedImages: [],
      savedIds:[],
      pageOffset:0,
      hitCount:0,
      imgsAreLoading:false,
      searchHistory:[],
      favorites: [],
      userAskedForFavs:false,
      showModal: false,
      currentModalId:''
    };
    this.storeInput = this.storeInput.bind(this);
    this.storeImages = this.storeImages.bind(this);
    this.storeGifIds = this.storeGifIds.bind(this);
    this.storeTotalHits = this.storeTotalHits.bind(this);
    this.saveSearchHistory = this.saveSearchHistory.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.showFavoriteGifs = this.showFavoriteGifs.bind(this);
    this.userSearchedAndDoesNotWantFavs = this.userSearchedAndDoesNotWantFavs.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.updateInputWithHistory = this.updateInputWithHistory.bind(this);
    this.getModalData = this.getModalData.bind(this);
    this.invalidateModal = this.invalidateModal.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
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

  storeGifIds(idsRecieved){
    this.setState({
      savedIds : idsRecieved
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
    console.log('newArr', newArr);
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
    console.log('item faved', localStorage);
  }

  showFavoriteGifs(){
    // if the favorite button is clicked use the earlier method for populating the dom with favorites array that had been synced with localstorage favorites on componentdidmount
    this.storeImages(this.state.favorites);
    this.setState({
      userAskedForFavs:true
    });
  }

  userSearchedAndDoesNotWantFavs(){
    this.setState({
      userAskedForFavs:false
    });
  }
  removeFromFavorites(arrWithAFavRemoved){
    this.setState({
      favorites: arrWithAFavRemoved
    });
    console.log({ arrWithAFavRemoved });
    localStorage.setItem('giphoFavorites', JSON.stringify(arrWithAFavRemoved));
    console.log('item unfaved', localStorage);
    // this.showFavoriteGifs();
    this.storeImages(arrWithAFavRemoved);
  
  }
  updateInputWithHistory(historyItem){
    this.setState({
      savedInput:historyItem
    });
  }

  getModalData(gotId){
    this.setState({
      currentModalId: gotId,
      showModal: true
    });
  }

  invalidateModal(){
    this.setState({
      showModal:false
    });
  }
  deleteHistory(){
    this.setState({
      searchHistory:[]
    });
    localStorage.removeItem('giphoSearchHistory')

  }
  render(){
    return(
      <>
        <div className = 'get-favorites-container'>
          <button className = 'favorites-btn' onClick={this.showFavoriteGifs}>FAVORITES</button>
          <div className = 'favorites-icon' onClick={this.showFavoriteGifs}></div>
        </div>
        <button className="clearBtn" onClick={this.deleteHistory}>Clear History </button>
        <Form 
          storeImages={this.storeImages} 
          storeGifIds={this.storeGifIds}
          storeInput={this.storeInput} 
          savedInput= {this.state.savedInput} 
          storeTotalHits = {this.storeTotalHits} 
          pageOffset={this.state.pageOffset} 
          searchHistory={this.state.searchHistory} 
          saveSearchHistory= {this.saveSearchHistory} 
          updateInputWithHistory={this.updateInputWithHistory}
          userSearchedAndDoesNotWantFavs={this.userSearchedAndDoesNotWantFavs}
        />
        {/* Use ternary to determine if we have images in our state from our fetch, render our set of images and tell us how many images we found */}
        {this.state.savedImages.length > 0 ? 
          <main> 
            <Navigation 
              savedInput= {this.state.savedInput} 
              hitCount={this.state.hitCount}
              userAskedForFavs={this.state.userAskedForFavs}
              favorites = {this.state.favorites}
            />
              
            <ImagesContainer 
              savedImages={this.state.savedImages} 
              savedIds={this.state.savedIds}
              addToFavorites={this.addToFavorites}
              favorites = {this.state.favorites}
              removeFromFavorites = {this.removeFromFavorites}
              getModalData= {this.getModalData}
            /> 
          </main> 
          : 
          <></>}
        {this.state.showModal ?
          <ImageModal currentModalId= {this.state.currentModalId} invalidateModal= {this.invalidateModal}/>
          : 
          <></>} 
      </>
    );
  }
}

export default App;