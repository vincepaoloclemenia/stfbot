import React from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import Froala from 'react-froala-wysiwyg'

export default class CompanyOverviewEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            overview: this.props.company.overview,
            benefits: this.props.company.companyBenefits,
            whyJoinUs: this.props.company.whyJoinUs
        }
    }

    handleUpdate(){
        $.ajax({
            url: `/api/companies/update_overview?id=${this.props.company.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'PATCH',
            data: { 
                company: { overview: this.state.overview, why_join_us: this.state.whyJoinUs, benefits: this.state.benefits }
            },
            success: (data) => {
                this.props.onUpdate(data)
            }
        })
    }

    componentDidMount(){

    }
    
    handleModelChange(model){
        this.setState({ overview: model })
    }

    handleWhyJoinUs(model){
        this.setState({ whyJoinUs: model })
    }

    config1 = {
        placeholderText: 'Edit Your Overview Here!',
        charCounterCount: false
    }
    config2 = {
        placeholderText: 'Edit Your Why Join Your Company Here!',
        charCounterCount: false
    }

    options= {
        placeholder: "Edit Me",
        events: {
            'froalaEditor.focus' : (e, editor) => {
                console.log(editor.selection.get());
            }
        }
    }
      

    render(){
        return(
            <div className="panel">
                <div className="panel-heading ml15 mr15 with-border"><h4 className='company-profile'><i className="fa fa-pencil pr1 with-color" aria-hidden="true"><span className='gap1'></span>Edit {this.props.company.name}'s Profile</i></h4></div>
                <div className="panel-body mr20 mb25 mt25">
                    <div className="row ml20 pb20">
                        <h5 className='company-header pl20 fs16'>Company Overview</h5>
                        <div className='col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1'>
                            <Froala
                                options={this.options}
                                tag='textarea'
                                config={this.config1}
                                model={this.state.overview}
                                onModelChange={this.handleModelChange.bind(this)}
                            />                        
                        </div>
                    </div>
                    <div className="row ml20 pb20">
                        <h5 className='company-header pl20 fs16'>Why join your company?</h5>
                        <div className='col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1'>
                            <Froala
                                tag='textarea'
                                config={this.config2}
                                model={this.state.whyJoinUs}
                                onModelChange={this.handleWhyJoinUs.bind(this)}
                            />                        
                        </div>
                    </div>
                    <div className="row ml20 pb20">
                        <h5 className='company-header pl20 fs16'>Benefits</h5>
                        <div className='col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1'>
                            <input className='form-control' value={this.state.benefits} onChange={ e => this.setState({ benefits: e.target.value })} />                   
                        </div>
                    </div>
                    <div className='row pt20'>
                        <div className='col-md-10 col-md-offset-1'>
                            <div className='col-lg-offset-4 col-md-offset-4 col-md-4 col-lg-4 col-sm-4'>
                                <button type='button' onClick={this.handleUpdate.bind(this)} className='btn btn-primary table-btn full-width'>Save</button>
                            </div> 
                            <div className='col-md-4 col-lg-4 col-sm-4'>
                                <button type='button' onClick={() => this.props.onCancel()} className='btn btn-primary full-width modal-cancel'>Cancel</button>
                            </div>
                        </div>                 
                    </div>
                </div>
            </div>
        )
    }

}