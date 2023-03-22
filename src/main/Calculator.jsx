import React, {Component} from "react";
import "./Calculator.css";
import Button  from "../components/button";
import Display from "../components/display";

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation:null,
    values: [0,0],
    currentIndex:0
};

export default class Calculator extends Component{

    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    state = {...initialState};

    clearMemory(){
        this.setState({...initialState});
    }

    setOperation(operator){
        if(this.state.currentIndex === 0){
            this.setState({
                operation:operator, 
                currentIndex: 1,
                clearDisplay:true});
        }else{
            const equal = operator === "=";
            const currentOp = this.state.operation;
            const values = [...this.state.values];

            try{
                // eslint-disable-next-line no-eval
                values[0] = eval(`${values[0]} ${currentOp} ${values[1]}`);
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                return
                }
            }catch(e){
                values[0] = this.state.values[0]
            }
            
            values[1] = 0;

            this.setState({
                displayValue:values[0],
                operation:equal ? null : operator,
                current: equal ? 0 : 1,
                clearDisplay: !equal,
                values
            })
        }
    }

    addDigit(digit){
        if(digit === "." && this.state.displayValue.includes(".")){
            return;
        }

        const clearDisplay = this.state.displayValue === "0" ||
            this.state.clearDisplay;
        const currentValue = clearDisplay ? "" : this.state.displayValue;
        const displayValue = currentValue + digit;
        this.setState({displayValue, clearDisplay:false});

        if(digit !== "."){
            const index = this.state.currentIndex;
            const newNumber = parseFloat(displayValue);
            const values = [...this.state.values];
            values[index] = newNumber;
            this.setState({values});
        }
    }

    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/"  click={this.setOperation} operation/>
                <Button label="7"  click={this.addDigit}/>
                <Button label="8"  click={this.addDigit}/>
                <Button label="9"  click={this.addDigit}/>
                <Button label="*"  click={this.setOperation} operation/>
                <Button label="4"  click={this.addDigit}/>
                <Button label="5"  click={this.addDigit}/>
                <Button label="6"  click={this.addDigit}/>
                <Button label="-"  click={this.setOperation} operation/>
                <Button label="1"  click={this.addDigit}/>
                <Button label="2"  click={this.addDigit}/>
                <Button label="3"  click={this.addDigit}/>
                <Button label="+"  click={this.setOperation} operation/>
                <Button label="0"  click={this.addDigit} double/>
                <Button label="."  click={this.addDigit} />
                <Button label="="  click={this.setOperation} operation/>
            </div>
        )
    }
}