import React, { Component } from 'react'
import FroalaViewer from 'react-froala-wysiwyg/FroalaEditorView';
var moment = require('moment')

export default class CandidateInformation extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='col-md-offset-1 col-md-8'>
                
                <div className='row'>    
                    <div className='panel'>
                        <div className="panel-heading ml15 mr15"><h4 className='candidate-profile-header'><i className="fa fa-clipboard fa-lg pr1"></i>Work Experiences</h4></div>
                        <div className='panel-body'>
                            <div className='work-exp-container'>
                                {this.renderCurrentEmployment()}
                                {this.props.experiences.map((exp, index) => 
                                    <div key={index} className='row ml15 mr15 mb20'>
                                        
                                        <div className='col-md-6'>
                                            <h5>Former {exp.job_title} at {exp.company_name}</h5>
                                            <label>Level of Position:</label>
                                            <p >{exp.job_level}</p>
                                            <label>Employment Period:</label>
                                            <p >{exp.employment_from} - {exp.employment_to}</p>
                                        </div>
                                        <div className='col-md-6'>
                                            <label>Job Description</label>
                                            <div className='froala-description'>
                                                {exp.job_description === null ? 
                                                    <i>N/A</i> 
                                                    :
                                                    <FroalaViewer model={exp.job_description} /> 
                                                }                                                    
                                            </div>
                                            <label>Achievements</label>
                                            <div className='froala-description'>
                                                {exp.achievements === null ? 
                                                    <i>N/A</i>   
                                                    :
                                                    <FroalaViewer model={exp.achievements} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>    
                    <div className='panel'>
                        <div className="panel-heading ml15 mr15 "><h4 className='candidate-profile-header'><i className="fa fa-graduation-cap fa-lg pr1"></i>Education Background</h4></div>
                        <div className='panel-body'>
                            <div className='row mb20 ml15 mr15'>
                                <div className='educations-container'>
                                    {this.props.educations.map((educ, index) => 
                                        <div key={index} className='row mb20'>
                                            
                                            <div className='col-md-6'>
                                                <label>Went from: </label>
                                                <p>{educ.school_name}</p>
                                                <label>Graduate of </label>
                                                <p>{educ.education_attainment === 'College' ? 'Bachelor of Science in' : ''} {educ.course}</p>
                                                <label>Year attended: </label>
                                                <p >{educ.attend_from} - {educ.attend_to}</p>
                                            </div>
                                            <div className='col-md-6'>
                                                <label>Accomplishents: </label>
                                                <div className='froala-description'>
                                                    {educ.accomplishments === null ? 
                                                        <i>Left blank</i>
                                                        :
                                                        <FroalaViewer model={educ.accomplishments} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='panel'>
                        <div className="panel-heading ml15 mr15 "><h4 className='candidate-profile-header'><i className="fa fa-user-secret fa-lg pr1"></i>Skills</h4></div>
                        <div className='panel-body'>
                            <div className='skills-container'>
                                {this.props.skills.map((skill, index) => 
                                    <li key={index}>
                                        {skill.name}<span>{skill.literacy_level}</span>
                                    </li>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderCurrentEmployment(){
        if(this.props.currentWork){
            return(
                <div className='row ml15 mr15 mb20'>
                    <div className='col-md-6'>
                        <h5>{this.props.currentWork.job_title} at {this.props.currentWork.company_name}</h5>
                        <label>Level of Position: </label>
                        <p >{this.props.currentWork.job_level}</p>
                        <label>Employment Period: </label>
                        <p >{moment(this.props.currentWork.employment_from).format("MMM YYYY")} - Present</p>
                    </div>
                    <div className='col-md-6'>
                        <label>Job Description</label>
                        <div className='froala-description'>
                            {this.props.currentWork.achievements === null ? 
                                <i>N/A</i> 
                                :
                                <FroalaViewer model={this.props.currentWork.job_description} /> 
                            }                                                    
                        </div>
                        <label>Achievements</label>
                        <div className='froala-description'>
                            {this.props.currentWork.achievements === null ? 
                                <i>N/A</i>   
                                :
                                <FroalaViewer model={this.props.currentWork.achievements} />
                            }
                        </div>
                    </div>
                </div>
            )
        }

    }
}