
class LeadBoard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      "full":retrievData()
    }
    this.changeRecent = this.changeRecent.bind(this);
    this.changeAllTime = this.changeAllTime.bind(this);
  }
  changeRecent(){
    this.setState({full:retrievData()});
  }
  changeAllTime(){
    this.setState({full:retrievData("Alltime")});
  }
  rowBuilder(){
    var leaderData=this.state.full;
    var stateLength = leaderData.length;

    var buildRow=[];
    for(var i=0;i<stateLength;i++){
      buildRow.push(
        <tr>
          <th scope="row">{i+1}</th>
          <td>{leaderData[i].username}</td>
          <td>{leaderData[i].recent}</td>
          <td>{leaderData[i].alltime}</td>
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

function retrievData(targTime = "recent"){
    if (targTime==="recent"){
      var targetUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    }
    else{
      var targetUrl = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    }

    var mydata = [];
    $.ajax({
      url: targetUrl,
      async: false,
      dataType: 'json',
      success: function (leaderData) {

        mydata = leaderData;
      }
    });

    return mydata;
  }
