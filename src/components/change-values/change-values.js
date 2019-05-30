import React, { Component } from 'react';
import './change-values.css';

export default class classChangeValues extends Component {

    state = {
        currencies: [],
        inputVal1:0,
        inputVal2:0,
        value1:1,
        value2:1,
        abbr1:'BYR',
        abbr2:'BYR'
    };

    componentDidUpdate(prev){
        if(this.props !== prev)
        {
            this.takeData();
        }
    }


    takeData= async()=>{
        let {currencies} = this.props;
        await this.setState({currencies});
    };

    render(){
        const listOfAbbr = this.state.currencies.map((el=>{
            if (el.abbr === 'BYR')
            {
                return <option value= {el.abbr} key={el.abbr} selected> {el.abbr} {el.name} </option>
            }
            else
            {
                return <option value= {el.abbr} key={el.abbr}> {el.abbr} {el.name} </option>
            }
        }));
        let {value1,value2, inputVal1, inputVal2, abbr1, abbr2} = this.state;
        let matchingOnecurrency = `BYR в 1 ${abbr1} = ${value1.toFixed(5)} : BYR в 1 ${abbr2} = ${value2.toFixed(5)}`;


        const ChangeInputValue = (e) =>
        {
            if (e.target.id === 'inputVal1')
            {
                    let otherValue = (this.state.value1/this.state.value2)*e.target.value;
                this.setState({
                    inputVal1:e.target.value,
                    inputVal2:otherValue
                });
            }
            else if(e.target.id === 'inputVal2')
            {
                    let otherValue = (this.state.value2/this.state.value1)*e.target.value;
                this.setState({
                    inputVal1:otherValue,
                    inputVal2:e.target.value
                });
            }
        };

        const changeAbbr=(e)=>{

            let currencieValue = this.state.currencies.find((el)=>el.abbr === e.target.value);
          if (e.target.id === 'typeValue1')
          {
              this.setState({value1:currencieValue.value, abbr1:currencieValue.abbr},()=>{
                  let otherValue = (this.state.value1/this.state.value2)*this.state.inputVal1;
                  this.setState({inputVal2:otherValue});
              });

          }
          else  if (e.target.id === 'typeValue2')
          {
              this.setState({value2:currencieValue.value, abbr2:currencieValue.abbr}, ()=>{
                  let otherValue = (this.state.value2/this.state.value1)*this.state.inputVal2;
                  console.log(otherValue);
                  this.setState({inputVal1:otherValue})
              })
          }
        };

        const test=(e)=>{
          console.log(e);
        };

        return(
            <>
                <form className="form-group container fill formMatching">
                    <div className="row justify-content-md-center ">
                        <div className="col-sm-5">
                            <select className="custom-select" id="typeValue1" onChange={changeAbbr}>
                                {listOfAbbr}
                            </select>
                            <input type="text"
                                   className="form-control mt-2"
                                   id="inputVal1"
                                   onChange={ChangeInputValue}
                                   value={inputVal1}/>

                        </div>

                        <div className="col-sm-5 offset-sm-2">
                            <select className="custom-select" id="typeValue2" onChange={changeAbbr}>
                                {listOfAbbr}
                            </select>
                            <input type="text"
                                   className="form-control mt-2"
                                   id="inputVal2"
                                   onChange={ChangeInputValue}
                                   value={inputVal2}/>

                        </div>
                    </div>
                    <div className="col-sm-6 offset-sm-3 alert alert-dismissible alert-info mt-5 text-center">
                        <span className='bold'>{matchingOnecurrency}</span>
                    </div>
                </form>
            </>
        );
    }
}