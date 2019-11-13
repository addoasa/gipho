import React from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import Navigation from './Components/Navigation';
import './styles/App';
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      savedInput:'',
      savedImages: [],
      pageOffset:0
    };
    this.storeInput = this.storeInput.bind(this);
    this.storeImages = this.storeImages.bind(this);
  }
  componentDidMount(){
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
  render(){
    return(
      <>
        <Header />
        <Form storeImages={this.storeImages} storeInput={this.storeInput} savedInput= {this.state.savedInput} />
        {this.state.savedImages} ? <Navigation /> : <></>
        <ImagesContainer />
      </>
    );
  }
}

export default App;