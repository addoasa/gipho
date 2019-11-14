import React from 'react';
import '../styles/Image.css';
class Image extends React.Component{
  constructor(){
    super();
    this.state={
      isLoaded: false,
      isFavorited: false 
    };
    this.doubleClickHandler = this.doubleClickHandler.bind(this);
    this.modalClickHandler = this.modalClickHandler.bind(this);
  }
  componentDidMount(){
    this.setState({
      isLoaded : true
    });
    console.log('loaded');
  }

  doubleClickHandler(){
    const copyOfFavs = this.props.favorites.slice();
    console.log('before', { copyOfFavs });
    if(!copyOfFavs.includes(event.target.src)){
      this.props.addToFavorites(this.props.url);
      this.setState({
        isFavorited:true
      });
    }else{
      for(let i = 0; i <copyOfFavs.length; i++){
        if(copyOfFavs[i] === event.target.src){
          copyOfFavs.splice(i,1);
        }
      }
      console.log('after',{ copyOfFavs });
      this.props.removeFromFavorites(copyOfFavs);
      this.setState({
        isFavorited:false
      });
    }
  }
  
  modalClickHandler(event){
    this.props.getModalData(event.target.id);
  }

  render(){

    return(
      <div className="image-and-menu">
        <div className={this.state.isFavorited ? 'like-layer liked-img' : 'like-layer unliked-img'}   ></div>
        <div className={'like-layer'}></div>
        <img className="image" alt="gify gif" src={this.props.url} onDoubleClick={this.doubleClickHandler}/>
        <div id = {this.props.savedIds} className ="menu-icon" onClick={this.modalClickHandler}></div>
      </div>
    );
  }
}

export default Image;