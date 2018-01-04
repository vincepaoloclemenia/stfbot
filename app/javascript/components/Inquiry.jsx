import React, { Component } from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';

export default class Inquiry extends React.Component{
    constructor(props){
        super(props)
        this.state = { duration: 3, disable: false, label: 'Submit Request', open: false, industries: [], countries: [], states: [], cities: [], numbers: [], message: '' }
        
    }

    onOpenModal(){
        this.setState({ open: true });
    }
    
    onCloseModal(){
        this.setState({ open: false });
        window.location.replace('/')
    }

    componentDidMount(){
        $.ajax({
            url: '/api/inquiries.json',
            method: 'GET',
            success: (data) => {
                this.setState({ industries: data.industries, information: data.information, numbers: data.size })
            }
        })
        $.ajax({
            url: '/api/users/get_countries.json',
            method: 'GET',
            success: (data) => {
                this.setState({ countries: data.countries })
            }
        })
    }

    countryChange(value){
        this.setState({ country: value })
        $.ajax({
            url: `/api/users/get_states.json?country=${value.label}`,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ states: data.states })
            }
        })
    }

    stateChange(value){
        this.setState({ countryState: value })
        $.ajax({
            url: `/api/users/get_cities.json?state=${value.label}`,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ cities: data.cities })
            }
        })
    }

    handleSubmit(){
        this.setState({ label: 'Requesting', disable: true })
        $.ajax({
            url: '/api/inquiries/',
            method: 'POST',
            data: { inquiry: {
                company_name: this.state.companyName,
                position: this.state.position,
                company_size: this.state.companySize.label,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                industry: this.state.companyIndustry.label,
                contact: this.state.contact,
                info_from: this.state.infoFrom.label,
                address: `${this.state.street} ${this.state.city.label}, ${this.state.countryState.label} ${this.state.country.label}`
            }},
            success: (data) => {
                this.setState({ 
                    open: true, 
                    message: data.message,
                    label: 'Request for demo sent'
                })
            }
            
        })
        setTimeout(() => { 
            this.onCloseModal.bind(this)
        }, 2500 )
    }

    render(){
        return(          
            <div className="row pt20 pb20">
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                    <div className='row mb20'>              
                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>First Name</label>
                            <input type='text' required='required' className='form-control' onChange={ e => this.setState({ firstName: e.target.value }) }/>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>Last Name</label>
                            <input type='text' required='required' className='form-control' onChange={ e => this.setState({ lastName: e.target.value }) }/>
                        </div>
                    </div>

                    <div className='row mb20'>              
                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>Company Name</label>
                            <input type='text' required='required' className='form-control' onChange={ e => this.setState({ companyName: e.target.value }) }/>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>Industry</label>
                            <Select.Creatable
                                options={this.state.industries}
                                onChange={(value) => this.setState({ companyIndustry: value })}
                                value={this.state.companyIndustry}                        
                            />
                        </div>
                    </div>

                    <div className='row mb20'>              
                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>Position in Company</label>
                            <input type='text' required='required' className='form-control' onChange={ e => this.setState({ position: e.target.value }) }/>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>Contact Number</label>
                            <input type='text' required='required' className='form-control' onChange={ e => this.setState({ contact: e.target.value }) }/>
                        </div>
                    </div>

                    <div className='row mb20'> 
                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>Company Size</label>
                            <Select.Creatable
                                options={this.state.numbers}
                                onChange={value => this.setState({ companySize: value })}
                                value={this.state.companySize}                        
                            />                            
                        </div>
                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>Country</label>
                            <Select.Creatable
                                options={this.state.countries}
                                onChange={this.countryChange.bind(this)}
                                value={this.state.country}                        
                            />                            
                        </div>
                    </div>

                    <div className='row mb20'>
                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>State</label>
                            <Select.Creatable
                                options={this.state.states}
                                onChange={this.stateChange.bind(this)}
                                value={this.state.countryState}                        
                            />
                        </div>              
                        <div className="col-lg-6 col-sm-6 col-xs-6 col-md-6">
                            <label className='panel-label'>City</label>
                            <Select.Creatable
                                options={this.state.cities}
                                onChange={value => this.setState({ city: value })}
                                value={this.state.city}                        
                            />
                        </div>                        
                    </div>

                    <div className='row mb20'> 
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label className='panel-label'>Street</label>
                            <input type='text' className='form-control' onChange={ e => this.setState({ street: e.target.value }) }/>
                        </div>
                    </div>

                    <div className='row mb20'> 
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <label className='panel-label'>How did you hear about us?</label>
                            <Select.Creatable
                                options={this.state.information}
                                onChange={value => this.setState({ infoFrom: value })}
                                value={this.state.infoFrom}                        
                            />
                        </div>
                    </div>

                    <div className='row mb20'>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className='actions'>
                                <button disabled={this.state.disable} type='button' className='btn btn-primary btn-signup' onClick={this.handleSubmit.bind(this)} >{this.state.label}</button>
                            </div>
                        </div>
                    </div>

                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal.bind(this)} little>
                    <div className='panel'>
                        <div className="panel-heading ml15 mr15 with-border"><h5>{this.state.message}</h5></div>
                    </div>
                </Modal>                    
            </div>
        )
    }
}