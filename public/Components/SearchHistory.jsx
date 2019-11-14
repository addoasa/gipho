import React from 'react';

class SearchHistory extends React.Component{
  constructor(){
    super();
  }

  render(){
    const historyArr = this.props.searchHistory;
    let setOfhistorySearchesToRender = [];
    console.log({ historyArr })
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
        setOfhistorySearchesToRender.push(<h4>{key}</h4>);
    }
  
    // }else{
    //   setOfHistorySearches = '';
    // }
    // setOfHistorySearches = this.props.searchHistory.map((historyItem,index)=>{
    //     return <h3 className ="history-item">{historyItem}</h3>;})
  
    return(
      <>{setOfhistorySearchesToRender}</>
     
    );
  }
}

export default SearchHistory;