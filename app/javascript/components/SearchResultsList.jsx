import React, { Component } from 'react'
import SearchCompanyListItem from 'components/SearchCompanyListItem.jsx'
import SearchJobListItem from 'components/SearchJobListItem.jsx'

export default class SearchResultsList extends React.Component{
    render() {
        return (
            <ul className="dropdown-menu" id="autocomplete-items" onMouseEnter={() => {this.props.setPreventHideDropdown()}} onMouseLeave={() => {this.props.resetPreventHideDropdown()}}>
                <span className="dropdown-arrow-top"></span>
                <span className="dropdown-arrow-bottom"></span>
                <li>
                <a href={`/search?q=${this.props.term}`}>
                    <i className="fa fa-search"></i> Search for <strong>{this.props.term}</strong>
                </a>
                </li>
                {this.renderCompaniesHeading()}
                {this.renderCompanies()}
                {this.renderJobsHeading()}
                {this.renderJobs()}
            </ul>
        );
    }

    renderCompaniesHeading(){
        if (this.props.companies.length >= 1)     
          
        return <li className="autocomplete-heading"><h4>Companies</h4></li>
    }

    renderJobsHeading(){
        if (this.props.jobs.length >= 1)
        
        return <li className="autocomplete-heading"><h4>Jobs</h4></li>
    }

    renderCompanies(){
        return this.props.companies.slice(0, 3).map((company) => {
            return <SearchCompanyListItem key={company.id} company={company} />
        });
    }

    renderJobs(){
        return this.props.jobs.slice(0, 3).map((job) => {
            return <SearchJobListItem key={job.id} job={job} />
        });
    }


}