import React, { Component } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import JobAdd from 'components/JobAdd.jsx'
import Show from 'components/JobShow.jsx'
import Applicants from 'components/Applicants.jsx'
import Viewers from 'components/Viewers.jsx'

export default class JobsContainer extends React.Component{
    constructor(props){
        super(props)
        this.className = 'col-lg-8 col-md-12 col-sm-12 col-xs-12 col-lg-offset-2'
        this.state = {
            openApplicants: false,
            openViewers: false,
            fetching: false,
            class: this.className,
            jobs: [],
            addNew: false,
            showJob: false,
            job: {}
        }
    }

    handleAdd(data){
        this.setState({ addNew: false })
        this.fetchData()
        $.notify("Job was successfully added!", {className: 'success', position: 'top center'})
    }

    handleEdit(){
        this.setState({ showJob: false, edit: false })
        $.ajax({
            url: '/api/jobs.json',
            method: 'GET',
            success: (data) => {
                this.setState({ showJob: true, jobs: data.jobs, job: data.jobs.find( x => x.id === this.state.job.id ) })
                $.notify("Job record was successfully saved!", {className: 'success', position: 'top center'})                
            }
        })
    }

    onCloseForm(){
        this.setState({ addNew: false })
    }

    showJob(data){
        this.setState({ openViewers: false, openApplicants: false, addNew: false, showJob: true, job: data, class: 'col-lg-6 col-md-6' })        
    }

    openApplicants(job){
        this.setState({ openViewers: false, addNew: false, showJob: false, openApplicants: true, job, class: 'col-lg-6 col-md-6' })
        if(job.applicants_count != 0){
            $.ajax({
                url: `/api/jobs/clear_count?id=${job.id}`,
                method: 'PATCH',
                success: () => {
                    this.fetchData()
                }
            })
        }      
    }

    openViewers(job){
        this.setState({ openApplicants: false, addNew: false, showJob: false, openViewers: true, job, class: 'col-lg-6 col-md-6' })
        if(job.viewers_count != 0){
            $.ajax({
                url: `/api/jobs/clear_notif?id=${job.id}`,
                method: 'PATCH',
                success: () => {
                    this.fetchData()
                }
            })
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    render(){
        if(this.state.addNew){
            return(
                <div className='row m70'>
                    <div className={this.state.class}>
                        
                        <JobAdd onAdd={this.handleAdd.bind(this)} onCloseForm={this.onCloseForm.bind(this)} />
                            
                    </div>
                </div>
            )
        }
        return(
            <div className='row m70'>
                <div className={this.state.class}>
    
                    <div className='panel'>
                        <div className="panel-heading ml15 mr15">
                            <h5>
                                <i className="fa fa-archive pr1" aria-hidden="true"></i>List of Jobs
                                <button onClick={() => this.setState({ addNew: true, openApplicants: false, openViewers: false, class: this.className, showJob: false })} className='btn btn-primary pull-right company-overview'><i className="fa fa-plus pr1" aria-hidden="true"></i>Add New Job Order</button>
                            </h5>
                        </div>
                        <div className='panel-body'>
                            {this.renderJobsTable()}
                        </div>                            
                    </div>
                </div>
                {this.renderShowJob()}
            </div>
        )
    }

    fetchData(){
        $.ajax({
            url: '/api/jobs.json',
            method: 'GET',
            success: (data) => {
                this.setState({ jobs: data.jobs })
            }
        })
    }

    renderShowJob(){
        if(this.state.showJob)
        return <Show close={false} onEdit={this.handleEdit.bind(this)} class={this.state.class} job={this.state.job} hide={() => this.setState({ showJob: false, class: this.className })} />
        
        if(this.state.openApplicants)
        return<Applicants job={this.state.job} class={this.state.class} hide={() => this.setState({ openApplicants: false, class: this.className })} onMarkingRead={ () => this.fetchData() } />

        if(this.state.openViewers)
        return<Viewers job={this.state.job} class={this.state.class} hide={() => this.setState({ openViewers: false, class: this.className })} />
    }

    renderJobsTable(){
        return(
            <div className='col-md-12'>
                {this.state.jobs.map((job, index) =>
                    <div key={index} className='row with-top-border p10 h120'>
                        <div className='row'>
                            <div className='col-lg-5 col-md-5 col-lg-offset-1 col-md-offset-1'>
                                <h4 onClick={this.showJob.bind(this, job)}>{job.title}</h4>
                                <p>Posted: {job.date}</p>
                            </div>
                            <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12'>
                                <li onClick={this.openViewers.bind(this, job)} className={job.viewers_count == 0 ? 'list-button' : 'list-button new'} ><i className="fa fa fa-users pr1" aria-hidden="true"></i>Who viewed this job post?{this.notifCount(job.viewers_count)}</li>
                                <li onClick={this.openApplicants.bind(this, job)} className={job.applicants_count == 0 ? 'list-button' : 'list-button new'} ><i className="fa fa-folder pr1" aria-hidden="true"></i>Applicants{this.notifCount(job.applicants_count)}</li>                                
                                <li className='list-button'><i className="fa fa-shopping-bag pr1" aria-hidden="true"></i>Suggested Candidates</li>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    notifCount(count){
        if(count === 0){ return }
        return(
            <span className='new-notif'>{count}</span>
        )
    }
}