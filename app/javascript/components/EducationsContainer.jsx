import React from 'react'
import PropTypes from 'prop-types'
import EducationNew from 'components/EducationNew.jsx'
import EducationDelete from 'components/EducationDelete.jsx'
import EducationEdit from 'components/EducationEdit.jsx'

export default class EducationsContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clickedAdd: false, userEducations: [], fetching: false, editable: false, education: null
        }
        this.handleClickAdd = this.handleClickAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.exitEdit = this.exitEdit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentWillMount(){
        if(this.props.newUser){ return }
        
        this.setState({ fetching: true })
        $.ajax({
            url: '/api/educations.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data)=>{
                this.setState({ userEducations: data.educations, fetching: false })
            }
        })
        
    }

    handleClickAdd(){
        this.setState({ clickedAdd: true })
    }

    handleCancel(){
        this.setState({ clickedAdd: false })
    }

    exitEdit(){
        this.setState({ editable: false })
    }

    handleAdd(){
        this.setState({ fetching: true, clickedAdd: false })
        $.ajax({
            url: '/api/educations.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data)=>{
                this.setState({ userEducations: data.educations, fetching: false })
            }
        })
        $.notify("Education Attainment successfully added", { className: 'success', position: 'top center' } );
    }

    handleDelete(){
        this.setState({ fetching: true, clickedAdd: false })
        $.ajax({
            url: '/api/educations.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data)=>{
                this.setState({ userEducations: data.educations, fetching: false })
            }
        })
        $.notify("Education attainment deleted", { className: 'warn', position: 'top center' } );
    }

    handleEdit(data){
        this.setState({ editable: true, education: data })
    }

    handleUpdate(){
        this.setState({ fetching: true, editable: false })
        $.ajax({
            url: '/api/educations.json',
            method: 'GET',
            dataType: 'JSON',
            success: (data)=>{
                this.setState({ userEducations: data.educations, fetching: false })
            }
        })
        $.notify("Education Attainment successfully updated", { className: 'success', position: 'top center' } );
    }

    render(){
        if (this.state.fetching){
            return(
                <div className='panel'>
                    <div className="panel-heading ml15 mr15 with-border"><h5>Education Attainment</h5></div>
                    <div className='panel-body mb25 mt25'>
                        <center><i className="fa fa-spinner fa-spin fa-2x fa-fw with-color"></i></center>
                    </div>
                </div>
            )
        }
        if (this.state.clickedAdd) {
            return(
                <div className='panel'>
                    <div className="panel-heading ml15 mr15 with-border"><h5>New Record for Education Attainment</h5></div>
                    <EducationNew newUser={this.props.newUser} onAdd={this.handleAdd} onCloseForm={this.handleCancel}/>
                </div>
            )            
        } 
        if (this.state.editable){
            return(
                <div className='panel'>
                    <div className="panel-heading ml15 mr15 with-border"><h5>Edit Record for Education Attainment</h5></div>
                        <EducationEdit education={this.state.education} onUpdate={this.handleUpdate} closeForm={this.exitEdit} />
                </div>
            )
        }
        return(
            <div className='panel'>
                <div className="panel-heading ml15 mr15 with-border"><h5>Education Attainment</h5></div>
                    <div className="panel-body mb25 mt25">
                        {this.state.userEducations.map ((educ) => 
                            <div className='row pt20 pb20' key={educ.id}>
                                <div className='col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1 col-lg-2 col-md-2 col-sm-2 col-xs-2'>
                                    <i className="fa fa-university fa-2x with-color" aria-hidden="true"></i>
                                </div>
                                <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9'>
                                    {this.renderEducationAttainment(educ.graduate, educ.course, educ.education_attainment)}
                                    <p>{educ.school_name} ( {educ.attend_from} - {educ.attend_to} )</p>
                                </div>
                                
                                <EducationDelete education={educ} onDelete={this.handleDelete} onEdit={this.handleEdit} />
                                                  
                            </div>
                        )}                
                    </div>
                <button type='button' onClick={this.handleClickAdd.bind()} className='btn btn-primary table-btn full-width'>Add Education Background</button>
            </div>
        )
    }

    renderEducationAttainment(status, course, attainment){
        if(status && attainment === 'College' && course !== null){
            return(
                <p>Bachelor Graduate of <b>{course}</b></p>
            )
        }
        if(status && attainment === 'Vocational' && course !== null){
            return(
                <p>Finished Vocational course of <b>{course}</b></p>
            )
        }
        return(
            <p>{attainment}</p>
        )
        
    }
}