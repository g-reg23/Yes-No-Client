import React, { Component } from 'react';
import { VictoryPie } from 'victory';
import '../../App.css';



class PieChart extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      showPieChart: false
    };
  }
  toggle() {
    if (this.state.showPieChart === true) {
      window.scrollTo(window.pageXOffset, (window.pageYOffset - 200))
    } else {
      window.scrollTo(window.pageXOffset, (window.pageYOffset + 200))
    }
    this.setState({
      showPieChart: !this.state.showPieChart
    });
  }
  render() {
    // CALCULATE PIE CHART STATS AND % YES/NO.
    let total = this.props.yes + this.props.no;
    let yes = (this.props.yes/total)*360;
    let no = (this.props.no/total)*360;
    let avgYes = ((this.props.yes/total) * 100).toFixed(2) + '% Yes';
    let avgNo = ((this.props.no/total) * 100).toFixed(2) + '% No';
    // SHOW HIGHER AVERAGE. YES VS NO.
    // let avg = avgYes > avgNo ? avgYes : avgNo;
    // SUMMARIZE DATA AND SHOW PIE CHART IF ANY VOTES. OTHERWISE SHOW 'No Votes Yet.'
    let pie = total > 0 ?
        <div className='pieDiv' onClick={this.toggle}>
          <div className='pieResultsDiv'>
            <h5 className='average'>{avgYes}</h5><h5 style={{textAlign:'center'}} className='total'>{avgNo}</h5>
            <h5 className='total' style={{textAlign:'center'}}>{total} Total Votes</h5>
          </div>
          <div className='innerPieDiv'>
            <VictoryPie data={[
              {x:'Yes', y: yes},
              {x:'No', y: no }
            ]} height={200} className='pieChart' labelRadius={55}/>
          </div>
        </div> : <p onClick={this.toggle} className='clickable white'>No votes yet!!</p>
    let click = this.state.showPieChart === false ? <h6 className='clickable clickOff' style={{color:'white'}} onClick={this.toggle}><u>View Results</u></h6> : pie;
    return click;
  }
}

export default PieChart;
