import React, { Component } from 'react'

export default class HiredEmployees extends React.Component{
    constructor(props){
        super(props)
        this.state = { contractors: [], fetching: false, tabOpened: 'A' }
        this.alphabets = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        
    }

    viewByLastName(letter){
        this.setState({ tabOpened: letter })
        $.ajax({
            url: `/api/employees/contractors.json?key=${letter}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    contractors: data.contractors, fetching: false
                })
            }
        })
    }

    componentDidMount(){
        this.setState({ fetching: true })
        $.ajax({
            url: `/api/employees/contractors.json?key=${this.state.tabOpened}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    contractors: data.contractors, fetching: false
                })
            }
        })
    }

    render(){
        return(        
            <div className='panel-body mb25'>
                <div className='row pb10'>
                    <div className='col-md-12'>
                        <div className="tab">
                            {this.alphabets.map((letter, index) => 
                                <button className={`tablinks${this.state.tabOpened === letter ? ' active' : ''}`} onClick={this.viewByLastName.bind(this, letter)}>{letter}</button>
                            )}
                        </div>
                    </div>
                </div>
                {this.renderContractors()}
            </div>
            
        )
    }

    renderContractors(){
        if(this.state.fetching){
            return(
                <div className='row pt20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>    
                    </div>
                </div>
            )
        }
        if(this.state.contractors.length === 0){
            return(
                <div className='row mt30'>
                    <div className='col-md-10 col-md-offset-1'>
                        <center><p><i>No Contractors to show</i></p></center>
                    </div>
                </div>
            )
        }
        return(
            <div className='row'>
                {this.state.contractors.map((contractor, index) =>
                    <div key={index} className='col-md-6'>
                        <div className='panel colored'>
                            <div className='panel-body mb25'>
                                <div className='row mb25'>
                                    <div className='col-md-5'>
                                        <img style={{ marginTop: '20px', marginBottom: '10px', width: '70px', height: '70px' }} alt="avatar image" className="avatar-image" src={contractor.avatar}/>
                                    </div>
                                    <div className='col-md-7'>
                                        <h5 className='user-header'>{contractor.last_name}, {contractor.first_name}</h5>
                                        <p className='user-par'>Code number: {contractor.code_num}</p>
                                        <p className='user-par'>Email: {contractor.email}</p>
                                        <a href={`/${contractor.company.slug}/employees/timelogs?employee=${contractor.username}`} target='_blank' className='btn btn-primary view-timelog'>View timelogs</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}              
            </div>
        )
    }

}