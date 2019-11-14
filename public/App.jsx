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
      searchHistory:[]
    };
    this.storeInput = this.storeInput.bind(this);
    this.storeImages = this.storeImages.bind(this);
    this.storeTotalHits = this.storeTotalHits.bind(this);
    this.saveSearchHistory = this.saveSearchHistory.bind(this);
  }
  componentDidMount(){
    console.log(localStorage);
    // if there are search history items in local storage save them in state for our application
    if(localStorage.getItem('giphoSearchHistory')){
      const foundSeachHistory = JSON.parse(localStorage.getItem('giphoSearchHistory'));
      this.setState({
        searchHistory: foundSeachHistory
      });
    }
    //handle localstorage stuff
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
  render(){
    return(
      <>
        <Header />
        <Form storeImages={this.storeImages} storeInput={this.storeInput} savedInput= {this.state.savedInput} storeTotalHits = {this.storeTotalHits} pageOffset={this.state.pageOffset} searchHistory={this.state.searchHistory} saveSearchHistory= {this.saveSearchHistory}/>
        {this.state.savedImages.length > 0 ? <main> <Navigation savedInput= {this.state.savedInput} hitCount={this.state.hitCount}/> <ImagesContainer savedImages={this.state.savedImages} /> </main> : <></>}
        
      </>
    );
  }
}

export default App;