var React = require("react")
var PropTypes = require("prop-types")
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import VirtualizedSelect from 'react-virtualized-select'
import Select from 'react-select'

export default class CompanyAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = { open: false }
    }

    changeCountry(value){
        this.setState({ country: value })
        $.ajax({
            url: `/api/clients/get_states.json?country=${value.label}`,
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
            url: `/api/clients/get_cities.json?state=${value.label}`,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ cities: data.cities })
            }
        })
    }

    handleSave(){
        $.ajax({
            url: '/api/clients/',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'POST',
            data:{
                company: {
                    name: this.state.companyName,
                    industry: this.state.industry.label,
                    number_of_employees: this.state.companyEmployees.label,
                    telefax: this.state.companyContact
                },
                user: {
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    username: this.state.username,
                    email: this.state.email,
                    password: 'password123',
                    role: 'company_admin'
                },
                location: {
                    country: this.state.country.label,
                    state: this.state.state.label,
                    city: this.state.city.label,
                    street: this.state.street
                }
            },
            success: (data) =>{
                this.setState({ open: false })
                this.props.onAdd(data)
            }
        })
    }

    handleCancel(){
        this.setState({
            open: false,
            country: null,
            state: null,
            street: null,
            city: null,
            firstName: null,
            lastName: null,
            email: null,
            companyName: null,
            industry: null
        })
    }

    componentDidMount(){
        $.ajax({
            url: '/api/clients/get_countries.json',
            method: 'GET',
            success: (data) => {
                this.setState({ countries: data.countries, industries: data.industries, sizes: data.sizes })
            }
        })
    }

    render(){
        return(
            <div className='panel-heading'>Subscribed Companies 
                <button onClick={()=>this.setState({ open: true })} className='btn btn-primary pull-right table-btn'>Add New Company</button>
                <Modal open={this.state.open} onClose={() => this.setState({ open: false })}>
                    <h5 className='modal-title-caption'>Add New Company</h5>
                    <div className='modal-form-container'>
                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Name</label>
                                <input className='form-control' type='text' onChange={ e => this.setState({ companyName: e.target.value })} />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Industry</label>
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
                                <label className='panel-label'>Contact</label>
                                <input className='form-control' type='text' onChange={ e => this.setState({ companyContact: e.target.value })} />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Company Size</label>
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
                                <label className='panel-label'>Country</label>
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.countries}
                                    onChange={this.changeCountry.bind(this)}
                                    value={this.state.country}               
                                />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>State</label>
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
                                <label className='panel-label'>City</label>
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.cities}
                                    onChange={ value => this.setState({ city: value })}
                                    value={this.state.city}               
                                />
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Street</label>
                                <input className='form-control' type='text' onChange={ e => this.setState({ street: e.target.value })} />
                            </div>
                        </div>

                        <div className='row pb20'>
                            <h5 className='modal-title-caption'>Company Admin</h5>
                        </div>
                        
                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>First Name</label>
                                <input className='form-control' placeholder='First Name' onChange={e => this.setState({ firstName: e.target.value })} />
                            </div>
            
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Last Name</label>
                                <input className='form-control' placeholder='Last Name' onChange={e => this.setState({ lastName: e.target.value })} />
                            </div>
                        </div>

                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Email</label>
                                <input className='form-control' placeholder='First Name' onChange={e => this.setState({ email: e.target.value })} />
                            </div>
            
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Username</label>
                                <input className='form-control' placeholder='Last Name' onChange={e => this.setState({ username: e.target.value })} />
                            </div>
                        </div>

                        <div className='row pt20'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <div className='pull-right'>
                                    <button type='button' onClick={this.handleSave.bind(this)} className='btn btn-primary rel-width table-btn'>Add</button>
                                    <button type='button' onClick={this.handleCancel.bind(this)} className='btn btn-primary rel-width modal-cancel'>Cancel</button>
                                </div> 
                            </div>                 
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}