var moment = require('moment')
import React, { Component } from 'react'
import Select from 'react-select'
import VirtualizedSelect from 'react-virtualized-select'

export default class UserEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            imageChanged: false,
            countries: [], 
            userData: this.props.user,
            userAvatar: this.props.user.avatar, 
            firstName: this.props.user.first_name, 
            lastName: this.props.user.last_name,
            userState: null,
            userCity: null,
            contact: this.props.user.contact === null ? '' : this.props.user.contact,
            userStreet: this.props.user.street,
            birthDay: this.props.days.find( x => x.label === moment(`${this.props.user.birthdate}`, 'MMMM DD YYYY').format('D')),
            birthMonth: this.props.months.find( x => x.label === moment(`${this.props.user.birthdate}`, 'MMMM DD YYYY').format('MMM')),
            birthYear: this.props.years.find( x => x.label === moment(`${this.props.user.birthdate}`, 'MMMM DD YYYY').year()),
            months: this.props.months,
            years: this.props.years,
            days: this.props.days,
            genders: this.props.genders,
            userGender: this.props.genders.find( x => x.label === this.props.user.gender ),
            countryStates: [],
            label: this.props.user.avatar === '/img/no-user-image.jpg' ? 'Upload photo' : 'Change Photo'
        }
    }

    componentWillMount(){
        $.ajax({
            url: '/api/users/get_countries.json',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'GET',
            dataType: 'JSON',
            success: (data)=>{
                this.setState({ 
                    countries: data.countries,
                    country: data.countries.find( x => x.label === this.props.user.country )
                })
            }
        })
        $.ajax({
            url: `/api/users/get_states.json?country=${this.props.user.country}`,
            method: 'GET',
            success: (data) => {
                this.setState({ countryStates: data.states, userState: data.states.find( x => x.label === this.props.user.state ) })
            }
        })
        $.ajax({
            url: `/api/users/get_cities.json?state=${this.props.user.state}`,
            method: 'GET',
            success: (data) => {
                this.setState({ stateCities: data.cities, userCity: data.cities.find( x => x.label === this.props.user.city )})
            }
        })
    }

    changeCountry(value){
        this.setState({ country: value })
        $.ajax({
            url: `/api/users/get_states.json?country=${value.label}`,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ countryStates: data.states })
            }
        })
    }

    changeState(value){
        this.setState({ userState: value })
        $.ajax({
            url: `/api/users/get_cities.json?state=${value.label}`,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({ stateCities: data.cities })
            }
        })
    }

    handleSave(event){     
        event.preventDefault()    
        var dataForm = new FormData()
        dataForm.append(`${this.state.imageChanged ? 'user[avatar]' : ''}`, this.state.userAvatar)
        dataForm.append('user[first_name]', this.state.firstName.replace(/\b\w/g, (letter)=>{ return letter.toUpperCase() }))
        dataForm.append('user[last_name]', this.state.lastName.replace(/\b\w/g, (letter)=>{ return letter.toUpperCase() }))
        dataForm.append('user[gender]', this.state.userGender.label)
        dataForm.append('user[birthdate]', moment(`${this.state.birthMonth.label} ${this.state.birthDay.label}, ${this.state.birthYear.label}`, 'MMMM DD, YYYY').format('MMMM DD, YYYY'))
        dataForm.append('user[contact]', this.state.contact)
        dataForm.append('address[country]', this.state.country.label)
        dataForm.append('address[state]', this.state.userState.label)
        dataForm.append('address[city]', this.state.userCity.label)
        dataForm.append('address[street]', this.state.userStreet)
        $.ajax({
            url: `/api/users/${this.props.user.id}`,
            method: 'PUT',
            processData: false,
            contentType: false,
            cache: false,
            data:                                                
                dataForm
            ,          
            success: ()=>{                  
                this.props.onSave()                        
            }
        })
    }

    handleImageUpload(event){
        var reader = new FileReader()
        this.setState({ userAvatar: event.target.files[0], imageChanged: true, label: 'Change photo' })         
        reader.onload = (e)=>{
            $('#image').attr('src', e.target.result)
        }        
        reader.readAsDataURL(event.target.files[0]) 
    } 

    render(){
        return(
            <div className="panel-body mr20 mb25 mt25">
                <div className="row ml20 pb20">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className='col-lg-4 col-md-4 col-sm-4'>
                            <img id='image' style={{ width: 130, height: 130 }} alt="avatar image" className="avatar-image" src={this.state.userAvatar}/>
                        </div>
                        <div className='col-lg-8 col-md-8 col-sm-8'>
                            <div className='row pt35'>
                                <div className='col-md-6 col-sm-6'>
                                    <form id='user-avatar' action='' method='put' name='user-avatar' encType='multipart/form-data'>                                      
                                        <input id="avatar" type="file" name="avatar" className="image-input" accept='image/jpeg, image/png' onChange={this.handleImageUpload.bind(this)} />                              
                                        <label htmlFor='avatar'>{this.state.label}</label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className='col-md-4 col-sm-4'>
                            <label className='panel-label'>Name: </label>
                        </div>
                        <div className='col-md-4 col-sm-4'>
                            <input className='form-control' value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />
                        </div>
                        <div className='col-md-4 col-sm-4'>
                            <input className='form-control' value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })}/>
                        </div>
                    </div>
                </div>

                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className='col-md-4 col-sm-4'>                        
                            <label className='panel-label'>Email</label>
                        </div>
                        <div className='col-md-8'>
                            <input className='form-control' readOnly='true' value={this.props.user.email} />
                        </div>                        
                    </div>
                </div>

                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className='col-md-4 col-sm-4'>  
                            <label className='panel-label'>Country</label>
                        </div>
                        <div className='col-md-8 col-sm-8'>  
                            <Select.Creatable
                                optionClassName='form-control'
                                options={this.state.countries}
                                onChange={this.changeCountry.bind(this)}
                                value={this.state.country}
                                placeholder='Your country'                   
                            />
                        </div>
                    </div>
                </div>

                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className='col-md-4 col-sm-4'> 
                            <label className='panel-label'>State/Region</label>
                        </div>
                        <div className='col-md-8 col-sm-8'> 
                            <Select.Creatable
                                optionClassName='form-control'
                                options={this.state.countryStates}
                                onChange={this.changeState.bind(this)}
                                value={this.state.userState}                  
                            />
                        </div>
                    </div>
                </div>
                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className='col-md-4 col-sm-4'> 
                            <label className='panel-label'>City</label>
                        </div>
                        <div className='col-md-8 col-sm-8'> 
                            <Select.Creatable
                                optionClassName='form-control'
                                options={this.state.stateCities}
                                onChange={(value) => this.setState({ userCity: value })}
                                value={this.state.userCity}                  
                            />
                        </div>
                    </div>
                </div>

                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className='col-md-4 col-sm-4'>  
                            <label className='panel-label'>Street</label>
                        </div>
                        <div className='col-md-8 col-sm-8'>  
                            <input className='form-control' value={this.state.userStreet} onChange={event => this.setState({ userStreet: event.target.value })} placeholder='Street Address'/>
                        </div>
                    </div>
                </div>

                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className='col-md-4 col-sm-4'>  
                            <label className='panel-label'>Gender</label>
                        </div>
                        <div className='col-md-8 col-sm-8'>  
                            <VirtualizedSelect
                                options={this.state.genders}
                                onChange={(gender) => this.setState({ userGender: gender })}
                                value={this.state.userGender}                                             
                            />
                        </div>
                    </div>
                </div>
                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>                                                    
                        <div className='col-md-4'>
                            <label className='panel-label pull-left'>Birthdate</label>
                        </div>    
                        <div className='col-md-3'>    
                            <VirtualizedSelect
                                options={this.state.months}
                                onChange={(month) => this.setState({ birthMonth: month })}
                                value={this.state.birthMonth}                                             
                            />
                        </div>    
                        <div className='col-md-2'>   
                            <VirtualizedSelect
                                options={this.state.days}
                                onChange={(day) => this.setState({ birthDay: day })}
                                value={this.state.birthDay}                                             
                            />
                        </div>
                        <div className='col-md-3'>   
                            <VirtualizedSelect
                                options={this.state.years}
                                onChange={(year) => this.setState({ birthYear: year })}
                                value={this.state.birthYear}                                             
                            />
                        </div>              
                    </div>
                </div>

                <div className='row ml20 pb20'>
                    <div className='col-md-12 col-sm-12 col-xs-12'>
                        <div className='col-md-4 col-sm-4'>                          
                            <label className='panel-label'>Contact</label>
                        </div>
                        <div className='col-md-8 col-sm-8'>  
                            <input className='form-control' value={this.state.contact} onChange={ event => this.setState({ contact: event.target.value })} placeholder='Your contact number' />                        
                        </div>                    
                    </div>
                </div>

                <div className='row pt20'>
                    <div className='col-md-10 col-md-offset-1'>
                        <div className='col-lg-offset-4 col-md-offset-4 col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' onClick={this.handleSave.bind(this)} className='btn btn-primary table-btn full-width'>Save</button>
                        </div> 
                        <div className='col-md-4 col-lg-4 col-sm-4'>
                            <button type='button' onClick={() => this.props.onCloseForm()} className='btn btn-primary full-width modal-cancel'>Cancel</button>
                        </div>
                    </div>                 
                </div>
            </div>
        )
    }
    
}
