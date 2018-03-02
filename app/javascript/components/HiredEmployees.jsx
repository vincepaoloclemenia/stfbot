import React, { Component } from 'react'
const ReactDataGrid = require('react-data-grid')
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');

export default class HiredEmployees extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div className='panel'>
                <div className='panel-heading ml15 mr15 with-border'><h5><i className='fa fa-users lg pr1' aria-hidden='true'></i>Employees</h5>                
                </div>
                <div className='panel-body mb25'>
                    <div className='row'>
                        <div className='col-md-10 col-md-offset-1'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}