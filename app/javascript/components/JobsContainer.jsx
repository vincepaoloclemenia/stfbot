import React, { Component } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import JobAdd from 'components/JobAdd.jsx'

export default class JobsContainer extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            fetching: false,
            class: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
            jobs: [],
            addNew: false
        }
    }

    handleAdd(data){
        this.setState({ addNew: false })
        if(data.success){
            $.notify(data.success, { className: 'success', position: 'bottom' })
        }else
            $.notify(data.error, { className: 'error', position: 'bottom' })
    }

    onCloseForm(){
        this.setState({ addNew: false })
    }

    componentDidMount(){
        this.fetchData()
    }

    render(){
        if(this.state.addNew){
            return(
                <div className='row m70'>
                    <div className='col-lg-10 col-md-12 col-sm-12 col-xs-12 col-lg-offset-1'>
                        
                        <JobAdd onAdd={this.handleAdd.bind(this)} onCloseForm={this.onCloseForm.bind(this)} />
                            
                    </div>
                </div>
            )
        }
        return(
            <div className='row m70'>
                <div className='col-lg-10 col-md-12 col-sm-12 col-xs-12 col-lg-offset-1'>
    
                    <div className='panel'>
                        <div className="panel-heading ml15 mr15 with-border">
                            <i className="fa fa-archive pr1" aria-hidden="true"></i>List of Jobs
                            <button onClick={() => this.setState({ addNew: true })} className='btn btn-primary pull-right company-overview'><i className="fa fa-plus pr1" aria-hidden="true"></i>Add New Job Order</button>
                        </div>
                        <div className='panel-body'>
                            {this.renderJobsTable()}
                        </div>                            
                    </div>
                </div>
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

    renderJobsTable(){
        return(
            <table className='table table-hover table-bordered job-table'>
                <thead>
                    <tr className='table-header'>
                        <th className='table-head' scope='col'><i className="fa fa-sticky-note pr1" aria-hidden="true"></i>Job Title</th>
                        <th className='table-head' scope='col'><i className="fa fa-industry pr1" aria-hidden="true"></i>Industry</th>
                        <th className='table-head' scope='col'><i className="fa fa-calendar-check-o pr1" aria-hidden="true"></i>Date posted</th>
                        <th className='table-head' scope='col'><i className="fa fa-eye pr1" aria-hidden="true"></i>Who viewed job posts?</th>
                        <th className='table-head' scope='col'><i className="fa fa-files-o pr1" aria-hidden="true"></i>Applicants</th>
                        <th className='table-head' scope='col'><i className="fa fa-users pr1" aria-hidden="true"></i>Suggested People</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.jobs.map((job) =>
                        <tr className='table-row' key={job.id} >
                            <td className='table-data'>{job.title}</td>
                            <td className='table-data'>{job.industry}</td>
                            <td className='table-data'>{job.date}</td>
                            <td className='table-data'><a href='/applicants'>New viewers (11)</a></td>
                            <td className='table-data'><a href='/applicants'>New applicants (7)</a></td>
                            <td className='table-data'><a href='/applicants'>(3) New Suggestions</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
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