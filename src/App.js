import React,{Component} from 'react';
import Pie2 from './components/Pie2';
import Barras from './components/Barras';
import Lineas from './components/Lineas';
import './App.css';
//const user="ken_bauer";
//const user="emamex98";
//const user="Snowden";
//realDonaldTrump
//const user="DepresiveDemon";
//const user="elonmusk";
const user="Diego_crdn";

//https://twitter.com/ken_bauer
class App extends Component{
  constructor(props){
    super(props);
    this.state= {
      items:[],
      isLoaded: false,
      sentimientos:{},
      words:{},
      dias:{},
      dates:{}
    }
    this.fetchDates=this.fetchDates.bind(this);
    this.cosa=this.cosa.bind(this);
    
  }

fetchSentiments(){
  fetch('http://127.0.0.1:5000/sentimientos?username='+user)
    .then(res => res.json())
    .then(json => {
      var res=json
      var dataColores=res["datasets"][0]["backgroundColor"];
      var dataData=res["datasets"][0]["data"];
      var datalabels=res["labels"];

      var mapita={
        labels: datalabels,
        datasets:[
          {
            label:'Population',
            data:dataData,
            backgroundColor:dataColores
          }
        ]
      }

        this.setState({
          sentimientos:mapita
        })
    })
}

fetchCommonWords(){
  
  fetch('http://127.0.0.1:5000/commonWords?username='+user)
    .then(res => res.json())
    .then(json => {

      var res=json
      var dataColores=res["datasets"][0]["backgroundColor"];
      var dataData=res["datasets"][0]["data"];
      var datalabels=res["labels"];
      
      var mapita={
        labels: datalabels,
        datasets:[
          {
            label:'Population',
            data:dataData,
            backgroundColor:dataColores
          }
        ]
      }

        this.setState({
          words:mapita
        })
    })
}

fetchDias(){
  fetch('http://127.0.0.1:5000/dias?username='+user)
    .then(res => res.json())
    .then(json => {

      var res=json
      var dataColores=res["datasets"][0]["backgroundColor"];
      var dataData=res["datasets"][0]["data"];
      var datalabels=res["labels"];

      var mapita={
        labels: datalabels,
        datasets:[
          {
            label:'Population',
            data:dataData,
            backgroundColor:dataColores
          }
        ]
      }

        this.setState({
          dias:mapita
        })

    })
}

fetchDates(){
  fetch("http://127.0.0.1:5000/dates?username="+user)
    .then(res => res.json())
    .then(json => {

      var res=json
      var dataColores=res["datasets"][0]["backgroundColor"];
      var dataData=res["datasets"][0]["data"];
      var datalabels=res["labels"];
    
      var mapita={
        labels: datalabels,
        datasets:[
          {
            label:'Population',
            data:dataData,
            backgroundColor:dataColores
          }
        ]
      }
        this.setState({
          isLoaded: true,
          dates:mapita,
        })

    })

}

cosa(){
  console.log(this.state);
}

componentDidMount(){
  this.fetchSentiments();
  this.fetchCommonWords();
  this.fetchDias();
  this.fetchDates();

}


  render(){

    var {isLoaded, items} = this.state;

    if(!isLoaded){
      return(
      <div className="App">
      <div className="App-header">
                    <h2> {this.user}</h2>
                  </div>
        </div>

      )}
    else{
      return(
        <div className="App">
        <div className="App-header">
          <h2> {"@"+user}</h2>
          <button onClick={this.cosa}>Update dates</button>

        </div>
        <Barras chartData={this.state.dias} location="Common days" legendPosition="bottom"/>

          <Pie2 chartData={this.state.sentimientos} location="Sentiments" legendPosition="bottom"/>         
          <Lineas chartData={this.state.dates} location="Tweets timeline" legendPosition="bottom"/>
          <Pie2 chartData={this.state.words} location="Common words" legendPosition="bottom"/>

        </div>
      );
    }

  }

}

/*

import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
import Pie2 from './components/Pie2';
import axios from 'axios';


class App extends React.Component {
  // State will apply to the posts object which is set to loading by default
  state = {
    posts: [],
    isLoading: true,
    errors: null
  };
  // Now we're going to make a request for data using axios
  getPosts() {
    axios
      // This is where the data is hosted
      .get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json")
      // Once we get a response and store data, let's change the loading state
      .then(response => {
        this.setState({
          posts: response.data.posts,
          isLoading: false
        });
      })
      // If we catch any errors connecting, let's update accordingly
      .catch(error => this.setState({ error, isLoading: false }));
  }
  // Let's our app know we're ready to render the data
  componentDidMount() {
    this.getPosts();
  }
  // Putting that data to use
  render() {
    const { isLoading, posts } = this.state;
    return (
      <React.Fragment>
        <h2>Random Post</h2>
        <div>
          {!isLoading ? (
            posts.map(post => {
              const { _id, title, content } = post;
              return (
                <div key={_id}>
                  <h2>{title}</h2>
                  <p>{content}</p>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

/*
class App extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{},
      sentimientos:{}
    }
  }

/*
  componentWillMount(){
   // this.getChartData();
   var mapa={
    labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    datasets:[
      {
        label:'Population',
        data:[
          617594,
          181045,
          153060,
          106519,
          105162,
          95072
        ],
        backgroundColor:[
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }
    ]
  }

  this.setState({
    chartData:mapa,
    sentimientos:mapa
  });

  }
*/

/*
  getChartData(){
    // Ajax calls here
    var mapa={
      labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
      datasets:[
        {
          label:'Population',
          data:[
            617594,
            181045,
            153060,
            106519,
            105162,
            95072
          ],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    }/*
    var mapa2={}
    axios.get('http://127.0.0.1:5000/sentimientos?username=Diego_crdn')
    .then( (response) => {
      var dataColores=response["data"]["datasets"][0]["backgroundColor"];
      var dataData=response["data"]["datasets"][0]["data"];
      var datalabels=response["data"]["labels"];
        mapa2={
          labels: datalabels,
          datasets:[
            {
              label:'Population',
              data:dataData,
              backgroundColor:dataColores
            }
          ]
        }
        console.log("created");
    })
    .catch( (error) => {
      console.log(error);
    }); 
    
    console.log("///////");
    console.log(mapa2);
    console.log(mapa);*/
    /*
    this.setState({
      chartData:mapa,
      sentimientos:mapa
    });

  }
  componentDidMount() {
    this.getChartData();
  }

  render() {
    console.log(console.log("jue", this.state.sentimientos));
    console.log(console.log("jue", this.state.chartData));

    return (
      <div className="App">
        <div className="App-header">
          <h2>Diego Issac Cardenas Aranda</h2>
          <h4>@diego_crdn </h4>
        </div>
        <Pie2 chartData={this.state.sentimientos} location="gdl" legendPosition="bottom"/>
        <Pie2 chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>

      </div>
    );
  }
}
*/
export default App;


/*
        <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>

#hashtags, --> pie    
#sentimiento, -->pie  

#fechas , --> grafica de lineas


#posted by day of the week getDias(user) --> barras

#most common words getCommonWords(user) -->


*/