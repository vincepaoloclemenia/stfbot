import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'
import Select from 'react-select'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import Froala from 'react-froala-wysiwyg'
import Skills from 'components/JobSkills.jsx'

export default class JobEdit extends React.Component{
    constructor(props){
        super(props)
        this.years = [
            {value: '0', label: 1 },
            {value: '1', label: 2 },
            {value: '2', label: 3 },
            {value: '3', label: 4 },
            {value: '4', label: 5 },
            {value: '5', label: 6 },
            {value: '6', label: 7 },
            {value: '7', label: 8 },
            {value: '8', label: 9 },
            {value: '9', label: 10 },
            {value: '10', label: 11 },
            {value: '11', label: 12 },
            {value: '12', label: 13 },
            {value: '13', label: 14 },
            {value: '14', label: 15 }
        ]
        this.state ={
            disable: false,
            title: this.props.job.title,
            requisition: this.props.job.requisition_number,
            description: this.props.job.description,
            courses: this.props.job.preferred_courses,
            requirements: this.props.job.requirements,
            location: this.props.job.location.split(" | "),
            jobCourses: [],
            genders:[],
            positions: [],
            types: [],
            attainments: [],
            industries: [],
            label: 'Save',
            states: [],
            cities: [],
            skill: ''
        }
    }

    handleDelete(){
        var skills = this.state.requirements
        var index = skills.indexOf(skill)
        skills.splice(index, 1)
        this.setState({ requirements: skills })
    }

    handleAdd(){
        var skills = this.state.requirements
        skills.push(this.state.skill)
        this.setState({ requirements: skills, skill: '' })
    }

    handleSubmit(){
        this.setState({ disable: true, label: 'Updating Job Post...'})
        var courses = []
        this.state.courses.map( (c) => courses.push(c.label) )
        var job = { job: {
            title: this.state.title,
            description: this.state.description,
            location: `${this.state.city.label} | ${this.state.state.label} | ${this.state.country.label}`,
            industry: this.state.industry.label,
            gender: this.state.gender.label,
            level_of_expertise: this.state.position.label,
            type_of_employee: this.state.employeeType.label,
            min_exp: this.state.min_exp.label.toString(),
            max_exp: this.state.max_exp.label.toString(),
            requisition_number: this.state.requisition,
            education_attainment: this.state.attainment.label,
            requirements: this.state.requirements,
            preferred_courses: courses
        }}
        $.ajax({
            url: `/api/jobs/${this.props.job.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'PATCH',
            data: job,
            success: (data) => {
                if(data){
                    $.notify(data.error, { className: 'error', position: 'top center' })
                    this.setState({ label: 'Save', disable: false })
                }else{
                this.props.onEdit()
                }
            }
        })
    }

    changeCountry(value){
        this.setState({ country: value })
        $.ajax({
            url: `/api/jobs/get_states.json?country=${value.label}`,
            method: 'GET',
            success: (data) => {
                this.setState({ states: data.states })
            }
        })
    }

    changeState(value){
        this.setState({ state: value })
        $.ajax({
            url: `/api/jobs/get_cities.json?state=${value.label}`,
            method: 'GET',
            success: (data) => {
                this.setState({ cities: data.cities })
            }
        })
    }

    validateMax(value){        
        if(this.state.min_exp !== null){
            if(value){
                if(this.state.min_exp.label > value.label)
                    $('#max').notify("Maximum can't be lesser than minimum field", { className: 'error', position: 'bottom center' })
                else
                    this.setState({ max_exp: value })
            }else
                this.setState({ max_exp: value })
        }else{
            this.setState({ max_exp: value })
        }
    }

    validateMin(value){
        if(this.state.max_exp !== null){
            if(value){
                if(this.state.max_exp.label < value.label)
                    $('#min').notify("Minimum can't be greater than maximum field", { className: 'error', position: 'bottom center' })
                else
                    this.setState({ min_exp: value })
            }else
                this.setState({ min_exp: value })
        }else
            this.setState({ min_exp: value })
    }

    config1 = {
        placeholderText: 'Edit Your Job Description Here',
        charCounterCount: false
    }

    componentDidMount(){
        console.log(this.state.location[1])
        $.ajax({
            url: `/api/jobs/${this.props.job.id}/edit.json`,
            method: 'GET',
            success: (data) =>{
                this.setState({
                    jobCourses: data.courses,
                    attainments: data.attainments,
                    genders: data.genders,
                    positions: data.positions,
                    types: data.types,
                    industries: data.industries,
                    countries: data.countries,
                    employeeType: data.types.find( x => x.label === this.props.job.type_of_employee ),
                    position: data.positions.find( x => x.label === this.props.job.level_of_expertise ),
                    min_exp: this.years.find( x => x.label.toString() === this.props.job.min_exp ),
                    max_exp: this.years.find( x => x.label.toString() === this.props.job.max_exp ),
                    gender: data.genders.find( x => x.label === this.props.job.gender ),
                    attainment: data.attainments.find( x => x.label === this.props.job.education_attainment ),
                    industry: data.industries.find( x => x.label === this.props.job.industry),
                    courses: this.props.job.preferred_courses.map( c => data.courses.find( x => x.label === c )),
                    country: data.countries.find( x => x.label === this.state.location[2])            
                })
            }
        })
        $.ajax({
            url: `/api/jobs/get_states.json?country=${this.state.location[2]}`,
            method: 'GET',
            success: (data) => {
                this.setState({ states: data.states, state: data.states.find( x => x.label === this.state.location[1]) })
            }
        })
        $.ajax({
            url: `/api/jobs/get_cities.json?state=${this.state.location[1]}`,
            method: 'GET',
            success: (data) => {
                this.setState({ cities: data.cities, city: data.cities.find( x => x.label === this.state.location[0]) })
            }
        })
    }

    render(){
        return(
            <div className={this.props.class}>
                <div className='panel'>
                    <button onClick={() => this.props.hide()} className='btn btn-primary close pull-right'><i className='fa fa-window-close-o' aria-hidden='true'></i></button>
                    <div className="panel-heading ml15 mr15 with-border">Edit {this.props.job.title}</div>
                    <div className='panel-body'>
                        <div className='row'>
                            <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1'>
                                
                                <div className='row pb20'>
                                    <label className='form-label'><h5 className='form-header'>Job Information</h5></label>
                                </div>
                                <div className='row pb20'>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Title</label>
                                        <input className='form-control' value={this.state.title} type='text' onChange={ e => this.setState({ title: e.target.value })} />
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Type of Employee</label>
                                        <Select.Creatable
                                            options={this.state.types}
                                            onChange={ value => this.setState({ employeeType: value })}
                                            value={this.state.employeeType}
                                        />
                                    </div>
                                </div>

                                <div className='row pb20'>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Position</label>
                                        <Select.Creatable 
                                            options={this.state.positions}
                                            onChange={ value => this.setState({ position: value })}
                                            value={this.state.position}
                                        />
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Gender Preference</label>
                                        <Select.Creatable 
                                            options={this.state.genders}
                                            onChange={ value => this.setState({ gender: value })}
                                            value={this.state.gender}
                                        />
                                    </div>
                                </div>
                                    
                                <div className='row pb20'>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Industry</label>
                                        <Select.Creatable
                                            options={this.state.industries}
                                            onChange={ value => this.setState({ industry: value })}
                                            value={this.state.industry}
                                        />
                                    </div>
                                
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Requisition Number</label>
                                        <input className='form-control' value={this.state.requisition} type='text' onChange={ e => this.setState({ requisition: e.target.value })} />
                                    </div>
                                </div>

                                <div className='row pb20'>
                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                        <label className='form-label'>Country</label>
                                        <Select.Creatable 
                                            options={this.state.countries}
                                            onChange={this.changeCountry.bind(this)}
                                            value={this.state.country}
                                        />
                                    </div>
                                </div>

                                <div className='row pb20'>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>State</label>
                                        <Select.Creatable
                                            options={this.state.states}
                                            onChange={this.changeState.bind(this)}
                                            value={this.state.state}
                                        />
                                    </div>
                                
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>City</label>
                                        <Select.Creatable
                                            options={this.state.cities}
                                            onChange={ value => this.setState({ city: value })}
                                            value={this.state.city}
                                        />
                                    </div>
                                </div>
                            
                                <div className='row pb20 pt20'>
                                    <label className='form-label'><h5 className='form-header'>Qualifications</h5></label>
                                </div>

                                <div className='row pb20'>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Minimum Years of Experience</label>
                                        <Select.Creatable 
                                            id='min'
                                            options={this.years}
                                            onChange={this.validateMin.bind(this)}
                                            value={this.state.min_exp}
                                        />
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Maximum Years of Experience</label>
                                        <Select.Creatable 
                                            id='max'
                                            options={this.years}
                                            onChange={this.validateMax.bind(this)}
                                            value={this.state.max_exp}
                                        />
                                    </div>
                                </div>

                                <div className='row pb20'>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Preferred Courses Attained</label>
                                        <Select.Creatable 
                                            multi={true}
                                            options={this.state.jobCourses}
                                            onChange={ value => this.setState({ courses: value })}
                                            value={this.state.courses}
                                        />      
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                        <label className='form-label'>Qualification for Education Attainment</label>
                                        <Select.Creatable 
                                            options={this.state.attainments}
                                            onChange={ value => this.setState({ attainment: value })}
                                            value={this.state.attainment}
                                        />                       
                                    </div>
                                </div>

                                <div className='row pb20'>                                
                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                        <label className='form-label'>Required Skills</label>
                                        <div className='input-group'>  
                                            <input id='skill' className='form-control' value={this.state.skill} onChange={e => this.setState({ skill: e.target.value })} />
                                            <span className='input-group-btn'>
                                                <button type='button' onClick={this.handleAdd.bind(this)} className='btn btn-primary table-btn btn35'>+</button>   
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='row pb20'>
                                    <div className='col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1'>     
                                        {this.state.requirements.map((skill, index) => 
                                            <Skills skill={skill} key={index} deleteSkill={this.handleDelete.bind(this)} />
                                        )}
                                    </div>
                                </div>

                                <div className='row pb20 pt20'>
                                    <label className='form-label'><h5 className='form-header'>Job Description</h5></label>
                                </div>

                                <div className='row pb20'>
                                    <div className='col-lg-12 col-md-12 col-sm-12'>
                                        <Froala
                                            options={this.options}
                                            tag='textarea'
                                            config={this.config1}
                                            model={this.state.description}
                                            onModelChange={model => this.setState({ description: model })}
                                        />      
                                    </div>
                                </div>

                                <div className='row mb20'>
                                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
                                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>    
                                            <div className='actions'>
                                                <button type='button' disabled={this.state.disable} className='btn btn-primary btn-signup' onClick={this.handleSubmit.bind(this)} >{this.state.label}</button>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                            <div className='actions'>
                                                <button type='button' onClick={() => this.props.onClose()} className='btn btn-primary cancel'>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}