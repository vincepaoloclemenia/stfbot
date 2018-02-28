import React, { Component } from 'react';
import Select from 'react-select';

export default class PreferenceJobFunctionNew extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            jobLevels: [],
            jobFunctions: [],
            jobPositions: [],
            jobShifts: [],
            jobTitles: [],
            location: this.props.preference ? this.props.preference.location.split(" | ") : [],
            functions: [],
            levels: [],
            positions: [],
            titles: [],
            salary: this.props.preference ? this.props.preference.salary.split(" | ") : [],
            amount: ''
        }
        this.functions = []
        this.levels = []
        this.positions = []
        this.titles = []
    }

    handleAdd(){
        if(
            !this.state.positions ||
            !this.state.levels ||
            !this.state.functions ||
            !this.state.titles ||
            !this.state.shift ||
            !this.state.amount ||
            !this.state.currency || 
            !this.state.country ||
            !this.state.state ||
            !this.state.city
        ){
            $.notify("Can't save blank fields", { className: 'error', position: 'top center'})                        
        }else{
            this.state.functions.map((f) => {
                this.functions.push(f.label)
            })
            this.state.positions.map((f) => {
                this.positions.push(f.label)
            })
            this.state.levels.map((f) => {
                this.levels.push(f.label)
            })
            this.state.titles.map((f) => {
                this.titles.push(f.label)
            })
            if(this.props.preference){
                $.ajax({
                    url: `/api/preferences/${this.props.preference.id}`,
                    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
                    method: 'PATCH',
                    data: {
                        preference: {
                            functions: this.functions,
                            positions: this.positions,
                            titles: this.titles,
                            levels: this.levels,
                            location: `${this.state.city.label} | ${this.state.state.label} | ${this.state.country.label}`,
                            salary: `${this.state.currency.label} | ${this.state.amount}`,
                            shift: this.state.shift.label
                        },
                        words: this.titles
                    },
                    success: (data) => {
                        this.props.onSave(data)
                    }
                })
            }else{
                $.ajax({
                    url: '/api/preferences',
                    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},            
                    method: 'POST',
                    dataType: 'JSON',
                    data: {
                        preference: {
                            functions: this.functions,
                            positions: this.positions,
                            titles: this.titles,
                            levels: this.levels,
                            location: `${this.state.city.label} | ${this.state.state.label} | ${this.state.country.label}`,
                            salary: `${this.state.currency.label} | ${this.state.amount}`,
                            shift: this.state.shift.label
                        },
                        words: this.titles
                    },
                    success: (data) => {
                        this.props.onSave(data)
                    }
                })
            }
        }
    }

    changeCountry(value){
        this.setState({ country: value })
        $.ajax({
            url: `/api/preferences/get_states.json?country=${value.label}`,
            method: 'GET',
            success: (data) => {
                this.setState({ states: data.states })
            }
        })
    }

    changeState(value){
        this.setState({ state: value })
        $.ajax({
            url: `/api/preferences/get_cities.json?state=${value.label}`,
            method: 'GET',
            success: (data) => {
                this.setState({ cities: data.cities })
            }
        })
    }

    componentDidMount(){
        $.ajax({
            url: '/api/preferences/get_information.json',
            method: 'GET',
            success: (data) => {               
                this.setState({ 
                    jobFunctions: data.functions,
                    jobLevels: data.levels,
                    jobTitles: data.titles,
                    jobPositions: data.positions,
                    jobShifts: data.shifts,
                    countries: data.countries,
                    currencies: data.currencies, 
                    functions: this.props.preference ? this.props.preference.functions.map( f => data.functions.find( x => x.label === f )) : [],
                    titles: this.props.preference ? this.props.preference.titles.map( f => data.titles.find( x => x.label === f )) : [],
                    levels: this.props.preference ? this.props.preference.levels.map( f => data.levels.find( x => x.label === f )) : [],
                    positions: this.props.preference ? this.props.preference.positions.map( f => data.positions.find( x => x.label === f )) : [],
                    shift: this.props.preference ? data.shifts.find( x => x.label === this.props.preference.shift ) : null,
                    country: this.props.preference ? data.countries.find( x => x.label === this.state.location[2]) : null,
                    currency: this.props.preference ? data.currencies.find( x => x.label === this.state.salary[0]) : null,
                    amount: this.props.preference ? this.state.salary[1] : '',
                    currency: this.props.preference ? data.currencies.find( x => x.label === this.state.salary[0] ) : null
                })                
            }
        })

        if(this.props.preference){
            $.ajax({
                url: `/api/preferences/get_states.json?country=${this.state.location[2]}`,
                method: 'GET',
                success: (data) => {
                    this.setState({ states: data.states, state: data.states.find( x => x.label === this.state.location[1] ) })
                }
            })
            $.ajax({
                url: `/api/preferences/get_cities.json?state=${this.state.location[1]}`,
                method: 'GET',
                success: (data) => {
                    this.setState({ cities: data.cities, city: data.cities.find( x => x.label === this.state.location[0] ) })
                }
            })
        }
    }

    render(){
        return(
            <div className='panel'>
                <div className="panel-heading ml15 mr15 with-border"><h5>Edit Preferences</h5></div>
                    <div className="panel-body mb25 mt25">
                        <div className='col-lg-8 col-md-10 col-sm-10 col-xs-10 col-lg-offset-2 col-md-offset-1 col-sm-offset-1 col-xs-offset-1'>
                            <div className='row pb20'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <label className='panel-label'>Job Function</label>
                                    <Select.Creatable
                                        multi={true}
                                        options={this.state.jobFunctions}
                                        onChange={value => this.setState({ functions: value })}
                                        value={this.state.functions}
                                    />
                                </div>
                            </div>
                            <div className='row pb20'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <label className='panel-label'>Job Title</label>
                                    <Select.Creatable
                                        multi={true}
                                        options={this.state.jobTitles}
                                        onChange={value => this.setState({ titles: value })}
                                        value={this.state.titles}
                                    />
                                </div>
                            </div>
                            <div className='row pb20'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <label className='panel-label'>Job Level</label>
                                    <Select.Creatable
                                        multi={true}
                                        options={this.state.jobLevels}
                                        onChange={value => this.setState({ levels: value })}
                                        value={this.state.levels}
                                    />
                                </div>
                            </div>

                            <div className='row pb20'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <label className='panel-label'>Type of Employment</label>
                                    <Select.Creatable
                                        multi={true}
                                        options={this.state.jobPositions}
                                        onChange={value => this.setState({ positions: value })}
                                        value={this.state.positions}
                                    />
                                </div>
                            </div>

                            <div className='row pb20'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <label className='panel-label'>Shift</label>
                                    <Select.Creatable
                                        options={this.state.jobShifts}
                                        onChange={value => this.setState({ shift: value })}
                                        value={this.state.shift}
                                    />
                                </div>
                            </div>

                            <div className='row pb20'>
                                
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>Country</label>
                                    <Select.Creatable
                                        options={this.state.countries}
                                        onChange={this.changeCountry.bind(this)}
                                        value={this.state.country}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>State / Region</label>
                                    <Select.Creatable
                                        options={this.state.states}
                                        onChange={this.changeState.bind(this)}
                                        value={this.state.state}
                                    />
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                    <label className='panel-label'>City</label>
                                    <Select.Creatable
                                        options={this.state.cities}
                                        onChange={value => this.setState({ city: value })}
                                        value={this.state.city}
                                    />
                                </div>
                                
                            </div>
                            
                            <div className='row pb20'>
                                <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                                    <label className='panel-label'>Currency</label>
                                    <Select.Creatable
                                        options={this.state.currencies}
                                        onChange={value => this.setState({ currency: value })}
                                        value={this.state.currency}
                                    />
                                </div>
                                <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9'>
                                    <label className='panel-label'>Amount</label>
                                    <input type='number' className='form-control' value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })} />
                                </div>                                
                            </div>

                            <div className='row pt20'>
                                <div className='col-md-10 col-md-offset-1'>
                                    <div className='col-lg-offset-4 col-md-offset-4 col-md-4 col-lg-4 col-sm-4'>
                                        <button type='button' onClick={this.handleAdd.bind(this)} className='btn btn-primary table-btn full-width'>Save</button>
                                    </div> 
                                    <div className='col-md-4 col-lg-4 col-sm-4'>
                                        <button type='button' onClick={() => this.props.onCloseForm()} className='btn btn-primary full-width modal-cancel'>Cancel</button>
                                    </div>
                                </div>                 
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}