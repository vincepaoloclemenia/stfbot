import React from 'react'
import PropTypes from 'prop-types'

export default class WorkExperienceDelete extends React.Component{
    constructor(props){
        super(props)
        this.state = { }
    }

    handleDelete(event){
        $.ajax({
            url: `/api/work_experiences/${this.props.experience.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'DELETE',
            dataType: 'JSON',
            data: { id: this.props.experience.id },
            success: (data) => {
                this.props.onDelete()
            }
        })
    }

    render(){
        return(
            <div className='col-lg-10 col-md-10 col-sm-9 col-xs-10 col-lg-offeset-1 col-md-offset-1 col-sm-offset-1'>                        
                <div className='row'>
                    <div className='col-offset-lg-8 col-md-offset-8 col-sm-offset-8 col-lg-4 col-md-4 col-sm-4'>
                        <button onClick={() => this.props.onEdit(this.props.experience)} className='btn btn-primary transparent'>Edit</button>
                    
                        <button onClick={this.handleDelete.bind(this)}className='btn btn-primary modal-cancel pull-right'
                                data-confirm="Are you sure?" 
                                rel="nofollow" 
                                data-method="delete"
                                >Delete</button>
                    </div>
        
                </div>
            </div>
        )
    }
}