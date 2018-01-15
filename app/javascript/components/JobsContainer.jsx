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

    componentDidMount(){
        this.fetchData()
    }

    render(){
        if(this.state.addNew){
            return(
                <div className='row m70'>
                    <div className='col-lg-10 col-md-12 col-sm-12 col-xs-12 col-lg-offset-1'>
                        
                        <JobAdd onAdd={this.handleAdd.bind(this)} />
                            
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