import React, { Component } from 'react'

export default class JobSkills extends React.Component{
    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <div className='row pb20 pt10 with-top-border'>
                <div className ='col-md-5 col-sm-5'>
                    <label className='panel-label'>{this.props.skill}</label>
                </div>
                <div className = 'col-md-offset-1 col-sm-offset-1 col-md-6 col-sm-6'>
                    <div className='input-group'>
                        <span className='input-group-btn'>
                            <button onClick={() => this.props.deleteSkill(this.props.skill)}className='close' type='buton'><span aria-hidden="true">&times;</span></button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}