import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Select from 'react-select';
import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'

export default class UserSkillsNew extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            proficiencies: [{label: 'Basic', value: 0}, {label: 'Novice', value: 1}, {label: 'Intermediate', value: 2}, {label: 'Advanced', value: 3}, {label: 'Expert', value: 4}]
        }
    }

    handleClick(){
        $.ajax({
            url: '/api/skills',
            method: 'POST',
            data: { skill: {
                name: this.state.skillName, literacy_level: this.state.level.label
            }},
            success: () => {
                this.props.addNew()
            }
        })
    }

    render(){
        return(
            <div className='panel-body mb25 mt25'>
                <div className='row pb20'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6 col-sm-6'>
                                <label className='panel-label'>Skill Name</label>
                                <input className='form-control' value={this.state.skillName} onChange={(event) => this.setState({ skillName: event.target.value })} placeholder='Add your competitive skill'/>
                            </div>
                            <div className='col-md-4 col-sm-4'>
                                <label className='panel-label'>Level of Proficiency</label>
                                <Select.Creatable
                                    optionClassName = 'form-control'
                                    options={this.state.proficiencies}
                                    onChange={(value) => this.setState({ level: value })}
                                    value={this.state.level}
                                />                
                            </div>
                            <div className='col-md-2 col-sm-2'>
                                <button type='button' onClick={this.handleClick.bind(this)} className='btn btn-primary table-btn full-width inline'>+</button>  
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>     
                        
                    </div>
                </div>

                <div className='row pt20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <div className='col-lg-offset-4 col-md-offset-4 col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' onClick={this.handleClick.bind(this)} className='btn btn-primary table-btn full-width'>Add</button>
                        </div> 
                        <div className='col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' onClick={() => this.props.onCloseForm()} className='btn btn-primary full-width modal-cancel'>Cancel</button>
                        </div>
                    </div>                 
                </div>
            </div>
        )
    }
}