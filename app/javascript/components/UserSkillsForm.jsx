import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Select from 'react-select';
import React, { Component } from 'react'

export default class UserSkillsForm extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            proficiencies: [{label: 'Basic', value: 0}, {label: 'Novice', value: 1}, {label: 'Intermediate', value: 2}, {label: 'Advanced', value: 3}, {label: 'Expert', value: 4}],            
        }
    }

    componentWillMount(){
        this.setState({
            skillLiteracy: this.state.proficiencies.find( x => x.label === this.props.skill.literacy_level )
        })
    }

    render(){
        return(
            <div className='row pb20 pt10 with-top-border'>
                <div className ='col-md-5 col-sm-5'>
                    <label className='panel-label'>{this.props.skill.name}</label>
                </div>
                <div className = 'col-md-offset-1 col-sm-offset-1 col-md-6 col-sm-6'>
                    <div className='input-group'>
                        <label className='panel-label'>{this.props.skill.literacy_level}</label>
                        <span className='input-group-btn'>
                            <button onClick={() => this.props.deleteSkill(this.props.skill)}className='close' type='buton'><span aria-hidden="true">&times;</span></button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}