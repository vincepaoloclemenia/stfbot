import React, { Component } from 'react'

export default class Viewers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            viewers: [],
            fetching: false,
            job: this.props.job
        }
    }

    componentDidMount(){
        this.fetchData(this.state.job)
    }

    componentWillReceiveProps(nextProps){
        this.setState({ job: nextProps.job })
        this.fetchData(nextProps.job)
    }

    render(){
        if(this.state.fetching)
        return(
            <div className={this.props.class}>
                <div className='panel'>
                    <div className='panel-heading ml15 mr15'><h5><i className="fa fa fa-users pr1" aria-hidden="true"></i>Job post viewers ( {this.props.job.title} )</h5></div>
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
                <div className='panel'>
                    <button onClick={() => this.props.hide()} className='btn btn-primary close pull-right'><i className='fa fa-window-close-o' aria-hidden='true'></i></button>
                    <div className='panel-heading ml15 mr15'><h5><i className="fa fa fa-users pr1" aria-hidden="true"></i>Job post viewers ( {this.props.job.title} )</h5></div>
                    <div className='panel-body'>
                        <div className='col-md-10 col-md-offset-1'>
                            {this.state.viewers.map((viewer, index) => 
                                <div key={index} className='row pb20'>
                                    <div className='row h120 p10 with-border'>
                                        <div className='row pb20'>
                                            <div className='col-md-2'>
                                                <img className='applicant-avatar' alrt={viewer.full_name} src={viewer.avatar}/>
                                            </div>
                                            <div className='col-md-10'>
                                                <div className='candidate-profile'>
                                                    <h5><a href={viewer.profile_url}>{viewer.full_name}</a></h5>
                                                    {viewer.educations.map((educ, index) => 
                                                        this.renderEducations(educ, index)
                                                    )}                                          
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='candidate-profile'>
                                                    <label className='form-label'>Work Experience</label>
                                                    {viewer.work_experiences.map((we, index) =>
                                                        <p key={index}>{we.job_title} at {we.company_name} <i>( {we.employment_from} - {we.status ? 'Current': we.employment_to } )</i></p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='candidate-profile'>
                                                    <label className='form-label'>Skills</label>
                                                    {viewer.skills.map((skill, index) => 
                                                        <li key={index}>{skill.name}<span className='gap1'>{skill.literacy_level}</span></li>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}                            
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

    fetchData(job){
        this.setState({ fetching: true })
        $.ajax({
            url: `/api/jobs/viewers.json?id=${job.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({ viewers: data.viewers, unreadViewers: data.unread, fetching: false })
            }
        })
    }

}