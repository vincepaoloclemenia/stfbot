import React, { Component } from 'react'

export default class HiredEmployees extends React.Component{
    constructor(props){
        super(props)
        this.state = { contractors: [], fetching: false }
    }

    componentDidMount(){
        this.setState({ fetching: true })
        $.ajax({
            url: '/api/employees/contractors.json',
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
                {this.renderContractors()}
            </div>
            
        )
    }

    renderContractors(){
        if(this.state.contractors.length === 0){
            return(
                <div className='row'>
                    <div className='col-md-10 col-md-offset-1'>
                        <center><p><i>No Contractors Yet</i></p></center>
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