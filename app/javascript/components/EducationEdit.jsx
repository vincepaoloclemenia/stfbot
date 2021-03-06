var moment = require('moment');
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Select from 'react-select';
import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import Froala from 'react-froala-wysiwyg'

export default class EducationEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            universities: [], 
            months: [], 
            attainments: [], 
            years: [],
            courses: [],
            schoolName: this.props.education.school_name,
            course: this.props.education.course,
            attainment: null, 
            monthFrom: null,
            yearFrom: null,
            monthTo: null,            
            yearTo: null,
            wasGraduated: this.props.education.graduate,
            accomplishments: this.props.education.accomplishments
        }
    }

    handleUpdate(){
        $.ajax({
            url: `/api/educations/${this.props.education.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'PUT',
            data: { 
                    education: { school_name: this.state.schoolName.label,
                                    education_attainment: this.state.attainment.label,
                                    attend_from: moment(`${this.state.monthFrom.label} ${this.state.yearFrom.label}`, 'MMM-YYYY').format(),
                                    attend_to: moment(`${this.state.monthTo.label} ${this.state.yearTo.label}`, 'MMM-YYYY').format(),
                                    course: this.state.course === '' ? '' : this.state.course.label,
                                    status: this.state.wasGraduated,
                                    accomplishments: this.state.accomplishments                   
                                }
            },
            success: (response ) => {
                this.props.onUpdate()
            },
            error: (response) => {
                this.props.closeForm()
            }
        })
    }

    componentDidMount(){
        $.ajax({
            url: '/api/educations/get_options.json',
            method: 'GET',
            dataType: 'JSON',
            data: { id: this.props.education.id },
            success: (data) => {
                this.setState({
                    universities: data.universities,
                    attainments: data.attainments,
                    months: data.months,
                    years: data.years,
                    courses: data.courses, 
                    attainment: data.attainments.find(x => x.label === this.props.education.education_attainment),
                    course: this.props.education.course === '' ? '' : data.courses.find(x => x.label === this.props.education.course),
                    schoolName: data.universities.find( x => x.label === this.props.education.school_name ),
                    monthFrom: data.months.find( x => x.label === moment(`${this.props.education.attend_from}`, "MMM-YYYY").format('MMM')),
                    yearFrom: data.years.find( x => x.label === moment(`${this.props.education.attend_from}`, "MMM-YYYY").year()),
                    monthTo: data.months.find( x => x.label === moment(`${this.props.education.attend_to}`, "MMM-YYYY").format('MMM')),
                    yearTo: data.years.find( x => x.label === moment(`${this.props.education.attend_to}`, "MMM-YYYY").year())
                })
            }
        })
        
    }

    handleCheck(event){
        this.setState({ wasGraduated: event.target.checked })
    }

    render(){
        return(
            <div className='panel-body mb25 mt25'>
                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='panel-label'>Education Attainment</label>
                        <VirtualizedSelect
                        options={this.state.attainments}
                        onChange={(item) => this.setState({ attainment: item, course: null })}
                        value={this.state.attainment}
                                             
                        />
                    </div>
                </div>

                {this.renderCourse()}

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='panel-label'>School Name</label>
                        <Select.Creatable
                        options={this.state.universities}
                        onChange={(selectValue) => this.setState({ schoolName: selectValue })}
                        value={this.state.schoolName}
                        
                        />
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

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <input type='checkbox' checked={this.state.wasGraduated} onChange={this.handleCheck.bind(this)} /><label className='panel-label'><span className='gap3'>I've graduated</span></label>
                    </div>
                </div>

                <div className='row pb20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <label className='form-label'>Accomplishments / Achiements (optional)</label>
                        <Froala
                            options={this.options}
                            tag='textarea'
                            config={{ placeholderText: 'What have accomplished as student?', charCounterCount: false}}
                            model={this.state.accomplishments}
                            onModelChange={(model) => this.setState({ accomplishments: model })}
                        />    
                    </div>
                </div>

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
        if( this.state.attainment === null || this.state.monthFrom === null || this.state.monthTo === null || this.state.yearFrom === null || this.state.yearTo === null){
            return true
        }

        if ( this.state.attainment !== null && (this.state.attainment.label === 'College' || this.state.attainment.label === 'Vocational' ) && this.state.course === null ){
            return true
        }
        return false 
    }

    renderCourse(){
        if (this.state.attainment !== null && (this.state.attainment.label === 'College' || this.state.attainment.label === 'Vocational')) { 
            return(
                <div className='row pb20'>
                    <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1'>
                        <label className='panel-label'>Course/Degree: </label>       
                        <Select.Creatable
                        options={this.state.courses}
                        onChange={(value) => this.setState({ course: value })}
                        value={this.state.course}
                        />
                    </div>
                </div>
            )
        }
    }

}