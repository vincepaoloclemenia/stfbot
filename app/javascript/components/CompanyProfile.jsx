import React, { Component } from 'react'
import { Line, Circle } from 'rc-progress';

export default class CompanyProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            percentage: 0, 
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
                    hasOverView: data.hasOverView,
                    hasWhyJoinus: data.hasWhyJoinus,
                    hasEmployers: data.hasEmployers,
                    hasFinanceAdmins: data.hasFinanceAdmins
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
        var loc = `/companies/${this.props.slug}`
        if(this.state.hasPicture){ return }
        return(
            <li><a href={loc}>Add Display Picture </a></li>
        )
    }

    renderAddOverView(){
        var loc = `/companies/${this.props.slug}`
        if(this.state.hasOverView){ return }
        return(
            <li><a href={loc}>Add Overview </a></li>
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
        var loc = `/companies/${this.props.slug}`
        if(this.state.hasWhyJoinus){ return }
        return(
            <li><a href={loc}>Encourage candidates to join your company!</a></li>
        )
    }

}