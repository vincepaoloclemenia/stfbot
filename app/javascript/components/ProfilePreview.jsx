import React, { Component } from 'react'
import FroalaView from 'react-froala-wysiwyg/FroalaEditorView'
import Modal from 'react-responsive-modal';

export default class ProfilePreview extends React.Component{
    constructor(props){
        super(props)
        this.state = { open: false, user: null }
    }

    previewProfile(){
        this.setState({ open: true })
        $.ajax({
            url: '/api/users/candidate.json',
            method: 'GET',
            success: (data) => {
                this.setState({ user: data.user, experiences: data.experiences, skills: data.skills, educations: data.educations })
            }
        })
    }
    lorem = (
        <p>
          Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent
          rhoncus congue ipsum elementum lobortis. Ut ligula purus, ultrices id
          condimentum quis, tincidunt quis purus. Proin quis enim metus. Nunc
          feugiat odio at eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu
          ex vulputate consectetur vel eu nisi. Donec ultricies rutrum lectus, sit
          ame feugiat est semper vitae. Proin varius imperdiet consequat. Proin eu
          metus nisi. In hac habitasse platea dictumst. Vestibulum ac ultrices
          risus. Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar
          interdum velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent
          aliquet justo vitae rutrum volutpat. Ut quis pulvinar est.
        </p>
      );

    render(){
        return(
            
            <div>
                <li onClick={this.previewProfile.bind(this)} className='user-profile'>Preview of your profile</li>
                <Modal open={this.state.open} onClose={() => this.setState({ open: false })}>
                     <div className='profile-preview'>   
                        <div className='col-md-12 mt30'>                       
                            {this.renderProfile()}
                            {this.renderEducations()}
                            {this.renderExperiences()}
                            {this.renderSkills()}                
                        </div>   
                    </div>             
                </Modal>
            </div>
        )
    }
    
    renderProfile(){
        if(this.state.user){
            return(                               
                    <div className='row pt20 pb20 pt15 bordered-bottom'>
                        <div className='profile-preview'>
                            <div className='col-md-3 col-md-offset-1'>
                                <img style={{ width: 115, height: 115 }} alt="avatar image" className="avatar-image" src={this.state.user.avatar}/>
                            </div>
                            <div className='col-md-8'>
                                <p className='user-name'>{this.state.user.full_name}</p> 
                                <ul className='user-credentials'>
                                    <li className='profile-list'><i className="fa fa-map-marker fa-lg color-green stay-left" aria-hidden="true"></i><span className='gap1'>{this.renderLocation(this.state.user.country, this.state.user.state, this.state.user.city)}</span></li>
                                    <li className='profile-list'><i className="fa fa-address-card-o fa-lg with-color stay-left" aria-hidden="true"></i><span className='gap1'>{this.state.user.email}</span></li>
                                    <li className='profile-list'><i className="fa fa-envelope-o fa-lg with-color stay-left" aria-hidden="true"></i><span className='gap1'>{this.renderContact(this.state.user.contact)}</span></li>
                                </ul>  
                            </div>
                        </div>
                    </div>
                
            )
        }
    }

    renderEducations(){
        if(this.state.educations)
        return(
            <div className='row ml15 mr15 pb20 pt15 bordered-bottom'>
                <div className='profile-preview'>                   
                    <label className='form-label'><h5 className='profile-header'><i className="fa fa-university fa-lg pr1 with-color" aria-hidden="true"></i>Education Attainment</h5></label>
                    
                        {this.state.educations.map( (educ, index) => 
                            <li key={index} className='profile-item'>  
                                <label className='form-label'>Went from: </label>
                                <p>{educ.school_name}</p>
                                <label className='form-label'>{educ.graduate ? 'Graduate of: ' : 'Undergraduate of: ' }</label>
                                <p>{educ.education_attainment}{educ.education_attainment != 'College' ? '' : `, Bachelor of ${educ.course}`}</p>
                                <label className='form-label'>Year attended: </label>
                                <p>{educ.attend_from} - {educ.attend_to}</p>                                   
                                <label className='form-label'>Accomplishments: </label>
                                {educ.accomplishments ? <FroalaView model={educ.accomplishments} /> : <p><i>Left blank</i></p> }                                                                   
                            </li>
                        )}
                    
                </div>
            </div>
        )
    }

    renderSkills(){
        if(this.state.skills){
            return(
                <div className='row ml15 mr15 pb20 pt15 bordered-bottom'>
                    <div className='profile-preview'>
                        <label className='form-label'><h5 className='profile-header'><i className="fa fa-building fa-lg pr1 with-color" aria-hidden="true"></i>Skills</h5></label>
                        {this.state.skills.map ((skill)=>
                            <ul key={skill.id}>
                                <li className='profile-list'>{skill.name}<span className='gap3 with-text'>{skill.literacy_level}</span></li>
                            </ul>                   
                        )}
                    </div>
                </div>
            )
        }         
    }

    renderExperiences(){
        if(this.state.experiences){
            return(
                <div className='row ml15 mr15 pb20 pt15 bordered-bottom'>
                    <div className='profile-preview'>
                        <label className='form-label'><h5 className='profile-header'><i className="fa fa-building fa-lg pr1 with-color" aria-hidden="true"></i>Work Experiences</h5></label>
                            {this.state.experiences.map( (experience, index) => 
                                <li key={index} className='profile-item'>  
                                    <label className='form-label'>Company Name: </label>
                                    <p>{experience.company_name} <i>( {experience.employment_from} - {experience.employment_status ? 'Current' : experience.employment_to} )</i></p>
                                    <label className='form-label'>Job Title:</label>
                                    <p>{experience.job_title}</p>
                                    <label className='form-label'>Job Level: </label>
                                    <p>{experience.job_level}</p>                                   
                                    <label className='form-label'>Industry: </label>
                                    <p>{experience.job_functions}</p>      
                                    <label className='form-label'>Tasks: </label>    
                                    {experience.job_description ? <FroalaView model={experience.job_description}/> : <p><i>N / A</i></p>}     
                                    <label className='form-label'>Achievements: </label>    
                                    {experience.achievements ? <FroalaView model={experience.achievements}/> : <p><i>N / A</i></p>}     
                                </li>
                            )}
                    </div>
                </div>
            )
        }
    }

    renderLocation(country, state, city){
        if(country && state && city){
            return `${country}, ${state}, ${city}`
        }

        return(
            <i className='null'>No address yet</i> 
        )
    }

    renderContact(contact){
        if(contact){
            return(
                contact
            )
        }
        return(
            <i className='null'>No contact yet</i> 
        )
    }


}