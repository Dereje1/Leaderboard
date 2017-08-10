
class LeadBoard extends React.Component{
  constructor(props){
    super(props);
    //start with empty sate and use componentDidMount function which only loads once to load initial state
    this.state={
      "full":[]
    }
    //bindings for internal function
    this.changeRecent = this.changeRecent.bind(this);
    this.changeAllTime = this.changeAllTime.bind(this);
  }
  componentDidMount(){
    var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    //note "this" not recognized for getJSON unless explicitly bound to success function called after data retrieval
    $.getJSON(url,function(data){
      this.setState({full:data});
    }.bind(this))//<-- must include!!
  }
  //called on recent period click
  changeRecent(){
    var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    $.getJSON(url,function(data){
      this.setState({full:data});
    }.bind(this))
  }
  //called on alltime click
  changeAllTime(){
    var url = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    $.getJSON(url,function(data){
      this.setState({full:data});
    }.bind(this))
  }
  //for building all the rows of table
  rowBuilder(){
    var leaderData=this.state.full;
    //array to collect row information, after returning react will recognized
    //array and display as rows
    var buildRow=[];
    for(var i=0;i<leaderData.length;i++){
      //push jsx row objects after retrivieng pertinent data from JSON
      buildRow.push(
        <tr className="tRow">
          <th scope="row">{i+1}</th>
          <td className="user"><img className="userPic" src={leaderData[i].img}/> <a href={"https://www.freecodecamp.com/"+leaderData[i].username} target="_blank"><strong>{leaderData[i].username}</strong></a></td>
          <td className="recentPoints">{leaderData[i].recent}</td>
          <td className="allTimePoints">{leaderData[i].alltime}</td>
         </tr>
      );
    }
    return buildRow;
  }
  //renders bootstrap table
  render(){
    return(
      <div>
        <div className="title text-center">freeCodeCamp Leaderboard</div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th className="user">Camper Name</th>
              <th><a href="#" onClick={this.changeRecent}>Points in past 30 days</a></th>
              <th><a href="#" onClick={this.changeAllTime}>All time points</a></th>
            </tr>
          </thead>
          <tbody>{this.rowBuilder()}</tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(
  <LeadBoard/>,
  document.getElementById('app')
);
