var React = require("react")
var PropTypes = require("prop-types")
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import VirtualizedSelect from 'react-virtualized-select'
import AddNew from 'components/CompanyAdd.jsx'
import Edit from 'components/CompanyEdit.jsx'
import Delete from 'components/CompanyDelete.jsx'

export default class CompanyTable extends React.Component{
    constructor(props){
        super(props)
        this.state = { companies: [], nextPage: null, fetching: false }
    }

    handleDelete(data){
        this.fetchCompanies()
        $.notify(data.message, { className: 'warning', position: 'top center' } ); 
    }

    handleAdd(data){
        this.setState({ fetching: true })
        this.fetchCompanies()
        $.notify(data.message, { className: 'success', position: 'top center' } ); 
    }

    handleUpdate(data){
        this.setState({ fetching: true })
        this.fetchCompanies()
        $.notify(data.message, { className: 'success', position: 'top center' } ); 
    }

    componentDidMount(){
        this.fetchCompanies()
    }

    render(){
        return(
            <div className='row m70'>
                <div className='col-lg-10 col-lg-offset-1'>
                    <div className='panel'>
                        <AddNew onAdd={this.handleAdd.bind(this)} />
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
                    </div>
                </div>
            </div>
        )
    }

    fetchCompanies(){
        $.ajax({
            url: `/api/clients.json`,
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

    styles = {
        display: 'inline-block',
        verticalAlign: 'middle'
    }

    renderTableData(){
        return(
            this.state.companies.map ((company) => 
                <tbody key={company.id}>
                    <tr className="company-row">
                        <td id='stay-left'><a href={`/clients/${company.slug}`}><img src={company.avatar} style={{height: '35px', width: '35px'}} className='avatar-image' alt="avatar image" /><span className='gap1'>{company.name}</span></a></td>
                        <td>{company.street} {company.state} {company.country}</td>
                        <td>{company.contact}</td>
                        <td>{company.total_of_employees}</td>
                        <td>
                            <div style={this.styles}>
                                <Edit company={company} onUpdate={this.handleUpdate.bind(this)} />                        
                                <Delete company={company} onDelete={this.handleDelete.bind(this)} />
                            </div>
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
        this.setState({ fetching: true })
        if (this.state.nextPage === null) { return; }
        $.ajax({
            url: `/api/clients.json/?page=${this.state.nextPage}`,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                this.fetching = false;
                this.setState({
                    fetching: false,
                    nextPage: data.next_page,
                    companies: [ ...this.state.companies, ...data.companies ]
                });
            }
        });
    }

}
