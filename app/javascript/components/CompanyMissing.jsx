import React, { Component } from 'react'
import { Line, Circle } from 'rc-progress'
var PropTypes = require("prop-types")
import ReactDOM from 'react-dom';


export default class CompanyMissing extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            percentage: 0, company: ''
        }
    }

    componentDidMount(){
        $.ajax({
            url: '/api/dashboard/check_company_profile.json',
            method: 'GET',
            success: (data) => {
                this.setState({ 
                    percentage: data.progress,
                    hasPicture: data.hasPicture,
                    hasOverView: data.hasOverview,
                    hasWhyJoinus: data.hasWhyJoinUs,
                    hasEmployers: data.hasEmployers,
                    hasFinanceAdmins: data.hasFinanceAdmins,
                    url: data.url
                })
            }
        })
    }

    options = {
        strokeWidth: 2
    }

    containerStyle = {
        width: '200px',
        height: '200px'
    }

    render(){
        return(
            <div>
                <Line percent={this.state.percentage} strokeWidth='3' strokeColor='#1D75A1' />
                <p>{this.state.percentage}% complete</p>
                <ul>
                    {this.renderAddDisplayPicture()}
                    {this.renderAddJoinUs()}
                    {this.renderAddOverView()}
                    {this.renderAddEmployers()}
                    {this.renderAddFinanceAdmins()}                
                </ul>
            </div>
        )
    }

    renderAddDisplayPicture(){
        if(this.state.hasPicture){ return }
        return(
            <li><a href={this.state.url}>Add Display Picture </a></li>
        )
    }

    renderAddOverView(){
        if(this.state.hasOverView){ return }
        return(
            <li><a href={this.state.url}>Add Overview </a></li>
        )
    }
    
    renderAddEmployers(){
        if(this.state.hasEmployers){ return }
        return(
            <li>You currently have no Employers. You may add <a href='/employees'>here</a></li>
        )
    }

    renderAddFinanceAdmins(){
        if(this.state.hasFinanceAdmins){ return }
        return(
            <li>You currently have no Finance Admins. You may add <a href='/employees'>here</a></li>
        )
    }

    renderAddJoinUs(){
        if(this.state.hasWhyJoinus){ return }
        return(
            <li><a href={this.state.url}>Encourage candidates to join your company!</a></li>
        )
    }

}