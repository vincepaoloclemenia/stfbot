import React, { Component } from 'react'

export default class SavedJobs extends React.Component{
    constructor(props){
        super(props)
        this.className = 'col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2'
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

    handleApply(){

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
                            <h4><i className="fa fa-heart pink pr1" aria-hidden="true"></i>List of Saved Jobs</h4>                        
                            </div>
                            <div className='panel-body'>
                                <center><i><h5>No data yet</h5></i></center>
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
                        <h4><i className="fa fa-heart pink pr1" aria-hidden="true"></i>List of Saved Jobs</h4>                        
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
            <div className='col-md-12'>
                {this.state.jobs.map((job, index) => 
                    <div key={index} className='row with-top-border p10 h120'>
                        
                        <div className='col-md-2'>
                            <a style={{textDecoration: 'none'}} href={job.company.company_url}>
                                <img alt="avatar image" className="company-avatar" src={job.company.avatar}/>
                            </a>
                        </div> 
                        <div className='col-md-5'>
                            <div className='row'>                  
                                <h5 className='job-header'>{job.title}</h5>
                                <a href={job.company.company_url}>{job.company.name}</a>
                                <p className='job-par'>{job.location.split(' | ').join(', ')}</p>
                                <p className='job-par'>Posted: {job.date}</p>
                            </div>                        
                        </div>
                        <div className='col-md-5'>
                            <div className='row pb20'>
                                <div className='pull-right'>
                                    <p className='job-par pull-right'>Recruiter was recruiting {job.creator.last_sign_in_at}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='pull-right'>
                                    <button onClick={this.handleApply.bind(this, job)} className='btn btn-primary apply inline'><i className="fa fa-paper-plane-o pr1" aria-hidden="true"></i>Apply Now</button>
                                    <span class='gap1'></span>
                                    <button onClick={this.handleUnsave.bind(this, job)} className='btn btn-primary unsave inline'><i className="fa fa-heart pink pr1" aria-hidden="true"></i>Unsave Job</button>            
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
            url: '/api/saved_jobs.json',
            method: 'GET',
            success: (data) => {
                this.setState({ jobs: data.jobs })
            }
        })
    }



}