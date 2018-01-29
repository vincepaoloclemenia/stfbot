var moment = require('moment');
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Select from 'react-select';
import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import Froala from 'react-froala-wysiwyg'

export default class WorkExperienceNew extends React.Component{
    constructor(props){
        super(props)
                    this.state = { 
                        jobFunctions: [],
                        jobLevels: [],
                        jobTitle: '',
                        jobDescription: '',
                        company: '',
                        months: [],
                        years:[],
                        jobLevel: null,
                        jobFunction: null,
                        checked: false
                    }
    }

    handleAdd(){
        $.ajax({
            url: '/api/work_experiences',
            method: 'POST',
            data: { work_experience: {
                company_name: this.state.company,
                job_title: this.state.jobTitle,
                job_level: this.state.jobLevel.label,
                employment_from: moment(`${this.state.monthFrom.label} ${this.state.yearFrom.label}`, "MMM-YYYY").format(),
                employment_to: this.state.checked ? null : moment(`${this.state.monthTo.label} ${this.state.yearTo.label}`, "MMM-YYYY").format(),
                job_functions: this.state.jobFunction.label,
                employment_status: this.state.checked,
                job_description: this.state.description,
                achievements: this.state.achievements
            }},
            success: (data) => {
                this.props.onAdd(data)
            }
        })
    }

    handleCheck(event){
        this.setState({ checked: event.target.checked, monthTo: null, yearTo: null })
    }

    componentWillMount(){
        $.ajax({
            url: '/api/work_experiences/new.json',
            dataType: 'JSON',
            method: 'GET',
            success: (data) => {
                this.setState({
                    jobLevels: data.job_levels,
                    jobFunctions: data.job_functions,
                    jobLevel: data.job_levels.find( x => x.label === 'Not Applicable' ),
                    months: data.months,
                    years: data.years
                })                
            }
        })
    }

    config1 = {
        placeholderText: 'What are your tasks during your employment?',
        charCounterCount: false
    }

    render(){
        return(
            <div className='panel-body mb25 mt25'>
                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='form-label'>Job Title</label>
                        <input type='text'
                            className='form-control'
                            onChange={(event) => this.setState({ jobTitle: event.target.value })}
                            value={this.state.jobTitle}
                            placeholder='Your job title here'                                            
                        />
                    </div>
                </div>

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='form-label'>Company</label>
                        <input type='text'
                            className='form-control'
                            onChange={(event) => this.setState({ company: event.target.value })}
                            value={this.state.company}
                            placeholder='Company you work with'                                            
                        />
                    </div>
                </div>

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label className='form-label'>Job Level</label>
                                <VirtualizedSelect
                                optionClassName='form-control'
                                options={this.state.jobLevels}
                                onChange={(value) => this.setState({ jobLevel: value })}
                                value={this.state.jobLevel}                  
                                />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Job Functions</label>
                                <Select.Creatable
                                optionClassName='form-control'
                                options={this.state.jobFunctions}
                                onChange={(value) => this.setState({ jobFunction: value })}
                                value={this.state.jobFunction}
                                placeholder='e.g. Architecture and Engineering'                   
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='form-label'>From:</label>   
                        <div className='row'>
                            <div className='col-md-6'>                              
                                <VirtualizedSelect
                                options={this.state.months}
                                onChange={(value) => this.setState({ monthFrom: value })}
                                value={this.state.monthFrom}
                                placeholder='Month'
                                
                                />
                            </div>
                            <div className='col-md-6'>   
                                <VirtualizedSelect
                                optionClassName='form-control'
                                options={this.state.years}
                                onChange={(value) => this.setState({ yearFrom: value })}
                                value={this.state.yearFrom}
                                placeholder='Year'                               
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <input type='checkbox' checked={this.state.checked} onChange={this.handleCheck.bind(this)} /><label className='form-label'><span className='gap3'>Currently Employed</span></label>  
                    </div>
                </div>

                {this.renderTo()}

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='form-label'>Description of your task</label>
                        <Froala
                            options={this.options}
                            tag='textarea'
                            config={this.config1}
                            model={this.state.description}
                            onModelChange={(model) => this.setState({ description: model })}
                        />    
                    </div>
                </div>

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='form-label'>Achievements (optional)</label>
                        <Froala
                            options={this.options}
                            tag='textarea'
                            config={{ placeholderText: 'What are your achiements during your employment?', charCounterCount: false}}
                            model={this.state.achievements}
                            onModelChange={(model) => this.setState({ achievements: model })}
                        />    
                    </div>
                </div>

                <div className='row pt20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <div className='col-lg-offset-4 col-md-offset-4 col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' disabled={this.disableButton()} onClick={this.handleAdd.bind(this)} className='btn btn-primary table-btn full-width'>Add</button>
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
        if(!this.state.company || !this.state.jobTitle || !this.state.jobFunction || !this.state.jobLevel || !this.state.monthFrom || !this.state.yearFrom || ( !this.state.checked && ( !this.state.monthTo || !this.state.yearTo ))){    
            return true 
        }
        return false
    }

    renderTo(){
        if(this.state.checked) { return }
        return(
            <div className='row pb20'>
                <div className='col-md-10 col-md-offset-1'>
                    <label className='form-label'>To:</label>
                    
                    <div className='row'>
                        <div className='col-md-6'>                              
                            <VirtualizedSelect
                            options={this.state.months}
                            onChange={(value) => this.setState({ monthTo: value })}
                            value={this.state.monthTo}
                            placeholder='Month'
                            
                            />
                        </div>
                        <div className='col-md-6'>   
                            <VirtualizedSelect
                            optionClassName='form-control'
                            options={this.state.years}
                            onChange={(value) => this.setState({ yearTo: value })}
                            value={this.state.yearTo}
                            placeholder='Year'                               
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}