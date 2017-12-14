import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import Select from 'react-select';
import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select'

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
            course: null,
            attainment: null, 
            monthFrom: null,
            yearFrom: null,
            monthTo: null,            
            yearTo: null,
            wasGraduated: this.props.education.graduate
        }
    }

    handleUpdate(){
        $.ajax({
            url: `/api/educations/${this.props.education.id}`,
            method: 'PUT',
            data: { 
                    education: { school_name: this.state.schoolName.label,
                                    education_attainment: this.state.attainment.label,
                                    attend_from: new Date(`${this.state.monthFrom.label} ${this.state.yearFrom.label}`),
                                    attend_to: new Date(`${this.state.monthTo.label} ${this.state.yearTo.label}`),
                                    course: this.state.course === null ? '' : this.state.course.label,
                                    status: this.state.wasGraduated                    
                                }
            },
            success: (response ) => {
                this.props.onUpdate(response)
                console.log ('It Worked!', response)
            }
        })
    }

    componentWillMount(){
        const array = this.state.universities
        console.log(array.findIndex(this.findItem))
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
                    course: data.courses.find(x => x.label === this.props.education.course),
                    schoolName: data.universities.find( x => x.label === this.props.education.school_name ),
                    monthFrom: data.months.find( x => x.value === new Date(this.props.education.attend_from).getMonth()),
                    yearFrom: data.years.find( x => x.label === new Date(this.props.education.attend_from).getFullYear()),
                    monthTo: data.months.find( x => x.value === new Date(this.props.education.attend_to).getMonth()),
                    yearTo: data.years.find( x => x.label === new Date(this.props.education.attend_to).getFullYear())
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
                        onChange={(item) => this.setState({ attainment: item })}
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

        if ( this.state.attainment !== null && this.state.attainment === 'College' && this.state.course === null ){
            return true
        }
        return false 
    }

    renderCourse(){
        if (this.state.attainment !== null && this.state.attainment.label === 'College') { 
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