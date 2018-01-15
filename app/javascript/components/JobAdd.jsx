import React, { Component } from 'react'
import VirtualizedSelect from 'react-virtualized-select'
import Select from 'react-select'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import Froala from 'react-froala-wysiwyg'

export default class JobAdd extends React.Component{
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
        this.state = {
            attainments: [],
            positions: [],
            types: [],
            genders: [],
            industries: [],
            minimum: '',
            maximum: '',
            label: 'Create Job Post',
            disable: false
        }
    }

    validateMax(value){        
        if(this.state.minimum !== null){
            if(value){
                if(this.state.minimum.label > value.label)
                    $('#max').notify("Maximum can't be lesser than minimum field", { className: 'error', position: 'bottom' })
                else
                    this.setState({ maximum: value })
            }else
                this.setState({ maximum: value })
        }else{
            this.setState({ maximum: value })
        }
    }

    validateMin(value){
        if(this.state.maximum !== null){
            if(value){
                if(this.state.maximum.label < value.label)
                    $('#min').notify("Minimum can't be greater than maximum field", { className: 'error', position: 'bottom' })
                else
                    this.setState({ minimum: value })
            }else
                this.setState({ minimum: value })
        }else
            this.setState({ minimum: value })
    }

    handleSubmit(){
        this.setState({ disable: true, label: 'Saving Job Post...'})
        $.ajax({
            url: '/api/jobs/',
            method: 'POST',
            data: {
                job: {
                    title: this.state.title,
                    description: this.state.description,
                    site: this.state.location.label,
                    industry: this.state.industry.label,
                    gender: this.state.genders.label,
                    level_of_expertise: this.state.position.label,
                    type_of_employee: this.state.employeeType.label,
                    min_exp: this.state.minimum.label.toString(),
                    max_exp: this.state.maximum.label.toString(),
                    requisition_number: this.state.requisition,
                    education_attainment: this.state.attainment.label
                }
            },
            success: (data) => {
                this.props.onAdd(data)
            }
        })
    }

    handleModelChange(model){
        this.setState({ description: model })
    }

    config1 = {
        placeholderText: 'Edit Your Job Description Here',
        charCounterCount: false
    }

    componentDidMount(){
        this.fetchData()
    }

    render(){
        return(
            <div className='panel'>
                <div className="panel-heading ml15 mr15 with-border"><h5>Add New Job</h5></div>
                <div className='panel-body mb25 mt25'>
                    <div className='row'>
                        <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1'>
                            <div className='row pb20'>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                    <label className='panel-label'>Title</label>
                                    <input className='form-control' type='text' onChange={ e => this.setState({ title: e.target.value })} />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                    <label className='panel-label'>Type of Employee</label>
                                    <Select.Creatable
                                        options={this.state.types}
                                        onChange={ value => this.setState({ employeeType: value })}
                                        value={this.state.employeeType}
                                    />
                                </div>
                            </div>

                            <div className='row pb20'>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                    <label className='panel-label'>Position</label>
                                    <Select.Creatable 
                                        options={this.state.positions}
                                        onChange={ value => this.setState({ position: value })}
                                        value={this.state.position}
                                    />
                                </div>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                    <label className='panel-label'>Qualification for Education Attainment</label>
                                    <Select.Creatable 
                                        options={this.state.attainments}
                                        onChange={ value => this.setState({ attainment: value })}
                                        value={this.state.attainment}
                                    />
                                </div>
                            </div>
                                    
                            <div className='row pb20'>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>Industry</label>
                                    <Select.Creatable
                                        options={this.state.industries}
                                        onChange={ value => this.setState({ industry: value })}
                                        value={this.state.industry}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>Gender Preference</label>
                                    <Select.Creatable 
                                        options={this.state.genders}
                                        onChange={ value => this.setState({ gender: value })}
                                        value={this.state.gender}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>Location</label>
                                    <Select.Creatable 
                                        options={[{value: '1', label: this.state.location}]}
                                        onChange={ value => this.setState({ site: value })}
                                        value={this.state.site}
                                    />
                                </div>
                            </div>
                            <div className='row m70'>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>Minimum Years Experience</label>
                                    <Select.Creatable 
                                        id='min'
                                        options={this.years}
                                        onChange={this.validateMin.bind(this)}
                                        value={this.state.minimum}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>Maximum Years of Experience</label>
                                    <Select.Creatable 
                                        id='max'
                                        options={this.years}
                                        onChange={this.validateMax.bind(this)}
                                        value={this.state.maximum}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>Requisition Number</label>
                                    <input className='form-control' type='text' onChange={ e => this.setState({ requisition: e.target.value })} />
                                </div>
                            </div>
                            <div className='row pb20'>
                                <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1'>
                                    <label className='panel-label'>Job Description</label>
                                    <Froala
                                        options={this.options}
                                        tag='textarea'
                                        config={this.config1}
                                        model={this.state.description}
                                        onModelChange={this.handleModelChange.bind(this)}
                                    />      
                                </div>
                            </div>
                            <div className='row mb20'>
                                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
                                    <div className='actions'>
                                        <button type='button' disabled={this.state.disable} className='btn btn-primary btn-signup' onClick={this.handleSubmit.bind(this)} >{this.state.label}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    fetchData(){
        $.ajax({
            url: '/api/jobs/new.json',
            method: 'GET',
            success: (data) => {
                this.setState({ 
                    attainments: data.attainments,
                    positions: data.positions,
                    types: data.types,
                    location: `${data.location.city} ${data.location.state}, ${data.location.country}`,
                    industries: data.industries,
                    genders: data.genders
                })
            }
        })
    }
}