import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Select from 'react-select';
import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'
import UserSkillsForm from 'components/UserSkillsForm.jsx'

export default class UserSkillsNew extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            proficiencies: [{label: 'Basic', value: 0}, {label: 'Novice', value: 1}, {label: 'Intermediate', value: 2}, {label: 'Advanced', value: 3}, {label: 'Expert', value: 4}],
            skills: [], skillName: '', temporary: [], ids: []            
        }
        
    }

    handleClick(){
        this.setState({ skills: [...this.state.skills, ...[{id: this.state.lastSkill += 1, name: this.state.skillName, literacy_level: this.state.level.label}]], temporary: [...this.state.temporary, {name: this.state.skillName, literacy_level: this.state.level.label}], skillName: '', level: null })
    }
    
    handleSave(){
        $.ajax({
            beforeSend: function(xhr) {
                xhr.setRequestHeader(
                    'X-CSRF-Token', 
                    $('meta[name="csrf-token"]').attr('content'))
            },
            url: '/api/skills',
            method: 'POST',
            data: JSON.stringify({ skills: this.state.temporary, ids: this.state.ids }),
            contentType: 'application/json',
            success: (data) => {
                this.props.addNew()              
            },
            error: () => {
                $.notify("Error in saving. Please check input fields", "error")
            }
        })
        
    }

    handleDelete(skill){
        var userSkills = this.state.skills
        var index = userSkills.indexOf(skill)
        userSkills.splice(index, 1)
        this.setState({ ids: [...this.state.ids, skill.id], skills: userSkills })
    }

    componentWillMount(){
        if (this.props.newUser){ return }
        $.getJSON('/api/skills.json', (data) => { this.setState({ skills: data.skills, lastSkill: data.last_skill }) });         
    }

    render(){
        return(
            <div className='panel-body mb25'>
                <div className='row pb20'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6 col-sm-6'>
                                <label className='panel-label'>Skill Name</label>
                                <input className='form-control' value={this.state.skillName} onChange={(event) => this.setState({ skillName: event.target.value })} placeholder='Add your competitive skill'/>
                            </div>
                            <div className='col-md-6 col-sm-6'>
                                <label className='panel-label'>Level of Proficiency</label>
                                <div className='input-group'>                                
                                    <Select.Creatable
                                        optionClassName = 'form-control'
                                        options={this.state.proficiencies}
                                        onChange={(value) => this.setState({ level: value })}
                                        value={this.state.level}
                                    />
                                    <span className='input-group-btn'>
                                        <button type='button' onClick={this.handleClick.bind(this)} className='btn btn-primary table-btn btn35'>+</button>   
                                    </span>
                                </div>                                      
                            </div>
                        </div>                        
                    </div>
                </div>

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>     
                        {this.state.skills.map((skill) => 
                            <UserSkillsForm skill={skill} key={skill.id} deleteSkill={this.handleDelete.bind(this)} />
                        )}
                    </div>
                </div>

                <div className='row pt20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <div className='col-lg-offset-4 col-md-offset-4 col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' disabled={this.disableButton()} onClick={this.handleSave.bind(this)} className='btn btn-primary table-btn full-width'>Save</button>
                        </div> 
                        <div className='col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' onClick={() => this.props.onCloseForm()} className='btn btn-primary full-width modal-cancel'>Cancel</button>
                        </div>
                    </div>                 
                </div>
            </div>
        )
    }

    disableButton(){
        if(this.state.temporary.length === 0 && this.state.ids.length === 0) { return true }
        return false
    }
}