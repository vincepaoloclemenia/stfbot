import React, { Component } from 'react'
import SearchBar from 'components/SearchBar.jsx'
import SearchResultsList from 'components/SearchResultsList.jsx'

export default class SearchContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = { preventHideDropdown: false, showDropdown: false, term: '', companies: [], jobs: [] }
        this.hideDropdown = this.hideDropdown.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.setPreventHideDropdown = this.setPreventHideDropdown.bind(this);
        this.resetPreventHideDropdown = this.resetPreventHideDropdown.bind(this);
    }

    search(term) {
        this.setState({ term });
    
        $.ajax({
          url: `/api/autocomplete.json/?term=${term}`,
          method: 'GET',
          success: (data) => { this.setState({
            companies: data.companies,
            jobs: data.jobs
          });}
        });
    }

    setPreventHideDropdown() {
        this.setState({ preventHideDropdown: true });
    }
    
    resetPreventHideDropdown() {
        this.setState({ preventHideDropdown: false });
    }
    
    hideDropdown() {
        if (!this.state.preventHideDropdown) {
            this.setState({ showDropdown: false });
        }
    }
    
    showDropdown() {
        this.setState({ showDropdown: true });
    }

    render(){
        return(
            <div>
                <SearchBar 
                    showDropdown={this.showDropdown}
                    hideDropdown={this.hideDropdown}
                    term={this.state.term} 
                    onSearchTermChange={(term) => {this.search(term)}}
                />
                {this.renderSearchResults()}
            </div>
        )
    }

    renderSearchResults() {
        if(!this.state.showDropdown || (this.state.companies.length === 0 && this.state.jobs.length === 0)) {
            return;
        }
    
        return (
            <SearchResultsList
                setPreventHideDropdown={this.setPreventHideDropdown}
                resetPreventHideDropdown={this.resetPreventHideDropdown}
                term={this.state.term}
                companies={this.state.companies}
                jobs={this.state.jobs}
            />
        );
    }

}