import React from 'react';
import '../styles/Navigation';
class Navigation extends React.Component{
  constructor(){
    super();
    this.state={
      searchTerm:''
    };
  }
  componentDidMount(){
    // Saving the input here at the time of the fetch request is done to prevent the "results for" statement from dynamically changing whenever user types into the input field
    this.setState({
      searchTerm: this.props.savedInput
    });
  }
  componentDidUpdate(){
    // If the user switches from looking at favorites to searching for a term, this function will allow the serch term written to be freshly updated
    if(this.props.savedInput !== this.state.searchTerm){
      this.setState({
        searchTerm: this.props.savedInput
      });
    }
  }  

  render(){
    return(
      <>
        {this.props.userAskedForFavs ? 
          <div className="navigation">
            <h2>Favorites</h2>
            <h3>{this.props.favorites.length} gifs found</h3>
          </div> 
          : 
          <div className="navigation">
            <h3>Found {this.props.hitCount} results for : {this.state.searchTerm}</h3>
        </div> }

      </>  
    );
  }
}

export default Navigation;