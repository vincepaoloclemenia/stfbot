import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import VirtualizedSelect from 'react-virtualized-select'
import FroalaView from 'react-froala-wysiwyg/FroalaEditorView'

export default class EditEmployee extends React.Component{
    constructor(props){
        var roles = [{'label': 'Employer', 'value': 0}, {'label': 'Finance Admin', 'value': 1}, {'label': 'Contractor', 'value': 1}]
        super(props)
        this.state = {
            open: false,
            employeeFirstName: this.props.employee.first_name,
            employeeLastName: this.props.employee.last_name,
            employeeEmail: this.props.employee.email,
            roles: roles,
            codeNum: this.props.employee.code_num,
            hourRate: this.props.employee.rate_per_hour,
            minFlexTime: this.props.employee.min_flexi_time,
            maxFlexTime: this.props.employee.max_flexi_time,
            employeeRole:  roles.find( x => x.label === this.props.employee.role ),
            checked: this.props.employee.shifting_schedule,
            professional: this.props.employee.is_professional
        }
    }

    handleSave(){
        $.ajax({
            url: `/api/employees/${this.props.employee.id}`,
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            method: 'PATCH',
            data: { user: {
                first_name: this.state.employeeFirstName,
                last_name: this.state.employeeLastName,
                email: this.state.employeeEmail,
                role: this.state.employeeRole.label.toLocaleLowerCase(),
                code_num: this.state.codeNum,
                rate_per_hour: this.state.hourRate,
                max_flexi_time: this.state.maxFlexTime,
                min_flexi_time: this.state.minFlexTime,
                shifting_schedule: this.state.checked,
                is_professional: this.state.professional
                }
            },
            success: (data) => {
                this.setState({ open: false })
                this.props.onUpdate(data)
            }
        })
    }

    render(){
        return(
            
            <button type='button' onClick={() => this.setState({ open: true })} className='btn btn-primary table-btn transparent'><span className='glyphicon glyphicon-edit'></span>
                <Modal open={this.state.open} onClose={() => this.setState({ open: false })} little>
                    <h5 className='modal-title-caption'>Edit Employee</h5>
                    <div className='modal-form-container'>
                        <div className='row pb20'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>First Name:</label>
                                <input className='form-control' value={this.state.employeeFirstName} placeholder='First Name' onChange={e => this.setState({ employeeFirstName: e.target.value })} />
                            </div>
        
                            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <label className='panel-label'>Last Name:</label>
                                <input className='form-control' value={this.state.employeeLastName} placeholder='Last Name' onChange={e => this.setState({ employeeLastName: e.target.value })} />
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Email:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <input className='form-control' value={this.state.employeeEmail} placeholder='Employee email' onChange={e => this.setState({ employeeEmail: e.target.value })} />
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Hourly Rate:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <input type='number' value={this.state.hourRate} className='form-control' placeholder='Hour Rate' onChange={e => this.setState({ hourRate: e.target.value })} />
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Contractor Number:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <input className='form-control' value={this.state.codeNum} placeholder='Contractor Number' onChange={e => this.setState({ employeeEmail: e.target.value })} />
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-5'>
                                <label className='panel-label'>Time Range of Flexibility</label>
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10'>
                                <input type='checkbox' checked={this.state.professional} onChange={() => this.setState({ professional: !this.state.professional })} /><label className='form-label'><span className='gap3'>Has Professional License?</span></label>  
                            </div>
                        </div>
                        <div className='row pb20'>
                            <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10'>
                                <input type='checkbox' checked={this.state.checked} onChange={() => this.setState({ checked: !this.state.checked })} /><label className='form-label'><span className='gap3'>Shifting Schedule?</span></label>  
                            </div>
                        </div>
                        {this.renderTimerRange()}
                        <div className='row pb20'>
                            <div className='col-lg-4 col-md-4 col-sm-4 col-xs-4'>
                                <label className='panel-label'>Designation:</label>
                            </div>
                            <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                                <VirtualizedSelect
                                    optionClassName='with-border'
                                    options={this.state.roles}
                                    onChange={(value) => this.setState({ employeeRole: value })}
                                    value={this.state.employeeRole}                                                
                                />
                            </div>
                        </div>
                        <div className='row pt20'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <div className='pull-right'>
                                    <button type='button' onClick={this.handleSave.bind(this)} className='btn btn-primary rel-width table-btn'>Update Employee</button>
                                </div> 
                            </div>                 
                        </div>
                    </div>
                </Modal>
            </button>
        )
    }

    renderTimerRange(){
        if(this.state.checked){ return }
        return(
            <div className='row pb20'>
                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                    <label className='panel-label'>From:</label>
                    <input className='form-control' value={this.state.minFlexTime} placeholder='Minimum Allowed Time for Contractor' onChange={e => this.setState({ minFlexTime: e.target.value })} />
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                    <label className='panel-label'>To:</label>
                    <input className='form-control' value={this.state.maxFlexTime} placeholder='Maximum Allowed Time for Contractor' onChange={e => this.setState({ maxFlexTime: e.target.value })} />
                </div>
            </div>
        )
    }
}