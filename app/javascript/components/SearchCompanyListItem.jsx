import React, { Component } from 'react'

export default class SearchCompanyListItem extends React.Component{
    
    render() {
        return (
            <li>
                <a href={this.props.company.url}>
                <img width="35" className="avatar-image" src={this.props.company.avatar_url} />
                <span dangerouslySetInnerHTML={{ __html: this.props.company.name }} />
                </a>
            </li>
        );
    }
}