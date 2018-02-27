import React, { Component } from 'react'
import Profile from 'components/CandidateProfile.jsx'
import Information from 'components/CandidateInformation.jsx'

export default class CandidateContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = { user: {}, workExperiences: [], educations: [], skills: [], currentWork: null }
    }

    componentDidMount(){
        $.ajax({
            url: `/api/users/get_profile.json?id=${this.props.user.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({ user: data.user })
            }
        })
        $.ajax({
            url: `/api/users/candidate_information.json?id=${this.props.user.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    workExperiences: data.work_experiences,
                    skills: data.skills,
                    educations: data.educations,
                    currentWork: data.current_work
                })
            }
        })
    }

    render(){
        return(
            <div className='row m70'>
                <div className='profile-container'>
                    <Profile userAge={this.props.userAge} user={this.state.user} />
                    <Information skills={this.state.skills} currentWork={this.state.currentWork} experiences={this.state.workExperiences} educations={this.state.educations} />
                </div>
            </div>
        )
    }
}