import React, { Component } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import JobAdd from 'components/JobAdd.jsx'
import Show from 'components/JobShow.jsx'
import ReactTooltip from 'react-tooltip'

export default class JobsContainer extends React.Component{
    constructor(props){
        super(props)
        this.className = 'col-lg-8 col-md-12 col-sm-12 col-xs-12 col-lg-offset-2'
        this.state = {
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
        this.setState({ showJob: true, job: data, class: 'col-lg-6 col-md-6 col-sm-6 col-xs-6' })        
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
                        <div className="panel-heading ml15 mr15 with-border">
                            <i className="fa fa-archive" aria-hidden="true"></i>List of Jobs
                            <button onClick={() => this.setState({ addNew: true, class: this.className, showJob: false })} className='btn btn-primary pull-right company-overview'><i className="fa fa-plus" aria-hidden="true"></i>Add New Job Order</button>
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
    }

    renderJobsTable(){
        return(
            <div>
                {this.state.jobs.map((job, index) =>
                    <li key={index} className='job-item'>
                        <div className='row'>
                            <div className='col-lg-5 col-md-5 col-lg-offset-1 col-md-offset-1'>
                                <h4 onClick={this.showJob.bind(this, job)}>{job.title}</h4>
                                <p>Posted: {job.date}</p>
                            </div>
                            <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12'>
                                <ReactTooltip place='top'/>
                                <li className='list-button new' data-tip='Who viewed this post?'><i className="fa fa fa-users pr1" aria-hidden="true"></i>Who viewed this job post?<span className='new-notif'>4</span></li>
                                <li className='list-button' data-tip='Applicants'><i className="fa fa-folder pr1" aria-hidden="true"></i>Applicants</li>                                
                                <li className='list-button' data-tip='Suggested Candidates'><i className="fa fa-shopping-bag pr1" aria-hidden="true"></i>Suggested Candidates</li>
                            </div>
                        </div>
                    </li>
                )}
            </div>
        )
    }

    renderAddNew(){
        return(
            <Modal open={this.state.addNew} onClose={()=>this.setState({ addNew: false})} >
                <h5 className='modal-title-caption'>Create New Job</h5>
                    <div className='modal-form-container'>
                        
                    </div>
            </Modal>
        )
    }
}