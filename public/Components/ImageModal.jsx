import React from 'react';

class ImageModal extends React.Component{
  constructor(){
    super();
    this.state={
      imageUrl:'',
      imageName:''
    };
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount(){
    fetch(`https://api.giphy.com/v1/gifs/${this.props.currentModalId}?api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw&ids=1poVpywqWXhUNhVIqq`,{
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
        console.log('modal', readableResponse);
        const foundGif = readableResponse.data.images.original_mp4.mp4;
        const foundGifTitle = readableResponse.data.title;
        this.setState({
          imageUrl: foundGif,
          imageName: foundGifTitle
        });
      });
  }
  closeModal(){
    this.props.invalidateModal();
  }
  render(){
    console.log('BOOOOOOOOOOOOOOOOOM',this.props.currentModalId);
    return(
      <div className= 'modal-container'>
        <h2 onClick={this.closeModal}>x</h2>
        <video width="320" height="240" controls src={this.state.imageUrl}>
        </video>
        <h1>{this.state.imageName}</h1>
      </div>
    );
  }
}

export default ImageModal;