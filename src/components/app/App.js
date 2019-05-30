import React, { Component } from 'react';
import './App.css';

import Header from './../header/header'
import Footer from './../footer/footer'
import ChangeValues from './../change-values/change-values'
import ValuesHistory from './../values-history/values-history'
import MyService from './../services/myService'

class App extends Component {

    state={
        currencies:[]
    };

    myService = new MyService();

    componentDidMount( )
    {
        this.updateCurrenciesId();
    }

    updateCurrenciesId = () => {
        this.myService.getCurrenciesLatest()
            .then(this.setCurrencies)
            .then(()=>{
            })
            .catch((err)=>{
                console.log('ошибка в updateCurrenciesId');
                console.log(err);
            });

    };

    setCurrencies=(data)=>{
        data.push( {
            id:0,
            name:'Белорусский рубль',
            abbr:'BYR',
            value: 1,
            scale:1
        });
        this.setState({currencies:data});
    };

  render() {

    let currencies = this.state.currencies.map(el=>{
        return(
            {
                abbr:el.abbr, value: el.value/el.scale, name: el.name
            }
        );
    });

    return (
        <>
            <Header />
            <ValuesHistory />
            <ChangeValues currencies={currencies}/>
            <Footer />
        </>
    );
  }
}

export default App;
