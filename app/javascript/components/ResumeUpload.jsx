import React, { Component } from 'react'

export default class ResumeUpload extends React.Component{
    constructor(props){
        super(props)
        this.state = { label: '', userResume: null, uploading: false, removable: false }
    }

    componentWillMount(){
    }
    componentDidMount(){
        $.ajax({
            url: '/api/users/get_resume.json',
            method: 'GET',
            success: (data) => {
                this.setState({ userResume: data.resume, label: data.file_name, removable: data.resume === null ? false : true })
            }
        })
    }

    handleFileUpload(event){               
        var file = event.target.files[0]
        var formData = new FormData()
        formData.append('resume', file, file.name)
        this.setState({ label: 'Uploading', uploading: true, userResume: formData, removable: true })      
        var xhr = new XMLHttpRequest()
        xhr.open('PUT', '/api/users/upload_resume', true)
        xhr.send(formData)
        xhr.onload = () => {
            if (xhr.status === 204) {
                this.setState({ uploading: false })
                $('#file-upload').notify('Successfully Uploaded', { className: 'success', position: 'bottom' })
            }else{
                $('#file-upload').notify('Error in uploading', { className: 'error', position: 'bottom' })
            } 
        } 
        this.setState({ label: event.target.value.split(/(\\|\/)/g).pop() })                  
    }

    handleRemove(){
        document.getElementById('remove').innerHTML = 'Removing..'
        $.ajax({
            url: '/api/users/delete_resume',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'delete',
            success: () => {
                this.setState({ userResume: null, label: 'Choose a file', removable: false })
                $('#file-upload').notify('Your resume was removed', { className: 'info', position: 'bottom' })
                document.getElementById('remove').innerHTML = 'Remove'
            }
        })
    }


    render(){
        return(
            <div className='panel' >
                <div className="panel-heading ml15 mr15 with-border"><h5>Resume</h5></div>
                    <div className="panel-body mb25 mt25" id='skill' >
                        <div className='row'>
                            <div className='col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2'>
                                <p className='panel-par' ><label className='panel-label'>Note:</label> Your profile is the first thing recruiters will see and not your uploaded resume, so make sure your profile is as complete and detailed as your uploaded resume.</p>
                            </div>
                            <div className='col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2'>
                                <form action='' id='file-upload' method='put' name='file-upload' encType='multipart/form-data'>
                                    <div className='input-group'>
                                        <input type="file" name="resume" id="file" className="inputfile" onChange={this.handleFileUpload.bind(this)} accept='application/pdf, applicaiton/doc, application/docx' />
                                        <label htmlFor="file">{this.state.label}{this.renderIndicator()}</label>
                                        {this.renderButton()}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }

    renderButton(){
        if(this.state.removable){
            return(
                <button type='button' id='remove' onClick={this.handleRemove.bind(this)} className='btn btn-primary modal-cancel remove-resume'>Remove</button>
            )
        }
    }

    renderIndicator(){
        if(this.state.uploading){
            return(
                <i className="fa fa-cog fa-spin lg fa-fw"></i>
            )
        }
    }
}