import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import VirtualizedSelect from 'react-virtualized-select'
import EditEmployee from 'components/EditEmployee.jsx'
import DeleteEmployee from 'components/DeleteEmployee.jsx'

export default class Employees extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            userFirstName: null,
            userLastName: null,
            open: false, 
            password: 'password123', 
            userName: null,
            userEmail: null,
            userRole: null, 
            employers: [],
            financeAdmins: [],
            functions: [],
            jobLevels: [],
            years: [],
            roles: [{'label': 'Employer', 'value': 0}, {'label': 'Finance Admin', 'value': 1}], 
            months: [
                { 'label': 'Jan', 'value': 0 },
                { 'label': 'Feb', 'value': 1 },
                { 'label': 'Mar', 'value': 2 },
                { 'label': 'Apr', 'value': 3 },
                { 'label': 'May', 'value': 4 },
                { 'label': 'Jun', 'value': 5 },
                { 'label': 'Jul', 'value': 6 },
                { 'label': 'Aug', 'value': 7 },
                { 'label': 'Sep', 'value': 8 },
                { 'label': 'Oct', 'value': 9 },
                { 'label': 'Nov', 'value': 10 },
                { 'label': 'Dec', 'value': 11 }
            ]
        }
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onOpenModal = this.onOpenModal.bind(this)
    }

    onOpenModal(){
        this.setState({ open: true });
    }
    
    onCloseModal(){
        this.setState({ open: false });
    }

    handleSave(){
        $.ajax({
            url: '/api/employees/',
            method: 'post',
            data: { user: {
                email: this.state.userEmail,
                role: this.state.userRole.label.toLocaleLowerCase(),
                username: this.state.userName,
                password: 'password123',
                first_name: this.state.userFirstName.replace(/\b\w/g, (letter)=>{ return letter.toUpperCase() }),
                last_name: this.state.userLastName.replace(/\b\w/g, (letter)=>{ return letter.toUpperCase() })
                },
                employment_date: `${this.state.month.label} ${this.state.year.label}`,
                job_level: this.state.jobLevel.label,
                job_function: this.state.jobFunction.label
            },
            success: (data) => {
                if(data.user.role === 'employer'){
                    $.ajax({
                        url: '/api/employees/employers.json',
                        method: 'get',
                        success: (data) => {
                            this.setState({ open: false, employers: data.employers })
                        }
                    }) 
                }
                if(data.user.role === 'finance admin'){
                    $.ajax({
                        url: '/api/employees/finance_admins.json',
                        method: 'get',
                        success: (data) => {
                            this.setState({ open: false, financeAdmins: data.finance_admins })
                        }
                    }) 
                }       
                $.notify(data.message, { className: 'success', position: 'top center' } );                
            }
        })

    }

    handleUpdate(data){        
        $.ajax({
            url: '/api/employees.json',
            method: 'GET',
            success: (data) => {
                this.setState({ employers: data.employers, financeAdmins: data.finance_admins })
            }
        })       
        $.notify(data.message, { className: 'success', position: 'top center' } );                        
    }

    handleDelete(data){
        if(data.user.role === 'employer'){
            $.ajax({
                url: '/api/employees/employers.json',
                method: 'get',
                success: (data) => {
                    this.setState({ open: false, employers: data.employers })
                }
            }) 
        }
        if(data.user.role === 'finance admin'){
            $.ajax({
                url: '/api/employees/finance_admins.json',
                method: 'get',
                success: (data) => {
                    this.setState({ open: false, financeAdmins: data.finance_admins })
                }
            }) 
        }    
        $.notify(data.message, { className: 'info', position: 'top center' } );  
    }

    componentDidMount(){
        $.ajax({
            url: '/api/employees.json',
            method: 'GET',
            success: (data) => {
                this.setState({
                    employers: data.employers,
                    financeAdmins: data.finance_admins, 
                    years: data.years,
                    jobLevels: data.job_levels,
                    functions: data.functions
                })
            }
        })
    }

    render(){
        return(
            <div className='panel'>
                <div className='panel-heading ml15 mr15 with-border'>Employees
                    <button type='button' className='btn btn-primary pull-right table-btn' onClick={this.onOpenModal}><i className='fa fa-user-plus' aria-hidden='true'><span>Add User</span></i></button>
                    
                </div>
                <div className='panel-body mb25'>
                    <div className='row pb20'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <div className='panel-heading ml15 mr15 with-border'>Employers</div>
                            {this.renderEmployers()}
                        </div>
                    </div>
                    <div className='row pb20'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <div className='panel-heading ml15 mr15 with-border'>Finance Admins</div>
                            {this.renderFinanceAdmins()}
                        </div>
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} little>
                    <h5 className='modal-title-caption'>Add New Employee</h5>
                    <div className='modal-form-container'>
                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>First Name:</label>
                                <input className='form-control' placeholder='First Name' onChange={e => this.setState({ userFirstName: e.target.value })} />
                            </div>
        
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Last Name:</label>
                                <input className='form-control' placeholder='Last Name' onChange={e => this.setState({ userLastName: e.target.value })} />
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Email:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <input className='form-control' placeholder='User email' onChange={e => this.setState({ userEmail: e.target.value })} />
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Username:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <input className='form-control' placeholder='Username' onChange={e => this.setState({ userName: e.target.value })} />
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Designation:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <VirtualizedSelect
                                    optionClassName='with-border'
                                    options={this.state.roles}
                                    onChange={(value) => this.setState({ userRole: value })}
                                    value={this.state.userRole}                                                
                                />
                            </div>
                        </div>

                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Employment Date:</label>
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <VirtualizedSelect
                                    optionClassName='with-border'
                                    options={this.state.months}
                                    onChange={(value) => this.setState({ month: value })}
                                    value={this.state.month}                                                
                                />
                            </div>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <VirtualizedSelect
                                    optionClassName='with-border'
                                    options={this.state.years}
                                    onChange={(value) => this.setState({ year: value })}
                                    value={this.state.year}                                                
                                />
                            </div>
                        </div>

                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Job Function:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <VirtualizedSelect
                                    optionClassName='with-border'
                                    options={this.state.functions}
                                    onChange={(value) => this.setState({ jobFunction: value })}
                                    value={this.state.jobFunction}                                                
                                />
                            </div>
                        </div>

                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Job Level:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <VirtualizedSelect
                                    optionClassName='with-border'
                                    options={this.state.jobLevels}
                                    onChange={(value) => this.setState({ jobLevel: value })}
                                    value={this.state.jobLevel}                                                
                                />
                            </div>
                        </div>
                        <div className='row pt20'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <div className='pull-right'>
                                    <button type='button' disabled={this.disableButton()} onClick={this.handleSave.bind(this)} className='btn btn-primary rel-width table-btn'>Add</button>
                                </div> 
                            </div>                 
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    renderEmployers(){
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Edit / Delete</th>                            
                    </tr>                   
                </thead>
                <tbody>
                    {this.state.employers.map((emp) =>
                        <tr className='tall-height' key={emp.id}>
                            <td id='stay-left' className='larger-fonts'>
                                <img style={{ width: '40px', height: '40px' }} alt="avatar image" className="avatar-image" src={emp.avatar} />
                                <span className='gap1'>{emp.first_name} {emp.last_name}</span>                                
                            </td>
                            <td className='larger-fonts'>
                                {emp.email}
                            </td>
                            <td className='larger-fonts'>
                                {emp.contact === null ? <i>No contact yet</i> : emp.contact}
                            </td>
                            <td>
                                <EditEmployee employee={emp} onUpdate={this.handleUpdate.bind(this)} />                              
                                <span className='action-gap'></span>
                                <DeleteEmployee employee={emp} onDelete={this.handleDelete.bind(this)} />                             
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    renderFinanceAdmins(){
        if(this.state.financeAdmins.length === 0){
            return(
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Edit / Delete</th>                            
                            </tr>                   
                        </thead>
                        <tbody>
                            
                        </tbody>
                        
                    </table>
                    <center><i>No Finance Admins Yet</i></center>
                </div>
            )
        }
        return(
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Edit / Delete</th>                            
                    </tr>                   
                </thead>
                <tbody>
                    {this.state.financeAdmins.map((emp) =>
                        <tr className='tall-height' key={emp.id}>
                            <td id='stay-left' className='larger-fonts'>
                                <img style={{ width: '40px', height: '40px' }} alt="avatar image" className="avatar-image" src={emp.avatar}/>
                                <span className='gap1'>{emp.first_name} {emp.last_name}</span>                                
                            </td>
                            <td className='larger-fonts'>
                                {emp.email}
                            </td>
                            <td className='larger-fonts'>
                                {emp.contact === null ? <i>No contact yet</i> : emp.contact}
                            </td>
                            <td>
                                <EditEmployee employee={emp} onUpdate={this.handleUpdate.bind(this)} />                             
                                <span className='action-gap'></span>
                                <DeleteEmployee employee={emp} onDelete={this.handleDelete.bind(this)} />                         
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    disableButton(){
        if(this.state.userFirstName && this.state.userLastName && this.state.userEmail && this.state.userRole && this.state.userName){ return false }
        return true
    }

}