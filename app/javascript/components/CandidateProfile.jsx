import React, { Component } from 'react'

export default class CandidateProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = { fetching: false }
    }

    componentDidMount(){
        console.log(this.props.user)
    }

    render(){

        return(
            <div className='profile-container'>
                <div className='col-md-5'>
                    <div className='profile-left-panel'>                        
                        <div className='panel'>
                            <div className='panel-body'>
                                <div className='row pb20 pt20'>
                                    <div className='avatar-container'>
                                        <img className='img-responsive profile-avatar' alt={this.props.user.full_name} src={this.props.user.avatar} />
                                    </div>
                                    <div className='user-basic-info'>
                                        <h4 className='user-profile'>{this.props.user.full_name}</h4> 
                                        <ul className='user-credentials'>
                                            <li className='user-info'><i className="fa fa-map-marker fa-lg color-green stay-left" aria-hidden="true"></i><span className='gap1'>{this.renderLocation(this.props.user.country, this.props.user.state, this.props.user.city)}</span></li>
                                            <li className='user-info'><i className="fa fa-address-card-o fa-lg with-color stay-left" aria-hidden="true"></i><span className='gap1'>{this.props.user.email}</span></li>
                                            <li className='user-info'><i className="fa fa-envelope-o fa-lg with-color stay-left" aria-hidden="true"></i><span className='gap1'>{this.renderContact(this.props.user.contact)}</span></li>
                                        </ul>  
                                    </div>
                                    {this.renderCurrentJob(this.props.user.current_employment, this.props.user.employed)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className='profile-information'>
                        
                    </div>       
                </div>
            </div>   
        )

    }

    renderCurrentJob(ce, emp){
        if(ce && !emp){
            return(
                <div className='job-container'>
                    <h4>{job.title} at {job.company_name}</h4>
                    <p>{job}</p>
                </div>
            )
        }
    }
    

    renderLocation(country, state, city){
        if(country && state && city){
            return `${country}, ${state}, ${city}`
        }

        return(
            <i className='null'>No address yet</i> 
        )
    }

    renderContact(contact){
        if(contact){
            return(
                contact
            )
        }
        return(
            <i className='null'>No contact yet</i> 
        )
    }
}