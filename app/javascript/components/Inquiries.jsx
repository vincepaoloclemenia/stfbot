import React, { Component } from 'react'

export default class Inquiries extends React.Component{
    constructor(props){
        super(props)
        this.state = { inquiries: [], nextPage: null }
    }

    componentDidMount(){
        $.ajax({
            url: '/api/inquiries.json',
            method: 'GET',
            success: (data) => {
                this.setState({ inquiries: data.inquiries })
            }
        })
    }

    render(){
        return(
            <div className="panel-body">    
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Company Name</th>
                            <th>Address</th>                            
                            <th>Industry</th> 
                            <th>Edit / Delete</th>                            
                        </tr>                   
                    </thead>
                    {this.renderTable()}
                </table>
                {this.loadMoreButton()}
                {this.indicator()}
            </div>
        )
    }


    renderTable(){
        return(
            this.state.inquiries.map ((inquiry) => 
            <tbody key={inquiry.id}>
                <tr className="inquiry-row">
                    <td>{inquiry.first_name} {inquiry.last_name}</td>
                    <td>{inquiry.position}</td>
                    <td>{inquiry.email}</td>
                    <td>{inquiry.contact}</td>
                    <td>{inquiry.company_name}</td>
                    <td>{inquiry.address}</td>
                    <td>{inquiry.industry}</td>
                    <td><a className="glyphicon glyphicon-edit" href={`/inquiries/${inquiry.id}/edit`} data-remote='true'></a>                            
                        <span className='action-gap'></span>
                        <a 
                        className="glyphicon glyphicon-trash red" 
                        data-original-title="Delete" 
                        data-confirm="Are you sure?" 
                        rel="nofollow" 
                        data-method="delete"
                        href={`/inquiries/${inquiry.id}`} 
                        ></a>
                    </td>
                </tr>    
            </tbody>      
        ))
    }

    indicator(){
        if (this.state.inquiries.length !== 0) { return }
        return(
            <p style={{ marginLeft: '40%'}}><i>No available data yet</i></p>
        )    
    }

    loadMoreButton() {
        if (this.state.nextPage === null) {
            return;
        }
        return (
            <ul >
                <li>
                    <a className="see-more-table" onClick={() => this.handleLoadMore()}>See More
                        <i className={`fa ${this.fetching ? 'fa-spinnerfa-pulse': ''}`}></i>
                    </a>
                </li>
            </ul>
        );
    }

    handleLoadMore() {
        if (this.fetching || this.state.nextPage === null) { return; }
        this.fetching = true;
        $.ajax({
            url: `/api/inquiries.json/?page=${this.state.nextPage}`,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                this.fetching = false;
                this.setState({
                    nextPage: data.next_page,
                    inquiries: [ ...this.state.inquiries, ...data.inquiries ]
                });
            }
        });
    }
}