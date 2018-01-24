import React, { Component } from 'react'
import FroalaView from 'react-froala-wysiwyg/FroalaEditorView'
import Edit from 'components/JobEdit.jsx'

export default class JobShow extends React.Component{
    constructor(props){
        super(props)
        this.state = { edit: this.props.close, job: this.props.job }
    }

    handleEdit(){
        this.props.onEdit()
    }

    componentWillReceiveProps(nextProps){
        this.setState({ edit: nextProps.close })
    }

    render(){
        if (this.state.edit){
            return(
                <Edit hide={() => this.props.hide() } onClose={() => this.setState({ edit: false })} onEdit={this.handleEdit.bind(this)} class={this.props.class} job={this.props.job} onCancel={() => this.setState({ edit: false })} />
            )
        }
        return(           
            <div className={this.props.class}>
                <div className='panel'>
                    <button onClick={() => this.props.hide()} className='btn btn-primary close pull-right'><i className='fa fa-window-close-o' aria-hidden='true'></i></button>
                    <div className="panel-heading ml15 mr15">{this.props.job.title} (Preview)
                        <button onClick={() => this.setState({ edit: true })} className='btn btn-primary transparent pull-right'><i className='fa fa-pencil pr1' aria-hidden="true"></i>Edit</button>
                    </div>
                    <img className='img-responsive full' src={this.props.job.company.avatar} />
                    <div className='panel-body mb25 mt25'>
                        <div clas='col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1'>
                            <img className='company-dp' src={this.props.job.company.avatar} />
                            <div className='row pb20 bordered-bottom'> 
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <h5 className='comp-header fs18'>{this.props.job.Title}</h5>
                                    <label className='form-label'><h5>{this.props.job.title}</h5></label>
                                    <p className='form-paragraph'>{this.props.job.company.name}</p>
                                </div>
                            </div>
                            <div className='row bordered-bottom'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <label className='form-label'><h5>Job Description</h5></label>
                                    <div className='company-preview'>
                                        <FroalaView model={this.props.job.description} />
                                    </div>
                                </div>
                            </div>
                            <div className='row pb20 bordered-bottom'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <label className='form-label'><h5>Required Skills</h5></label>
                                    <div className='company-preview'>
                                        {this.props.job.requirements.map((skill, index) =>
                                            <li key={index}>{skill}</li>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='row pb20 bordered-bottom'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <label className='form-label'><h5>Must be graduate of any of the following: </h5></label>
                                    <div className='company-preview'>
                                        {this.props.job.preferred_courses.map((skill, index) =>
                                            <li key={index}>{skill}</li>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='row pb20 bordered-bottom'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                <label className='form-label'><h5>Summary</h5></label>
                                    <div className='company-preview'>
                                        <div className='row'>
                                            <div className='col-lg-6 col-md-6'>
                                                <label className='form-label'>Job Level</label>
                                                <p>{this.props.job.level_of_expertise}</p>
                                                <label className='form-label'>Job Category</label>
                                                <p>{this.props.job.industry}</p>
                                                <label className='form-label'>Educational Requirement</label>
                                                <p>{this.props.job.education_attainment} Graduate</p>
                                                <label className='form-label'>Office Address</label>
                                                <p>{this.props.job.location.split(" | ").join(", ")}</p>
                                            </div>
                                            <div className='col-lg-6 col-md-6'>
                                                <label className='form-label'>Years of Experience</label>
                                                <p>{this.props.job.min_exp} - {this.props.job.max_exp} years</p>
                                                <label className='form-label'>Type of Employment</label>
                                                <p>{this.props.job.type_of_employee}</p>
                                                <label className='form-label'>Web Site</label>
                                                <p>{this.props.job.company.website}</p>
                                                <label className='form-label'>Benefits</label>
                                                <p>{this.props.job.company.benefits}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row pb20'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <label className='form-label'><h5>About {this.props.job.company.name}</h5></label>
                                    <div className='company-preview'>
                                        <FroalaView model={this.props.job.company.overview} />
                                    </div>
                                </div>
                            </div>

                            <div className='row pb20'>
                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                    <label className='form-label'><h5>Why join us?</h5></label>
                                    <div className='company-preview'>
                                        <FroalaView model={this.props.job.company.why_join_us} />
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