
class LeadBoard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      "full":[]
    }
    this.changeRecent = this.changeRecent.bind(this);
    this.changeAllTime = this.changeAllTime.bind(this);
  }
  componentDidMount(){
    var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    $.getJSON(url,function(data){
      console.log(data)
      this.setState({full:data});
    }.bind(this))
  }
  changeRecent(){
    var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    $.getJSON(url,function(data){
      this.setState({full:data});
    }.bind(this))
  }
  changeAllTime(){
    var url = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    $.getJSON(url,function(data){
      this.setState({full:data});
    }.bind(this))
  }
  rowBuilder(){
    var leaderData=this.state.full;
    var stateLength = leaderData.length;

    var buildRow=[];
    for(var i=0;i<stateLength;i++){
      buildRow.push(
        <tr className="tRow">
          <th scope="row">{i+1}</th>
          <td className="user"><img className="userPic" src={leaderData[i].img}/>{leaderData[i].username}</td>
          <td className="recentPoints">{leaderData[i].recent}</td>
          <td className="allTimePoints">{leaderData[i].alltime}</td>
         </tr>
      )
    }
    return buildRow
  }
  render(){
    return(
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
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
