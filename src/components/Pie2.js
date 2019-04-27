import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class Pie2 extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          width={100}
          height={20}
          options={{ maintainAspectRatio: false }}
          options={{
            title:{
              display:this.props.displayTitle,
              text:this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default Pie2;
