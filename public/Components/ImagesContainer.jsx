import React from 'react';
import Image from './Image';
import '../styles/ImagesContainer';
class ImagesContainer extends React.Component{
  constructor(){
    super();
  }
  render(){
    const displayImages = this.props.savedImages.map((url,index)=>{
      return(
        <Image  
          url={url} 
          addToFavorites={this.props.addToFavorites} 
          favorites={this.props.favorites} 
          removeFromFavorites={this.props.removeFromFavorites}
          savedIds={this.props.savedIds[index]}
          getModalData={this.props.getModalData}
        />
      );
    });
    return(
      <>
        <h5 className="scroll-left">( scroll left )</h5>
        <section className ="images-container" >{displayImages}</section>
      </>
    );
  }
}

export default ImagesContainer;