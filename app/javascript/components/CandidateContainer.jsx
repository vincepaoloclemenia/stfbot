import React, { Component } from 'react'
import Profile from 'components/CandidateProfile.jsx'

export default class CandidateContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = { user: {} }
    }

    componentDidMount(){
        $.ajax({
            url: `/api/users/get_profile.json?id=${this.props.user.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({ user: data.user })
                console.log(data.user)
            }
        })
    }

    render(){
        return(
            <div className='row m70'>
                <Profile user={this.state.user} />
            </div>
        )
    }
}