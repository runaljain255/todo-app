import React, { Component } from 'react';
import './Counter.css'
import PropTypes from 'prop-types'

class Counter extends Component {

    constructor(){
        super();
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this) // with arrow function binding is not needed
    }

    render() {
        
       
      return (
        <div className="counter">
          <CounterButton incrementMethod={this.increment} decreamentMethod={this.decreament}></CounterButton>
          <CounterButton by={5} incrementMethod={this.increment} decreamentMethod={this.decreament}></CounterButton>
          <CounterButton by={10} incrementMethod={this.increment} decreamentMethod={this.decreament}></CounterButton>
          <span className="count"/* */>{this.state.counter}</span>
          <button className="reset" onClick={this.reset} /*style = {style}*/>Reset</button>
      
        </div>
      );
    }

    increment(by){

        this.setState(
            (prevState)=>{ 
                return{
                counter: prevState.counter + by //it is a merge operations
                }
            }
        );
    }

    decreament = (by) => {

        this.setState(
            (prevState)=>{ 
                return{
                counter: prevState.counter - by //it is a merge operations
                }
            }
        );
    }

    reset = () => {
        this.setState(
            (prevState) => {
                return{
                    counter: 0
                }
            }
        )
    }
  }
  
class CounterButton extends Component {
    //Define initial state i a constructore
    //state => counter 0

    // constructor(){
    //     super();
    //     // this.increment = this.increment.bind(this) // with arrow function binding is not needed
    // }


//   render = () => {
    render(){
    // const style = {fontSize : "50px",padding: "15px 30px"};
    return (
      <div className="counterButton">
        <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
        <button onClick={() => this.props.decreamentMethod(this.props.by)}>-{this.props.by}</button>
        </div>
    );
    }

    // increment(){
    // this.props.incrementMethod(this.props.by);
    // }

    // decreament=()=>{
    //     this.props.decreamentMethod(this.props.by);
    // }
  
}

CounterButton.defaultProps={
    by:1
}

CounterButton.propTypes = {
    by: PropTypes.number
}
export default Counter;