import React from 'react'
import PropTypes from 'prop-types'

export default class EducationDelete extends React.Component{
    constructor(props){
        super(props)
    }

    handleDelete(event){
        $.ajax({
            url: `/api/educations/${this.props.education.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'DELETE',
            dataType: 'JSON',
            data: { id: this.props.education.id },
            success: (data) => {
                this.props.onDelete()
            }
        })
    }

    render(){
        return(
            <div className='col-lg-offeset-2 col-md-offset-2 col-sm-offset-2 col-lg-10 col-md-10 col-sm-9 col-xs-10'>                        
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-4'>
                        <button onClick={() => this.props.onEdit(this.props.education)} className='btn btn-primary transparent'>Edit</button>
                    
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