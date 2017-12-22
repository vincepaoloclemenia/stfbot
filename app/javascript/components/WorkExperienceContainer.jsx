import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WorkExperienceNew from 'components/WorkExperienceNew.jsx'
import WorkExperienceDelete from 'components/WorkExperienceDelete.jsx'
import WorkExperienceEdit from 'components/WorkExperienceEdit.jsx'

export default class WorkExperienceContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = { userExperiences: [], openNew: false, fetching: false, editable: false, experience: null }

        this.handleClose = this.handleClose.bind(this)
        this.handleNew = this.handleNew.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.exitEdit = this.exitEdit.bind(this)
    }

    handleNew(){
        this.setState({ openNew: true })
    }

    handleAdd(){
        this.setState({ fetching: true, openNew: false })
        $.ajax({
            url: '/api/work_experiences.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ userExperiences: data.experiences, fetching: false })
            }
        })
    }

    handleClose(){
        this.setState({ openNew: false })
    }

    handleEdit(data){
        this.setState({ editable: true, experience: data })
    }

    handleDelete(){
        this.setState({ fetching: true })
        $.ajax({
            url: '/api/work_experiences.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data)=>{
                this.setState({ userExperiences: data.experiences, fetching: false })
            }
        })
    }

    handleUpdate(){
        this.setState({ editable: false, fetching: true })
        $.ajax({
            url: '/api/work_experiences.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({
                    userExperiences: data.experiences, fetching: false
                })
            }
        })
    }

    exitEdit(){
        this.setState({ editable: false })
    }

    componentWillMount(){
        this.setState({ fetching: true })
        $.ajax({
            url: '/api/work_experiences.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({
                    userExperiences: data.experiences, fetching: false
                })
            }
        })
    }

    render(){

        if(this.state.fetching){
            return(
                <div className='panel'>
                    <div className="panel-heading ml15 mr15 with-border"><h5>Work Experiences</h5></div>
                    <div className='panel-body mb25 mt25'>
                        <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>
                    </div>
                </div>
            )
        }

        if (this.state.openNew){
            return(
                <div className='panel'>
                    <div className="panel-heading ml15 mr15 with-border"><h5>New Record of Work Experience</h5></div>
                    <WorkExperienceNew onCloseForm={this.handleClose} onAdd={this.handleAdd}/>
                </div>
            )
        }

        if (this.state.editable){
            return(
                <div className='panel'>
                    <div className="panel-heading ml15 mr15 with-border"><h5>Edit Record of Work Experience</h5></div>
                    <WorkExperienceEdit experience={this.state.experience} onUpdate={this.handleUpdate} closeForm={this.exitEdit}/>
                </div>
            )
        }
        return(           
            <div className='panel'>
                <div className="panel-heading ml15 mr15 with-border"><h5>Work Experiences</h5></div>
                    <div className="panel-body mb25 mt25">
                    {this.state.userExperiences.map ((exp) => 
                        <div className='row pt20 pb20' key={exp.id}>
                            <div className='col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 col-lg-2 col-md-2 col-sm-2 col-xs-2'>
                                <i className="fa fa-building fa-2x with-color" aria-hidden="true"></i>
                            </div>
                            <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9'>
                                <p className='job-title'>{exp.job_title} at {exp.company_name}</p>
                                <p>{exp.employment_from} - {exp.employment_to}</p>                                
                            </div>
                            
                            <WorkExperienceDelete experience={exp} onDelete={this.handleDelete} onEdit={this.handleEdit} />
                                  
                        </div>
                    )}
                    </div>
                <button type='button' onClick={this.handleNew.bind()} className='btn btn-primary full-width'>Add Work Experiences</button>
            </div>
        )
    }
}