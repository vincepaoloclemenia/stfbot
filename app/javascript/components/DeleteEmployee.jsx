import React, {Component} from 'react';

export default class DeleteEmployee extends React.Component{
    constructor(props){
        super(props)
    }

    handleDelete(){
        $.ajax({
            url: `/api/employees/${this.props.employee.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'DELETE',
            success: (data) => {
                this.props.onDelete(data)
            }
        })
    }

    render(){
        return(
            <button onClick={this.handleDelete.bind(this)} data-confirm="Are you sure?" rel="nofollow" className='btn btn-primary table-btn transparent'><span className='glyphicon glyphicon-trash red'></span></button> 
        )
    }
}
