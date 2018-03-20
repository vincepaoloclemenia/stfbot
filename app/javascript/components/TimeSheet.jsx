import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import Toggle from 'react-toggle'

export default class TimeSheet extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            lunchOut: false,
            open: false,
            userLog: null,
            hasLoggedIn: null,
            hasLoggedOut: null,
            hasTakenBreak: null,
            hasReturned: null
        }
    }

    handleLogging(){
        this.setState({ loggedIn: !this.state.loggedIn })
    }

    handleLunchOut(){
        this.setState({ lunchOut: !this.state.lunchOut })
    }
    
    componentDidMount(){
        $.ajax({
            url: '/api/timelogs.json',
            method: 'GET',
            success: (data) => {
                this.setState({
                    userLog: data.timeLog,
                    hasLoggedIn: data.hasLoggedIn,
                    hasLoggedOut: data.hasLoggedOut,
                    hasTakenBreak: data.hasTakenBreak,
                    hasReturned: data.hasReturned
                })
            }
        })
    }

    render(){
        return( 
            <li onClick={()=>this.setState({ open: true })} className='timesheet-link'>            
                <Modal classNames={{ modal: 'custom-modal'}} open={this.state.open} onClose={() => this.setState({ open: false })} little>
                    <h4 className='modal-header'>Your Timesheet for {this.props.dateToday}</h4>
                    <div className='row ml15 mr15'>   
                        <div className='col-md-6'>
                            <h5>{this.renderLabel()}</h5>
                        </div>  
                        <div className='col-md-6'>
                            <Toggle
                                defaultChecked={this.state.loggedIn}
                                className='custom-classname'
                                icons={{ checked: <i className='far fa-arrow-alt-circle-left fa-lg white' aria-hidden='true'></i>, unchecked: <i className='far fa-arrow-alt-circle-right fa-lg white' aria-hidden='true'></i> }}
                                onChange={this.handleLogging.bind(this)} 
                            />
                        </div>
                    </div>
                    <div className='row pt20 ml15 mr15'>   
                        <div className='col-md-6'>
                            <h5>{this.renderIfOnBreak()}</h5>
                        </div>  
                        <div className='col-md-6'>
                            <Toggle
                                defaultChecked={this.state.lunchOut}
                                className='custom-classname'
                                icons={{ checked: <i className='far fa-arrow-alt-circle-left fa-lg white' aria-hidden='true'></i>, unchecked: <i className='far fa-arrow-alt-circle-right fa-lg white' aria-hidden='true'></i> }}
                                onChange={this.handleLunchOut.bind(this)} 
                            />
                        </div>
                    </div>

                </Modal>      
            </li>       
        )
    }

    renderLabel(){
        if(this.state.loggedIn){
            return 'Logout'
        }
        return 'Login'
    }

    renderIfOnBreak(){
        if(this.state.lunchOut){
            return 'On Break'
        }
        return 'Has returned'
    }
}