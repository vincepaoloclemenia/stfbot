var React = require("react")
var PropTypes = require("prop-types")

class CompanyTable extends React.Component{
    constructor(props){
        super(props)
        this.state = { companies: [], nextPage: null }
    }

    componentWillMount(){
        this.fetchCompanies()
    }

    render(){
        return(
            <div className="panel-body">    
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Total Hired Employees</th> 
                            <th>Edit / Delete</th>                            
                        </tr>                   
                    </thead>
                    {this.renderTableData()}
                </table>
                {this.loadMoreButton()}
                {this.indicator()}
            </div>
        )
    }

    fetchCompanies(){
        $.ajax({
            url: `/api/companies.json`,
            method: "GET",
            dataType: "JSON",
            success: (data) => {
                this.setState({
                    companies: data.companies,
                    nextPage: data.next_page
                })
            }
        })
    }

    renderTableData(){
        return(
            this.state.companies.map ((company) => 
                <tbody key={company.id}>
                    <tr className="company-row">
                        <td id='stay-left'><a href={`/companies/${company.id}`}><img src={company.avatar} style={{height: '35px', width: '35px'}} className='avatar-image' alt="avatar image" /><span className='gap1'>{company.name}</span></a></td>
                        <td>{company.address}</td>
                        <td>{company.contact}</td>
                        <td>{company.total_of_employees}</td>
                        <td><a className="glyphicon glyphicon-edit" href={`/companies/${company.id}/edit`} data-remote='true'></a>                            
                            <span className='action-gap'></span>
                            <a 
                            className="glyphicon glyphicon-trash red" 
                            data-original-title="Delete" 
                            data-confirm="Are you sure?" 
                            rel="nofollow" 
                            data-method="delete"
                            href={`/companies/${company.id}`} 
                            ></a>
                        </td>
                    </tr>    
                </tbody>            
            )
        )
    }

    indicator(){
        if (this.state.companies.length !== 0) { return }
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
            url: `/api/companies.json/?page=${this.state.nextPage}`,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                this.fetching = false;
                this.setState({
                    nextPage: data.next_page,
                    companies: [ ...this.state.companies, ...data.companies ]
                });
            }
        });
    }

}

module.exports = CompanyTable