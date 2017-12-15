import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Select from 'react-select';
import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'

export default class WorkExperienceEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            company: this.props.experience.company_name, 
            jobTitle: this.props.experience.job_title, 
            employed: this.props.experience.employment_status
        }
    }

    handleUpdate(){
        $.ajax({
            url: `/api/work_experiences/${this.props.experience.id}`,
            method: 'PUT',
            data: { work_experience: {
                company_name: this.state.company,
                job_title: this.state.jobTitle,
                job_level: this.state.jobLevel.label,
                employment_from: new Date(`${this.state.monthFrom.label} ${this.state.yearFrom.label}`),
                employment_to: this.state.employed ? null : new Date(`${this.state.monthTo.label} ${this.state.yearTo.label}`),
                job_functions: this.state.jobFunction.label,
                employment_status: this.state.employed
            }},
            success: (data) => {
                this.props.onUpdate()
            }
        })
    }

    handleCheck(event){
        this.setState({ employed: event.target.checked, monthTo: null, yearTo: null })
    }

    componentWillMount(){
        $.ajax({
            url: `/api/work_experiences/${this.props.experience.id}/edit`,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({
                    months: data.months,
                    years: data.years,
                    jobLevels: data.job_levels,
                    jobFunctions: data.job_functions,
                    jobFunction: data.job_functions.find( x => x.label === this.props.experience.job_functions ),
                    jobLevel: data.job_levels.find( x => x.label === this.props.experience.job_level ),
                    monthFrom: data.months.find( x => x.value === new Date(this.props.experience.employment_from).getMonth()),
                    yearFrom: data.years.find( x => x.label === new Date(this.props.experience.employment_from).getFullYear()),
                    monthTo: data.months.find( x => x.value === new Date(this.props.experience.employment_to).getMonth()),
                    yearTo: data.years.find( x => x.label === new Date(this.props.experience.employment_to).getFullYear())  
                })
            }
        })
    }

    render(){
        return(
            <div className='panel-body mb25 mt25'>
                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='panel-label'>Job Title</label>
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
                        <label className='panel-label'>Company</label>
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
                                <label className='panel-label'>Job Level</label>
                                <VirtualizedSelect
                                optionClassName='form-control'
                                options={this.state.jobLevels}
                                onChange={(value) => this.setState({ jobLevel: value })}
                                value={this.state.jobLevel}                  
                                />
                            </div>
                            <div className='col-md-6'>
                                <label className='panel-label'>Job Functions</label>
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
                        <label className='panel-label'>From:</label>   
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
                        <input type='checkbox' checked={this.state.employed} onChange={this.handleCheck.bind(this)} /><label className='panel-label'><span className='gap3'>Currently Employed</span></label>  
                    </div>
                </div>

                {this.renderTo()}

                <div className='row pt20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <div className='col-lg-offset-4 col-md-offset-4 col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' disabled={this.disableButton()} onClick={this.handleUpdate.bind(this)} className='btn btn-primary table-btn full-width'>Save</button>
                        </div> 
                        <div className='col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' onClick={() => this.props.closeForm()} className='btn btn-primary modal-cancel full-width'>Cancel</button>
                        </div>
                    </div>                 
                </div>
            </div>
        )
    }

    disableButton(){
        if(!this.state.company || !this.state.jobTitle || !this.state.jobFunction || !this.state.jobLevel || !this.state.monthFrom || !this.state.yearFrom || ( !this.state.employed && ( !this.state.monthTo || !this.state.yearTo ))){    
            return true 
        }
        return false
    }


    renderTo(){
        if(this.state.employed) { return }
        return(
            <div className='row pb20'>
                <div className='col-md-10 col-md-offset-1'>
                    <label className='panel-label'>To:</label>
                    
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