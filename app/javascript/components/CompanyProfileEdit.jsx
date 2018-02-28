import React, { Component } from 'react'
import Select from 'react-select'
import VirtualizedSelect from 'react-virtualized-select'

export default class CompanyProfileEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            imageChanged: false,
            avatar: this.props.company.avatar,
            label: this.props.company.avatar === '/img/company-no-image-avatar.png' ? 'Upload Photo' : 'Change Photo' ,
            name: this.props.company.name,
            languageSpoken: this.props.company.languageSpoken,
            street: this.props.company.street,
            website: this.props.company.website,
            telefax: this.props.company.telefax
        }
    }

    handleImageUpload(event){
        var reader = new FileReader()
        this.setState({ avatar: event.target.files[0], imageChanged: true, label: 'Change photo' })         
        reader.onload = (e)=>{
            $('#image').attr('src', e.target.result)
        }        
        reader.readAsDataURL(event.target.files[0]) 
    } 

    changeCountry(value){
        this.setState({ state: value })
        $.ajax({
            url: `/api/companies/get_states.json?id=${this.props.company.id}&country=${value.label}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    states: data.states
                })
            }
        })
    }

    changeState(value){
        this.setState({ city: value })
        $.ajax({
            url: `/api/companies/get_cities.json?id=${this.props.company.id}&state=${value.label}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    cities: data.cities
                })
            }
        })
    }

    handleSave(){
        event.preventDefault()    
        var dataForm = new FormData()
        dataForm.append(`${this.state.imageChanged ? 'company[avatar]' : ''}`, this.state.avatar)
        dataForm.append('company[name]', this.state.name.replace(/\b\w/g, (letter)=>{ return letter.toUpperCase() }))
        dataForm.append('company[number_of_employees]', this.state.numOfEmp.label)
        dataForm.append('company[language_spoken]', this.state.languageSpoken)
        dataForm.append('company[website]', this.state.website)
        dataForm.append('company[industry]', this.state.industry.label)
        dataForm.append('company[telefax]', this.state.telefax)
        dataForm.append('company[industry]', this.state.industry.label)
        dataForm.append('location[country]', this.state.country.label)
        dataForm.append('location[state]', this.state.state.label)
        dataForm.append('location[city]', this.state.city.label)
        dataForm.append('location[street]', this.state.street)
        $.ajax({
            url: `/api/companies/${this.props.company.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'PATCH',
            processData: false,
            contentType: false,
            cache: false,
            data:                                                
                dataForm
            ,          
            success: (data)=>{                  
                this.props.onSave(data)                        
            }
        })
    }

    componentDidMount(){
        this.fetchData()
    }

    render(){
        return(
            <div className="panel">
                <div className="panel-body mr20 mb25 mt25">
                    <div className="row ml20 pb20">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className='col-lg-4 col-md-4 col-sm-4'>
                                <img id='image' alt="avatar image" className="company-avatar" src={this.state.avatar}/>
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
                            <div className='col-md-8 col-sm-8'>
                                <input className='form-control' value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
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
                                    options={this.state.states}
                                    onChange={this.changeState.bind(this)}
                                    value={this.state.state}                  
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
                                    options={this.state.cities}
                                    onChange={(value) => this.setState({ city: value })}
                                    value={this.state.city}                  
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
                                <input className='form-control' value={this.state.street} onChange={event => this.setState({ street: event.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className='row ml20 pb20'>
                        <div className='col-md-12 col-sm-12 col-xs-12'>
                            <div className='col-md-4 col-sm-4'> 
                                <label className='panel-label'>Industry</label>
                            </div>
                            <div className='col-md-8 col-sm-8'> 
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.industries}
                                    onChange={(value) => this.setState({ industry: value })}
                                    value={this.state.industry}                  
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row ml20 pb20'>
                        <div className='col-md-12 col-sm-12 col-xs-12'>
                            <div className='col-md-4 col-sm-4'> 
                                <label className='panel-label'>Company Size</label>
                            </div>
                            <div className='col-md-8 col-sm-8'> 
                                <Select.Creatable
                                    optionClassName='form-control'
                                    options={this.state.sizes}
                                    onChange={(value) => this.setState({ numOfEmp: value })}
                                    value={this.state.numOfEmp}                  
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
                                <input className='form-control' value={this.state.telefax} onChange={event => this.setState({ telefax: event.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className='row ml20 pb20'>
                        <div className='col-md-12 col-sm-12 col-xs-12'>
                            <div className='col-md-4 col-sm-4'>                        
                                <label className='panel-label'>Language Spoken</label>
                            </div>
                            <div className='col-md-8'>
                                <input className='form-control' value={this.state.languageSpoken} onChange={e => this.setState({ languageSpoken: e.target.value })} />
                            </div>                        
                        </div>
                    </div>

                    <div className='row ml20 pb20'>
                        <div className='col-md-12 col-sm-12 col-xs-12'>
                            <div className='col-md-4 col-sm-4'>                        
                                <label className='panel-label'>Website</label>
                            </div>
                            <div className='col-md-8'>
                                <input className='form-control' value={this.state.website} onChange={e => this.setState({ website: e.target.value })} />
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
            </div>
        )
    }

    fetchData(){
        $.ajax({
            url: `/api/companies/get_countries.json?id=${this.props.company.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    countries: data.countries,
                    sizes: data.sizes,
                    industries: data.industries,
                    numOfEmp: data.sizes.find( x => x.label === this.props.company.numOfEmp ),
                    country: data.countries.find( x => x.label === this.props.company.country ),
                    industry: data.industries.find( x => x.label === this.props.company.industry )
                })
            }
        })

        $.ajax({
            url: `/api/companies/get_states.json?id=${this.props.company.id}`,
            method: 'GET',
            data: { country: this.props.company.country },
            success: (data) => {
                this.setState({
                    states: data.states,
                    state: data.states.find( x => x.label === this.props.company.state )
                })
            }
        })

        $.ajax({
            url: `/api/companies/get_cities.json?id=${this.props.company.id}`,
            method: 'GET',
            data: { state: this.props.company.state },
            success: (data) => {
                this.setState({
                    cities: data.cities,
                    city: data.cities.find( x => x.label === this.props.company.city )
                })
            }
        })
    }
}