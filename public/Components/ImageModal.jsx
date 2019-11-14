import React from 'react';

class ImageModal extends React.Component{
  constructor(){
    super();
  }
  // componentDidMount(){
  //   fetch(`https://api.giphy.com/v1/gifs/search?api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw&gif_id=${this.props.clickedImg}`,{
  //     method: 'GET',
  //     headers:{
  //       'content-type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //     .then((response)=>{
  //       // translate response into readable json
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((readableResponse)=>{
  //       console.log(readableResponse);
  //       const foundImg = readableResponse.data;
  // }
  render(){
    return(
      <h1>Hi world</h1>
    );
  }
}

export default ImageModal;