import React, { Component } from 'react'
import myService from '../../services/myService'
import './values-history.css'
import MyService from "../../services/myService";

export default class ValuesHistory extends Component {

    myService = new MyService();

    componentDidMount( )
    {
        this.myService.getCurrencyHistory(145).then((data)=>{
            console.log(data);
        });
    }

    render()
    {
        return (
            <span>values-history</span>
        )
    }
};
