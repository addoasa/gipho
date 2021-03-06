import React from 'react';
import '../styles/SearchHistory';
class SearchHistory extends React.Component{
  constructor(){
    super();
    this.addInputWithClick = this.addInputWithClick.bind(this);
  }
  addInputWithClick(event){
    this.props.updateInputWithHistory(event.target.innerText);
  }
  render(){
    const historyArr = this.props.searchHistory;
    let setOfhistorySearchesToRender = [];
    // check if the user may have searched the same item multiple times to avoid printing the history item multiple times
    const findDuplicates = {};
    if(historyArr.length > 0){
      for(let i = 0; i < historyArr.length; i++){
        if(findDuplicates[historyArr[i]]){
          findDuplicates[historyArr[i]]++;
        }else{
          findDuplicates[historyArr[i]] = 1;
        }
      }
    }
    console.log(findDuplicates);
    for(let key in findDuplicates){
      // This will limit the history to showing only the last 10 most recent searches
      if(setOfhistorySearchesToRender.length !== 10 ){
        // insert the searches in the order of most recently searched using unshift
        setOfhistorySearchesToRender.unshift(<h4 className = {'history-item'} onClick={this.addInputWithClick}>{key}</h4>
        );
      }else{
        // once we hit 10 items break the for in loop
        break;
      }
    }
 
    return(
      
      <div className="history-container">
        {setOfhistorySearchesToRender}
      </div>
      
    );
  }
}

export default SearchHistory;