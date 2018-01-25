import React, { Component } from 'react'
import FroalaView from 'react-froala-wysiwyg/FroalaEditorView'

export default class Job extends React.Component{
    constructor(props){
        super(props)
        this.state = { job: {}, company: {}, requirements: [], preferredCourses: [], appliedAlready: null, isApplicant: null }
    }

    handleApply(){
        $.ajax({
            url: `/api/jobs/apply`,
            method: 'POST',
            data: { id: this.state.job.id },
            success: (data) => {               
                this.setState({ appliedAlready: data.applied })
            }
        })
    }

    componentDidMount(){
        $.ajax({
            url: this.props.url,
            method: 'GET',
            dataType: 'JSON',
            success: (data) => {
                console.log(data.job, data.job.company)
                this.setState({ 
                    job: {
                       id: data.job.id,
                       title: data.job.title,
                       description: data.job.description,
                       location: data.job.location.split(" | ").join(", "),
                       industry: data.job.industry,
                       gender: data.job.gender,
                       created_at: data.job.created_at,
                       slug: data.job.slug,
                       user_id: data.job.creator.id,
                       education_attainment: data.job.education_attainment,
                       min_exp: data.job.min_exp,
                       max_exp: data.job.max_exp,
                       type_of_employee: data.job.type_of_employee,
                       level_of_expertise: data.job.level_of_expertise,
                       requisition_number: data.job.requisition_number
                    },
                    company: {
                        name: data.job.company.name,
                        avatar: data.job.company.avatar,
                        overview: data.job.company.overview,
                        why_join_us: data.job.company.why_join_us,
                        benefits: data.job.company.benefits,
                        website: data.job.company.website,
                    },
                    preferredCourses: data.job.preferred_courses,
                    requirements: data.job.requirements,
                    appliedAlready: data.applied_already,
                    isApplicant: data.is_applicant
                })
            }
        })
    }

    render(){
        return(
            <div className='col-lg-8 col-md-10 col-lg-offset-2 col-md-offset-1'>
                <div className='panel'>
                    <img className='img-responsive full' src={this.state.company.avatar} />
                    <img className='company-profile-avatar' src={this.state.company.avatar} />
                    <div className='panel-body mb25 mt25'>
                        <div className='col-lg-12 col-md-12'>
                            <div className='row pr10 pl10 pb20 bordered-bottom'> 
                                <div className='col-lg-12 col-md-12'>
                                    <h5 className='comp-header fs20'>{this.state.job.title}</h5>
                                    <a href={this.props.companyUrl} className='form-paragraph'>{this.state.company.name}</a>
                                    <div className='pull-right'>    
                                        {this.renderApplyButton()}
                                        <span className='gap1'></span>
                                        {this.renderSaveButton()}
                                    </div>
                                </div>
                            </div>
                            <div className='row pr10 pl10 pt10 pb20 bordered-bottom'>
                                <div className='col-lg-12 col-md-12'>
                                    <label className='form-label'><h5>Job Description</h5></label>
                                    <div className='company-preview'>
                                        <FroalaView model={this.state.job.description} />
                                    </div>
                                </div>
                            </div>
                            <div className='row pr10 pl10 pt10 pb20 bordered-bottom'>
                                <div className='col-lg-12 col-md-12'>
                                    <label className='form-label'><h5>Required Skills</h5></label>
                                    <div className='company-preview'>
                                        {this.state.requirements.map((skill, index) =>
                                            <li key={index}>{skill}</li>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='row pr10 pl10 pt10 pb20 bordered-bottom'>
                                <div className='col-lg-12 col-md-12'>
                                    <label className='form-label'><h5>Must be graduate of any of the following: </h5></label>
                                    <div className='company-preview'>
                                        {this.state.preferredCourses.map((skill, index) =>
                                            <li key={index}>{skill}</li>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='row pr10 pl10 pt10 pb20  bordered-bottom'>
                                <div className='col-lg-12 col-md-12'>
                                <label className='form-label'><h5>Summary</h5></label>
                                    <div className='company-preview'>
                                        <div className='row'>
                                            <div className='col-lg-6 col-md-6'>
                                                <label className='form-label'>Job Level</label>
                                                <p>{this.state.job.level_of_expertise}</p>
                                                <label className='form-label'>Job Category</label>
                                                <p>{this.state.job.industry}</p>
                                                <label className='form-label'>Educational Requirement</label>
                                                <p>{this.state.job.education_attainment} Graduate</p>
                                                <label className='form-label'>Office Address</label>
                                                <p>{this.state.job.location}</p>
                                            </div>
                                            <div className='col-lg-6 col-md-6'>
                                                <label className='form-label'>Years of Experience</label>
                                                <p>{this.state.job.min_exp} - {this.state.job.max_exp} years</p>
                                                <label className='form-label'>Type of Employment</label>
                                                <p>{this.state.job.type_of_employee}</p>
                                                <label className='form-label'>Web Site</label>
                                                <p>{this.state.company.website}</p>
                                                <label className='form-label'>Benefits</label>
                                                <p>{this.state.company.benefits}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row pr10 pl10 pt10'>
                                <div className='col-lg-12 col-md-12'>
                                    <label className='form-label'><h5>About {this.state.company.name}</h5></label>
                                    <div className='company-preview'>
                                        <FroalaView model={this.state.company.overview} />
                                    </div>
                                </div>
                            </div>

                            <div className='row pr10 pl10 pt10'>
                                <div className='col-lg-12 col-md-12'>
                                    <label className='form-label'><h5>Why join us?</h5></label>
                                    <div className='company-preview'>
                                        <FroalaView model={this.state.company.why_join_us} />
                                    </div>
                                </div>
                            </div>
                                                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderApplyButton(){
        if(this.state.isApplicant && !this.state.appliedAlready)
            return(
                <button onClick={this.handleApply.bind(this)} className='btn btn-primary apply inline'><i className="fa fa-paper-plane-o pr1" aria-hidden="true"></i>Apply Now</button>
            )
            
        if(this.state.isApplicant && this.state.appliedAlready)
        return(
            <label className='info'><i className="fa fa-check pr1" aria-hidden="true"></i>Application sent</label>
        )
    }

    renderSaveButton(){
        if(this.state.appliedAlready){ return }
        return(
            <button className='btn btn-primary save inline'><i className="fa fa-heart pr1" aria-hidden="true"></i>Save Job</button>            
        )
    }
}