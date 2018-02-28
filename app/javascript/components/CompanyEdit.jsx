import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import VirtualizedSelect from 'react-virtualized-select'
import Select from 'react-select'

export default class CompanyEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            openModal: false,
            companyName: this.props.company.name,
            telefax: this.props.company.contact,
            firstName: this.props.company.user_first_name,
            lastName: this.props.company.user_last_name,
            email: this.props.company.user_email,
            username: this.props.company.user_username,
            street: this.props.company.street
        }
    }

    handleUpdateCompany(){
        $.ajax({
            url: `/api/clients/${this.props.company.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'PATCH',
            data: {
                company: {
                    name: this.state.companyName,
                    industry: this.state.industry.label,
                    number_of_employees: this.state.companyEmployees.label,
                    telefax: this.state.telefax
                },
                user: {
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    username: this.state.username,
                    email: this.state.email
                },
                location: {
                    country: this.state.country.label,
                    state: this.state.state.label,
                    city: this.state.city.label,
                    street: this.state.street
                }
            },
            success: (data) => {
                this.setState({ openModal: false })
                this.props.onUpdate(data)
            }
        })
    }

    changeCountry(value){
        this.setState({ country: value })
        $.ajax({
            url: `/api/clients/get_states.json?country=${value.label}&id=${this.props.company.id}`,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ states: data.states })
            }
        })
    }

    changeState(value){
        this.setState({ state: value })
        $.ajax({
            url: `/api/clients/get_cities.json?state=${value.label}&id=${this.props.company.id}`,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ cities: data.cities })
            }
        })
    }

    componentDidMount(){
        $.ajax({
            url: `/api/clients/get_countries.json?id=${this.props.company.id}`,
            method: 'GET',
            success: (data)=>{
                this.setState({
                    countries: data.countries,
                    sizes: data.sizes,
                    industries: data.industries,
                    companyEmployees: data.sizes.find( x => x.label === this.props.company.number_of_employees),
                    industry: data.industries.find( x => x.label === this.props.company.industry),
                    country: data.countries.find( x => x.label === this.props.company.country ),
                })
            }
        })

        $.ajax({
            url: `/api/clients/get_states.json?country=${this.props.company.country}&id=${this.props.company.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    states: data.states,
                    state: data.states.find( x => x.label === this.props.company.state )
                })
            }
        })

        $.ajax({
            url: `/api/clients/get_cities.json?state=${this.props.company.state}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    cities: data.cities,
                    city: data.cities.find( x => x.label === this.props.company.city )
                })
            }
        })
    }

    render(){
        return(
            <button type='button' onClick={() => this.setState({ openModal: true })} className='btn btn-primary table-btn transparent'><span className='glyphicon glyphicon-edit'></span>
                <Modal open={this.state.openModal} onClose={() => this.setState({ openModal: false })} little>
                    <h5 className='modal-title-caption'>Update {this.props.company.name}</h5>
                    <div className='modal-form-container'>
                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Name</label>
                                <input className='form-control' value={this.state.companyName} type='text' onChange={ e => this.setState({ companyName: e.target.value })} />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Industry</label>
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.industries}
                                    onChange={ value => this.setState({ industry: value })}
                                    value={this.state.industry}               
                                />                            
                            </div>
                        </div>

                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Contact</label>
                                <input className='form-control' value={this.state.telefax} type='text' onChange={ e => this.setState({ telefax: e.target.value })} />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Company Size</label>
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.sizes}
                                    onChange={ value => this.setState({ companyEmployees: value })}
                                    value={this.state.companyEmployees}               
                                />                            
                            </div>
                        </div>

                        <div className='row pb20'>
                            <h5 className='modal-title-caption'>Location</h5>
                        </div>

                        
                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Country</label>
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.countries}
                                    onChange={this.changeCountry.bind(this)}
                                    value={this.state.country}               
                                />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>State</label>
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.states}
                                    onChange={this.changeState.bind(this)}
                                    value={this.state.state}               
                                />
                            </div>
                        </div>

                        
                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>City</label>
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.cities}
                                    onChange={ value => this.setState({ city: value })}
                                    value={this.state.city}               
                                />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Street</label>
                                <input className='form-control' value={this.state.street} type='text' onChange={ e => this.setState({ street: e.target.value })} />
                            </div>
                        </div>

                        <div className='row pb20'>
                            <h5 className='modal-title-caption'>Company Admin</h5>
                        </div>
                        
                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>First Name</label>
                                <input className='form-control' value={this.state.firstName} placeholder='First Name' onChange={e => this.setState({ firstName: e.target.value })} />
                            </div>
            
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Last Name</label>
                                <input className='form-control' value={this.state.lastName} placeholder='Last Name' onChange={e => this.setState({ lastName: e.target.value })} />
                            </div>
                        </div>

                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Email</label>
                                <input className='form-control' value={this.state.email} placeholder='First Name' onChange={e => this.setState({ email: e.target.value })} />
                            </div>
            
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='form-label'>Username</label>
                                <input className='form-control' value={this.state.username} placeholder='Last Name' onChange={e => this.setState({ username: e.target.value })} />
                            </div>
                        </div>

                        <div className='row pt20'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <div className='pull-right'>
                                    <button type='button' onClick={this.handleUpdateCompany.bind(this)} className='btn btn-primary rel-width table-btn'>Save</button>
                                </div> 
                            </div>                 
                        </div>
                    </div>
                
                </Modal>
            </button>
        )
    }


}