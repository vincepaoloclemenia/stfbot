import React, { Component } from 'react'

export default class AppliedJobs extends React.Component{
    constructor(props){
        super(props)
        this.className = 'col-lg-8 col-md-10 col-lg-offset-2 col-md-offset-1'
        this.state = { 
            class: this.className, 
            jobs: [] 
        }
    }

    componentDidMount(){
        this.fetchJobs()
    }

    showJob(){
        
    }

    handleApply(job){
        $.ajax({
            url: `/api/jobs/apply?id=${job.id}`,
            method: 'POST',
            success: (data) => {               
                if(data){
                    $.notify(data.message, { className: 'error', position: 'top center' })
                }else{
                    this.fetchJobs()
                    $.notify('Job application successfully sent!', { className: 'success', position: 'top center' })
                }     
                
            }
        })
    }

    handleUnsave(job){
        $.ajax({
            url: `/api/jobs/unsave`,
            method: 'DELETE',
            data: { id: job.id },
            success: (data) => {               
                if(data){
                    $.notify(data.message, { className: 'error', position: 'top center' })
                }else      
                this.fetchJobs()
            }
        })
    }

    render(){
        if(this.state.jobs.length === 0){
            return(
                <div className='row m70'>
                    <div className={this.state.class}>
                        <div className='panel'>
                            <div className="panel-heading ml15 mr15">
                            <h4><i className="fa fa-paper-plane-o pr1" aria-hidden="true"></i>Your Applications</h4>                        
                            </div>
                            <div className='panel-body'>
                                <center><i><h5>You have no pending applications.</h5></i></center>
                            </div>                            
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div className='row m70'>
                <div className={this.state.class}>
                    <div className='panel'>
                        <div className="panel-heading ml15 mr15">
                        <h4><i className="fa fa-paper-plane-o pr1" aria-hidden="true"></i>Your Applications</h4>                        
                        </div>
                        <div className='panel-body'>
                            {this.renderListOfJobs()}
                        </div>                            
                    </div>
                </div>
            </div>
        )
    }

    renderListOfJobs(){
        return(
            <div className='col-lg-12 col-md-12'>
                {this.state.jobs.map((job, index) => 
                    <div key={index} className='row with-top-border p10 h120'>
                        
                        <div className='col-md-2'>
                            <a style={{textDecoration: 'none'}} href={job.company.company_url}>
                                <img alt="avatar image" className="company-avatar for-saved-jobs" src={job.company.avatar}/>
                            </a>
                        </div> 
                        <div className='col-md-5'>
                            <div className='row ml15'>                  
                                <h5 className='job-header'>{job.title}</h5>
                                <a href={job.company.company_url}>{job.company.name}</a>
                                <p className='job-par'>{job.location.split(' | ').join(', ')}</p>
                                <p className='job-par'>Currently being viewed</p>
                            </div>                        
                        </div>
                        <div className='col-md-5 pull-right'>
                            <div className='row pb20'>
                                <div className='pull-right'>
                                    <p className='job-par pull-right'>Recruiter was recruiting {job.creator.last_sign_in_at}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='pull-right'>
                                    <label className='info'><i className="fa fa-check pr1" aria-hidden="true"></i>Application sent</label>
                                    <p className='job-par'>You applied {job.appliedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )} 
            </div>          
        )
    }

    fetchJobs(){
        $.ajax({
            url: '/api/saved_jobs/applied_jobs.json',
            method: 'GET',
            success: (data) => {
                this.setState({ jobs: data.jobs })
            }
        })
    }



}