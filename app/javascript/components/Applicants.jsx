import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

export default class Applicants extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            unreadApplicants: [],
            readApplicants: [],
            fetching: false,
            job: this.props.job,
            view: false
        }
    }

    markAsRead(application){
        $.ajax({
            url: `/api/jobs/mark_as_read?id=${application.job_id}&application_id=${application.id}`,
            method: 'PATCH',
            success: () => {
                this.props.onMarkingRead()
            }
        })
    }
    
    unreadApplication(application){
        $.ajax({
            url: `/api/jobs/unread?id=${application.job_id}&application_id=${application.id}`,
            method: 'PATCH',
            success: () => {
                this.props.onMarkingRead()
            }
        })
    }

    markAsUnqualified(application){
        $.ajax({
            url: `/api/jobs/reject_application?=id=${application.job_id}&application_id=${application.id}`,
            method: 'PATCH',
            success: () => {
                this.props.onMarkingRead()
            }
        })
    }

    firstTab(){
        this.setState({ view: false })
    }

    secondTab(){
        this.setState({ view: true })
    }

    componentDidMount(){
        this.fetchData(this.state.job)
    }

    componentWillReceiveProps(nextProps){
        this.setState({ job: nextProps.job, view: false })
        this.fetchData(nextProps.job)
    }

    render(){
        if(this.state.fetching)
        return(
            <div className={this.props.class}>
                <div className='panel'>
                    <div className='panel-heading ml15 mr15'><h5><i className="fa fa fa-users pr1" aria-hidden="true"></i>Applicants for {this.props.job.title} post</h5></div>
                    <div className='panel-body'>
                        <div className='row m70'>
                            <center><i className="fa fa-spinner fa-pulse with-color fa-2x fa-fw"></i></center>
                        </div>
                    </div>
                </div>
            </div>
        )
        return(
            <div className={this.props.class}>
                <div className='applicants-container'>
                    <div className='hide-scroll'>
                        <div className='panel'>
                            <button onClick={() => this.props.hide()} className='btn btn-primary close pull-right'><i className='fa fa-window-close-o' aria-hidden='true'></i></button>
                            <div className='panel-heading ml15 mr15'><h5><i className="fa fa fa-users pr1" aria-hidden="true"></i>Applicants for {this.props.job.title} post</h5></div>
                            <div className='panel-body'>
                                <div className='row pb20'>
                                    <div className='row ml15 pb20'>
                                        <div className='col-md-12'>
                                            <div className="tab">
                                                <button className={`tablinks${this.state.view ? '' : ' active'}`} onClick={this.firstTab.bind(this)}>Unread Applications</button>
                                                <button className={`tablinks${this.state.view ? ' active' : ''}`} onClick={this.secondTab.bind(this)}>Viewed Appplications</button>
                                            </div>
                                        </div>
                                    </div>
                                    {this.renderUnread()}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderEducations(educ, index){
        if(educ){
            if(educ.education_attainment === 'College'){
                return(
                    <p key={index}>Has taken Bachelor Degree in {educ.course}  <i>( {educ.attend_from} - {educ.attend_to})</i></p>
                )
            }else{
                return(
                    <p key={index}>Has taken {educ.education_attainment} at {educ.school_name }<i>( {educ.attend_from} - {educ.attend_to})</i></p>
                )
            }
        }       
    }

    renderUnread(view){
        if(this.state.view){
            if(this.state.readApplicants.length === 0){ 
                return (
                    <div className='col-md-10 col-md-offset-1'>
                        <center><i><h5>No items to show.</h5></i></center>
                    </div>
                )
            }
            return(
                <div className='col-md-10 col-md-offset-1'>
                    {this.state.readApplicants.map((applicant, index) => 
                        <div key={index} className='row pb20'>
                            <div className='row h120 p10 with-border'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='pull-right'>
                                            <ul className='buttons'>
                                                <ReactTooltip place='top' delayShow={400}/>
                                                <li>{this.renderEyeButton(applicant.application)}</li>
                                                <li><button data-tip='Send response' className='btn btn-primary translucent rounded'><i className="fa fa-envelope-square fa-lg" aria-hidden="true"></i></button></li>
                                                <li><button data-tip='Mark as Unqualified' className='btn btn-primary translucent rounded'><i className='fa fa-window-close-o fa-lg' aria-hidden='true'></i></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='row pb20'>                                            
                                    <div className='col-md-2'>
                                        <img className='applicant-avatar' alt={applicant.full_name} src={applicant.avatar}/>
                                    </div>
                                    <div className='col-md-10'>
                                        <div className='candidate-profile'>
                                            <h5><a href={applicant.profile_url}>{applicant.full_name}<span className='pull-right'>Applied: {applicant.applied_date}</span></a></h5>
                                            {applicant.educations.map((educ, index) => 
                                                this.renderEducations(educ, index)
                                            )}                                          
                                        </div>
                                    </div>
                                </div>
                                <div className='row pb20'>
                                    <div className='col-md-6'>
                                        <div className='candidate-profile'>
                                            <label className='form-label'>Work Experience</label>
                                            {applicant.work_experiences.map((we, index) =>
                                                <p key={index}>{we.job_title} at {we.company_name} <i>( {we.employment_from} - {we.status ? 'Current': we.employment_to } )</i></p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='candidate-profile'>
                                            <label className='form-label'>Skills</label>
                                            {applicant.skills.map((skill, index) => 
                                                <li key={index}>{skill.name}<span className='gap1'>{skill.literacy_level}</span></li>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    
                                </div>
                            </div>
                        </div>
                    )}                            
                </div>
            )
        }else{
            if(this.state.unreadApplicants.length === 0){ 
                return (
                    <div className='col-md-10 col-md-offset-1'>
                        <center><i><h5>No items to show.</h5></i></center>
                    </div>
                )
            }
            return(     
                    <div className='col-md-10 col-md-offset-1'>
                        {this.state.unreadApplicants.map((applicant, index) => 
                            <div key={index} className='row pb20'>
                                <div className='row h120 p10 with-border'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='pull-right'>
                                                <ul className='buttons'>
                                                    <ReactTooltip place='top' delayShow={400}/>
                                                    <li>{this.renderEyeButton(applicant.application)}</li>
                                                    <li><button data-tip='Send response' className='btn btn-primary translucent rounded'><i className="fa fa-envelope-square fa-lg" aria-hidden="true"></i></button></li>
                                                    <li><button data-tip='Mark as Unqualified' className='btn btn-primary translucent rounded'><i className='fa fa-window-close-o fa-lg' aria-hidden='true'></i></button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row pb20'>                                            
                                        <div className='col-md-2'>
                                            <img className='applicant-avatar' alrt={applicant.full_name} src={applicant.avatar}/>
                                        </div>
                                        <div className='col-md-10'>
                                            <div className='candidate-profile'>
                                                <h5><a href={applicant.profile_url}>{applicant.full_name}<span className='pull-right'>Applied: {applicant.applied_date}</span></a></h5>
                                                {applicant.educations.map((educ, index) => 
                                                    this.renderEducations(educ, index)
                                                )}                                          
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row pb20'>
                                        <div className='col-md-6'>
                                            <div className='candidate-profile'>
                                                <label className='form-label'>Work Experience</label>
                                                {applicant.work_experiences.map((we, index) =>
                                                    <p key={index}>{we.job_title} at {we.company_name} <i>( {we.employment_from} - {we.status ? 'Current': we.employment_to } )</i></p>
                                                )}
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='candidate-profile'>
                                                <label className='form-label'>Skills</label>
                                                {applicant.skills.map((skill, index) => 
                                                    <li key={index}>{skill.name}<span className='gap1'>{skill.literacy_level}</span></li>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        
                                    </div>
                                </div>
                            </div>
                        )}                            
                    </div>
                
            )
        }
    }

    renderEyeButton(application){
        if(application.seen){
            return(
                <button onClick={this.unreadApplication.bind(this, application)} data-tip='Unmark' className='btn btn-primary rounded translucent clicked'><i className="fa fa-eye fa-lg" aria-hidden="true"></i></button>
            )
        }
        return(
            <button onClick={this.markAsRead.bind(this, application)} data-tip='Mark as Read' className='btn btn-primary rounded translucent'><i className="fa fa-eye fa-lg" aria-hidden="true"></i></button>            
        )
    }

    fetchData(job){
        this.setState({ fetching: true })
        $.ajax({
            url: `/api/jobs/applicants.json?id=${job.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({ unreadApplicants: data.unread, readApplicants: data.read, fetching: false })
            }
        })
    }

}