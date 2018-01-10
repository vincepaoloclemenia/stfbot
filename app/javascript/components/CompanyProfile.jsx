import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Edit from 'components/CompanyProfileEdit.jsx'
import Overview from 'components/CompanyOverviewEdit.jsx'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

export default class CompanyProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = { editProfile: false, company: {}, editOverview: false }
    }

    handleSave(data){
        this.setState({ editProfile: false })
        this.fetchCompanyData()
        $.notify(data.message, { className: 'success', position: 'top center' } )        
    }

    handleCanelEdit(){
        this.setState({ editProfile: false })
    }

    handleUpdate(data){
        this.setState({ editOverview: false })
        this.fetchCompanyData()
        $.notify(data.message, { className: 'success', position: 'top center' } )    
    }

    handleCloseEdit(){
        this.setState({ editOverview: false })
    }

    componentDidMount(){
        this.fetchCompanyData()
    }

    render(){    
        return(
            <div className="row m70">
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">
                        <div className='row pb15'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                {this.renderJumbotron()}
                            </div>
                        </div>
                        <div className='row pb15'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                {this.renderPanel()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderPanel(){
        if (this.state.editOverview){ 
            return(
                <Overview company={this.state.company} onUpdate={this.handleUpdate.bind(this)} onCancel={this.handleCloseEdit.bind(this)} />
            )
        }
        return(
            <div className='panel'>           
                <div className="panel-heading ml15 mr15 with-border"><h4 className='company-profile'><i className="fa fa-info-circle with-color" aria-hidden="true"><span className='gap1'></span>About</i>{this.renderOverviewButton()}</h4></div>
                <div className="panel-body mr20 mb25 mt15">
                    <h5 className='company-header pl20 fs16'>Company Overview</h5>
                    <div className="row ml20 pb20">
                        <div className='col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1'>
                            <div className='company-content'>
                                <FroalaEditorView 
                                    model={this.state.company.overview}
                                />
                            </div>
                        </div>
                    </div>
                    <h5 className='company-header pl20 fs16'>Why Join Us</h5>
                    <div className="row ml20 pb20">
                        <div className='col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1'>
                            <div className='company-content'>    
                                <FroalaEditorView 
                                    model={this.state.company.whyJoinUs}
                                />
                            </div>
                        </div>
                    </div>
                    <h5 className='company-header pl20 fs16'>Benefits</h5>
                    <div className="row ml20 pb20">
                        <div className='col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1'>
                            <div className='company-content'><p>{this.state.company.companyBenefits}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderJumbotron(){
        if (this.state.editProfile){ 
            return(
                <Edit company={this.state.company} onSave={this.handleSave.bind(this)} onCloseForm={this.handleCanelEdit.bind(this) } />
            ) 
        }
        return(
            <div className='panel'>
                <img className='img-responsive full' src={this.state.company.avatar} />
                <div className='panel-body'>
                    {this.renderButtons()}
                    <div className='company-cover-pad'>
                        
                        <img className='company-display-picture' src={this.state.company.avatar} />
                        <div className='row'> 
                            <h4 className='company-header fs25'>{this.state.company.name}</h4>
                            <div className='col-lg-6 col-md-6 col-sm-6'> 
                                <div className='row'>                                              
                                    <div className='col-lg-1 col-md-1 col-sm-1'>
                                        <i className="fa fa-map-marker fa-lg color-red pr1" aria-hidden="true"></i>
                                    </div>
                                    <div className='col-lg-11 col-md-11 col-sm-11'>
                                        <p className='company-prof'>
                                            {this.state.company.street} {this.state.company.city}, {this.state.company.country}
                                        </p>
                                    </div>                    
                                </div>
                                <div className='row'>
                                    <div className='col-lg-1 col-md-1 col-sm-1'>
                                        <i className="fa fa-industry fa-lg with-color pr1" aria-hidden="true"></i>
                                    </div>
                                    <div className='col-lg-11 col-md-11 col-sm-11'>
                                        <p className='company-prof'>
                                            {this.state.company.industry}
                                        </p> 
                                    </div>                                    
                                </div>   
                                <div className='row'>              
                                    <div className='col-lg-1 col-md-1 col-sm-1'>
                                        <i className="fa fa-globe fa-lg with-color pr1" aria-hidden="true"></i>
                                    </div>
                                    <div className='col-lg-11 col-md-11 col-sm-11'>
                                        <p className='company-prof'>
                                            <a href={this.state.company.website}>{this.state.company.website}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6'> 
                                <div className='padded-to-right'>
                                    <div className='row'>                                
                                        <div className='col-lg-1 col-md-1 col-sm-1'>
                                            <i className="fa fa fa-users fa-lg with-color pr1" aria-hidden="true"></i>
                                        </div>
                                        <div className='col-lg-11 col-md-11 col-sm-11'>
                                            <p className='company-prof'>
                                                {this.state.company.numOfEmp} employees
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>     
                                        <div className='col-lg-1 col-md-1 col-sm-1'>
                                            <i className="fa fa-american-sign-language-interpreting fa-lg with-color pr1" aria-hidden="true"></i>
                                        </div>
                                        <div className='col-lg-11 col-md-11 col-sm-11'>
                                            <p className='company-prof'>
                                                {this.state.company.languageSpoken}
                                            </p> 
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

    renderButtons(){
        if(this.props.currentCompany){
            return(
                <div className='pull-right'>
                    <button onClick={() => this.setState({ editProfile: true })} className='btn btn-primary company-edit'><i className="fa fa-pencil pr1" aria-hidden="true"></i>Edit Company Profile</button>
                </div>
            )
        }
    }

    renderOverviewButton(){
        if(this.props.currentCompany){
            return(
                <button onClick={() => this.setState({ editOverview: true })} className='btn btn-primary company-overview pull-right'><i className="fa fa-pencil pr1" aria-hidden="true"></i>Edit Overview</button>                
            )
        }
    }

    fetchCompanyData(){
        $.ajax({
            url: `/api/companies/get_company_profile.json`,
            data: { id: this.props.company.id },
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                this.setState({
                    company: { 
                        id: data.id, 
                        name: data.name,
                        numOfEmp: data.number_of_employees,
                        telefax: data.telefax,
                        country: data.country,
                        state: data.state,
                        city: data.city,
                        street: data.street,
                        industry: data.industry,
                        avatar: data.avatar,
                        overview: data.overview,
                        whyJoinUs: data.why_join_us,
                        languageSpoken: data.language_spoken,
                        companyBenefits: data.benefits,
                        website: data.website 
                    }                   
                })
            }
        })        
    }
    
}