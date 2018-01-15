import React, { Component } from 'react'

export default class SearchJobListItem extends React.Component{
    
    render() {
        return (
            <li>
                <a href={this.props.job.url}>
                <img width="35" className="avatar-image" src={this.props.job.avatar_url} />
                <span dangerouslySetInnerHTML={{ __html: this.props.job.name }} />
                </a>
            </li>
        );
    }
}